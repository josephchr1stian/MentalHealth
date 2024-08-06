// import { color } from "@rneui/base";
import { Image, Platform, Text, View, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { useState, useEffect } from "react";
import { Pressable, FlatList, Item, ScrollView } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { SmallChatFill } from "../../assets/snapchat/NavigationIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import defaultPhoto from "../../assets/snapchat/defaultprofile.png";
import SendBottomSheet from "../components/SendBottomSheet";

//screen
import ChatScreen from "./ChatScreen";
import LoadingChats from "../components/LoadingChats";


const Stack = createStackNavigator();

export default function SendToScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [recents, setRecents] = useState([]);
  const [clickedUsers, setClickedUsers] = useState({}); // State to track clicked users

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, username")
          .limit(8);

        if (error) {
          console.error("Error fetching users:", error.message);
          return;
        }
        if (data) {
          setUsersToAdd(
            data.map((user) => ({
              id: user.id,
              name: user.username,
              username: user.username,
            }))
          );
          setRecents(data.slice(-10));
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    setClickedUsers((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 2,
        alignItems: "center",
        width: "50%",
        flexDirection: "row",
        height: 50,
        gap: 10,
      }}
    >
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => {
          console.log(item);
          handleUserClick(item.id);
        }}
      >
        <Image style={styles.bitmojiImage} source={defaultPhoto} />
        <Text>{item.name}</Text>
        <Ionicons
          style={styles.circleIcon}
          name={clickedUsers[item.id] ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={clickedUsers[item.id] ? "#3CB2E2" : "lightgrey"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View styles={{ alignItems: "center", paddingLeft: 15 }}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <SearchBar
            containerStyle={{
              flex: 1,
              width: 100,
              backgroundColor: "transparent",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
            }}
            inputContainerStyle={{ height: 40, backgroundColor: "#EBECEE" }}
            width="100"
            placeholder="Search"
            lightTheme="true"
            round="true"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable
            onPress={() => {
              navigation.navigate("UserTab");
            }}
          >
            <Text style={{ fontWeight: "bold" }}> Cancel</Text>
          </Pressable>
        </View>

        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>Stories</Text>

          <View>
            <TouchableOpacity style={styles.userStoriesContainer}>
              <Image style={styles.bitmojiImage} source={defaultPhoto} />
              <Text>My Story - Friends Only</Text>
              <Ionicons
                style={styles.circleIcon}
                name= "ellipse-outline"
                size={24}
                color="lightgrey"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.userStoriesContainer}>
              <Image style={styles.bitmojiImage} source={defaultPhoto} />
              <Text> My Story - Public</Text>
              <Ionicons
                style={styles.circleIcon}
                name="ellipse-outline"
                size={24}
                color="lightgrey"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.userStoriesContainer}>
              <Ionicons
                style={styles.userCamera}
                name="location"
                size={24}
                color="lightgrey"
              />
              <Text> Snap Map</Text>
              <Ionicons
                style={styles.circleIcon}
                name="ellipse-outline"
                size={24}
                color="lightgrey"
              />
            </TouchableOpacity>
          </View>

          <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>
            Best Friends
          </Text>
          {usersToAdd.length > 1 ? (
            <FlatList
              style={{ marginLeft: 10, marginRight: 10 }}
              data={usersToAdd}
              renderItem={renderItem}
              keyExtractor={(item) => item.Username}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              contentContainerStyle={{ alignItems: "center" }}
              scrollEnabled={false}
            />
          ) : (
            <Text>No "usersToAdd" table</Text>
          )}

          {recents.length > 0 ? (
            <>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Recents</Text>
                <Pressable
                  onPress={() => {
                    setRecents([]);
                  }}
                >
                  <Text>Clear All &gt;</Text>
                </Pressable>
              </View>
            </>
          ) : null}

          <View style={styles.recentsContainer}>
            {usersToAdd
              //.filter((userToAdd) => !currentFriends.includes(userToAdd.id))
              .map((user, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.userContainer}
                    onPress={() => {
                      console.log(user);
                      handleUserClick(user.id);
                    }}
                  >
                    <Image style={styles.bitmojiImage} source={defaultPhoto} />
                    <Text style={styles.bitmojiText}>{user.name}</Text>
                    <Ionicons
                      style={styles.circleIcon}
                      name={clickedUsers[user.id] ? "checkmark-circle" : "ellipse-outline"}
                      size={24}
                      color={clickedUsers[user.id] ? "#3CB2E2" : "lightgrey"}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
        <SendBottomSheet />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  userStoriesContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  bitmojiImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  bitmojiText: {
    fontSize: 15,
    flex: 1,
  },
  recentsContainer: {
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  circleIcon: {
    marginRight: 10,
  },
});
