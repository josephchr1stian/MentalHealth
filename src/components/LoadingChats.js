import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import defaultPhoto from "../../assets/snapchat/defaultprofile.png";
import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function LoadingChats() {
  const [usersToAdd, setUsersToAdd] = useState([]);
  const { user } = useAuthentication();
  const [currentFriends, setCurrentFriends] = useState([]);

  useEffect(() => {
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
    }
  }, [user]);

  async function addFriend(userToAdd) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("friend_ids")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error adding friend:", error.message);
        return;
      }

      let friend_ids = data.friend_ids || [];

      if (!friend_ids.includes(userToAdd.id)) {
        friend_ids.push(userToAdd.id);
      }

      const { updateError } = await supabase
        .from("profiles")
        .update({ friend_ids })
        .eq("id", user.id);

      if (updateError) {
        console.error("Error updating friend list:", updateError.message);
        return;
      }

      alert(`Added ${userToAdd.name} as a friend!`);
      setCurrentFriends(friend_ids);
    } catch (error) {
      console.error("Error adding friend:", error.message);
    }
  }

  return (
    <View style={styles.container}>
      {usersToAdd
        .filter((userToAdd) => !currentFriends.includes(userToAdd.id))
        .map((user, index) => (
          <View key={index} style={styles.myBitmoji}>
            <Image style={styles.bitmojiImage} source={defaultPhoto} />
            <Text style={styles.bitmojiText}>{user.name}</Text>
            <Pressable
              style={styles.addButton}
              onPress={async () => {
                await addFriend(user);
              }}
            >
              <Text style={styles.addButtonText}>Quick Add</Text>
            </Pressable>
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
  myBitmoji: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
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
