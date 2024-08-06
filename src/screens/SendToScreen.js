// import { color } from "@rneui/base";
import { Image, Platform, Text, View, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { useState, useEffect } from "react";
import { Pressable, FlatList, Item } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { SmallChatFill } from "../../assets/snapchat/NavigationIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

//screen
import ChatScreen from "./ChatScreen";
import LoadingChats from "../components/LoadingChats";

const SendTab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function SendToScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [usersToAdd, setUsersToAdd] = useState([]);

  const [recents, setRecents] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from("usersToAdd")
          .select("*")
          .limit(8);
        if (error) {
          console.error("Error fetching users:", error.message);
          return;
        }
        if (data) {
          setUsersToAdd(data);
          setRecents(data.slice(-6));
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }

    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 4,
        alignItems: "center",
        width: "50%",
        flexDirection: "row",
        height: 50,
        gap: 10,
      }}
    >
      <Image
        source={{ uri: item.profile_picture }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
      <Text>{item.name}</Text>
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
        {/* <Image
        source={{uri: usersToAdd[0].profile_picture}}
        style={{ width: 400, height: 400, borderRadius: 400 / 2 }}
      /> */}
        <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>Stories</Text>

        <View>
          <TouchableOpacity style={styles.userStoriesContainer}>
            <Text>My Story - Friends Only</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.userStoriesContainer}>
            <Text> My Story - Public</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.userStoriesContainer}>
            <Text> Snap Map</Text>
            <Ionicons
              style={styles.userCamera}
              name="location"
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

        {/* <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>
          Search results
        </Text> */}
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
});
