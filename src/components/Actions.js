import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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
      <Text style={styles.eventText}>Snap Daily</Text>
      <Text style={styles.text}>A place to grow healthy minds.</Text>
      <FlatList
        style={{ backgroundColor: "white" }}
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
              <Ionicons
                style={styles.arrowIcon}
                name="chevron-forward"
                size={24}
                color="grey"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </Dialog>
  );
}

const styles = StyleSheet.create({
  Frame: {
    borderRadius: 20,
    height: "45%",
    width: "90%",
  },
  eventText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    //fontWeight: "bold",
    marginBottom: 20,
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
    textAlign: "center",
    fontSize: 15,
    fontWeight: "semibold",
    width: 200,
    marginBottom: 20,
    backgroundColor: "cyan",
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
  },
  emoji: {
    fontSize: 40,
    marginRight: 10,
  },
  prompt: {
    fontSize: 18,
    flex: 1,
  },
  arrowIcon: {},
});
