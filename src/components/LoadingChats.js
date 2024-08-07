import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import defaultPhoto from "../../assets/snapchat/defaultprofile.png";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function LoadingChats({ navigation }) {
  const [usersToAdd, setUsersToAdd] = useState([]);
  const { user } = useAuthentication();
  const [currentFriends, setCurrentFriends] = useState([]);
  const [currentChats, setCurrentChats] = useState([]);

  useEffect(() => {
    async function fetchCurrentChats() {
      try {
        const { data, error } = await supabase
          .from("Chats")
          .select("id, isChatBot, correspondent_id")
          .where({ user_id: user.id });
        if (error) {
          console.error("Error getting current chats:", error.message);
          return;
        }
        console.log({ data });
        if (data) {
          setCurrentChats(data);
        }
      } catch (error) {
        console.error("Error getting current chats:", error.message);
      }
    }

    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, username");

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
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }

    async function fetchCurrentFriends() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("friend_ids")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching current friends:", error.message);
          return;
        }
        if (data) {
          setCurrentFriends(data.friend_ids || []);
        }
      } catch (error) {
        console.error("Error fetching current friends:", error.message);
      }
    }

    if (user) {
      fetchCurrentFriends();
      fetchUsers();
      fetchCurrentChats();
    }
  }, [user]);

  async function getChat(correspondent_id) {
    for (chat in currentChats) {
      if (correspondent_id === chat.correspondent_id) {
        return chat.id;
      }
    }
    try {
      const { data, error } = await supabase
        .from("Chats")
        .insert({ correspondent_id: correspondent_id, user_id: user.id })
        .select("id");
      if (error) {
        console.log(error, "THis is line 74");
      }
      return data.id;
    } catch (error) {
      console.error("Error creating chat", error.message);
    }
  }

  return (
    <View style={styles.container}>
      {usersToAdd
        .filter((userToAdd) => !currentFriends.includes(userToAdd.id))
        .map((user, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.userContainer}
              onPress={() => {
                let chatId = getChat(user.id);
                navigation.navigate("Conversation", {
                  isChatbot: false,
                  chatId: chatId,
                });
              }}
              key={index}
            >
              <Image style={styles.bitmojiImage} source={defaultPhoto} />
              <Text style={styles.bitmojiText}>{user.name}</Text>
              <Ionicons
                style={styles.userCamera}
                name="camera-outline"
                size={24}
                color="lightgrey"
              />
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  bitmojiImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  bitmojiText: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1, // To take up the remaining space
  },
  addButton: {
    backgroundColor: "#FFFF00",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "black",
  },
});
