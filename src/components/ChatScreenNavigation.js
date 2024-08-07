import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ChatScreenNavigation({chats}) {
    return (
      <View style={styles.chatScreenBar}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={[styles.chatScreenBarText, styles.chatScreenBarTextActive]}>All</Text>
        {chats.length > 0 && chats[0].newNotif ? (
          <View style={styles.chatScreenBarTextContainer}>
            <Text style={styles.chatScreenBarText}>Unread</Text>
            <Text style={styles.chatScreenBarNotif}>1</Text>
          </View>
        ) : null}
        <Text style={styles.chatScreenBarText}>Groups</Text>
        <Text style={styles.chatScreenBarText}>Reply</Text>
        <Text style={styles.chatScreenBarText}>Stories</Text>
        <Text style={styles.chatScreenBarText}>Sent</Text>
        <Text style={styles.chatScreenBarText}>Best Friends</Text>
        <Text style={styles.chatScreenBarText}>Streaks</Text>
        <Text style={styles.chatScreenBarText}>New</Text>
      </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
  chatScreenBar: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },

  chatScreenBarText: {
    paddingHorizontal: 15,
    fontWeight: "bold",
    color: "grey",
    height: 30,
    paddingTop: 10,
    paddingBottom: 25,
  },

  chatScreenBarTextActive: {
    backgroundColor: "lightgrey",
    width: 50,
    borderRadius: 18,
    overflow: "hidden",
    marginLeft: 5
  },

  chatScreenBarTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  chatScreenBarNotif: {
    color: "white",
    fontSize: 12,
    backgroundColor: "#043c5d",
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    textAlign: "center",
    paddingTop: 2,
    marginLeft: -8,
    marginRight: 8
  },
});