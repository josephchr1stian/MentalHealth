import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { Dialog } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { Button, FAB } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Actions({ isVisible, onClose, updateStreak }) {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [actions, setActions] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("allPrompt")
        .select("*")
        .order("id", { ascending: true }); // Sorting by 'id' in ascending order;
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setActions(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    console.log(data);
  };

  function handleThat(update, close) {
    navigation.navigate("Camera");
    update();
    close();
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Dialog
      overlayStyle={styles.Frame}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.wind}>
        <ImageBackground
          style={styles.backgroundImage}
          source={{
            uri: "../../assets/snapchat/SnapInitiatives Pop Up.png",
          }}
        ></ImageBackground>

        <Text style={styles.eventText}>Daily Snaps</Text>
        <Text style={styles.text}>A place to grow healthy minds.</Text>
        <FlatList
          style={styles.listFrame}
          data={actions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleThat(updateStreak, onClose)}
              style={styles.button}
            >
              <View style={styles.inline}>
                <Text style={styles.emoji}>{item.prompts.emoji}</Text>
              
                <Text style={styles.prompt}>{item.prompts.prompt}</Text>
                {/* <Text style={styles.context}> {item.prompts.context} </Text> */}
       
                <Ionicons
                  style={styles.arrowIcon}r
                  name="chevron-forward"
                  size={24}
                  color="#10A9A1"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  Frame: {
    borderRadius: 25,
    height: "45%",
    width: "90%",
    backgroundColor: "red",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    resizeMode: "cover",
    top: -40,
    left: -32,
    width: 410,
    height: 460,
    padding: 10,
    overflow: 'hidden',
    justifyContent: "center",
    borderRadius: 20,
  },
  eventText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#10A9A1",
  },
  wind: {
    height: "100%",
    width: "100%",

  },
  text: {
    textAlign: "center",
    fontSize: 15,
    //fontWeight: "bold",
    marginBottom: 20,
    color: "#10A9A1",
  },
  listFrame: {
    backgroundColor: "white",
    borderRadius: 20,
    left: 0,
    width: 350,
  },
  Select: {
    borderColor: "#d9d9d9",
    borderBottomColor: "#ffff",
    borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  context: {
    
    fontSize: 8,
    textAlign: 'left',
    top: 8,
    marginBottom: 5,
    width: 100,
    color: 'grey',
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    
  },
  emoji: {
    fontSize: 40,
    marginRight: 10,
    paddingLeft: 20,
    marginTop: -5,
  },
  prompt: {
    fontSize: 20,
    paddingLeft: 30,
    color: '#10A9A1',
    fontWeight: "bold",
    flex: 1,
  },
  arrowIcon: {
     
  },
});
