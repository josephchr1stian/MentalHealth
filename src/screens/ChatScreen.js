import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FAB } from "@rneui/themed";
import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";
import LoadingChats from "../components/LoadingChats";

import Actions from "../components/Actions";
import PinnedBotBitmoji from "../components/PinnedBotBitmoji";
import Disclaimer from "../components/Disclaimer";

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [disclaimerVisible, setDisclaimerVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [streakDone, setStreakDone] = useState(false);
  const [streak, setStreak] = useState(6);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  function toggleActions() {
    console.log("Toggle Actions");
    setActionsVisible(!actionsVisible);
  }

  function toggleDisclaimer() {
    setDisclaimerVisible(false);
  }

  function handleCardTouch(event) {
    setDetailsVisible(true);
    setSelectedEvent(event);
  }

  function updateStreak() {
    if (streakDone === false) {
      // If we didnt do it today
      setStreak(streak + 1); // add one
      setStreakDone(true);
    }
    // Call this when user clicks a button on the Snap daily
  }

  function getChatbots() {
    let chatbotsTemp = [];
    for (const botId in CHATBOTS) {
      chatbotsTemp.push({ isChatbot: true, chatId: botId });
    }
    setChats((otherChats) => [...otherChats, ...chatbotsTemp]);
  }

  useEffect(() => {
    if (chats.length < 1) {
      getChatbots();
    }
  }, [chats.length]);
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          marginBottom: tabBarHeight,
        },
      ]}
    >
      <Header title="Chat" />

      <View style={styles.pinnedBotBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Conversation", {
              isChatbot: false,
              chatId: 1,
            });
          }}
          key={1}
        >
          <PinnedBotBitmoji name={"MyAI"}></PinnedBotBitmoji>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDisclaimerVisible(true)}>
          <PinnedBotBitmoji
            name={"Whisper"}
            imgSource={require("../../assets/snapchat/ghostFlat.png")}
            streak={streak} // State Variable we can update
          ></PinnedBotBitmoji>
        </TouchableOpacity>
      </View>

      <View>
        {/* commrnted out BasicChatbot to see what it looks like w/out */}
        
        {/* {chats?.map((chat) => (
          <TouchableOpacity
            style={styles.userButton}
            onPress={() => {
              navigation.navigate("Conversation", {
                isChatbot: chat.isChatbot,
                chatId: chat.chatId,
              });
            }}
            key={chat.chatId}
          >
            <Ionicons
              style={styles.userIcon}
              name="person-outline"
              size={36}
              color="lightgrey"
            />
            <Text style={styles.userName}> {chat.chatId} </Text>
            <Ionicons
              style={styles.userCamera}
              name="camera-outline"
              size={24}
              color="lightgrey"
            />
          </TouchableOpacity>
        ))} */}
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stories}
        >
          <LoadingChats navigation={navigation} />
        </ScrollView>
      </View>
      <FAB //initiatives button
        style={styles.addButton}
        visible={true}
        icon={{ name: "star", color: "white" }}
        color="#FF3386"
        onPress={toggleActions}
      />
      <FAB
        style={styles.addButtonSecond}
        visible={true}
        icon={{ name: "edit", color: "white" }}
        color="#3CB2E2"
      />
      <Actions
        isVisible={actionsVisible}
        onClose={toggleActions}
        // Pass the function to actions, call it on press for any of the buttons
        updateStreak={updateStreak}
      />
      <Disclaimer isVisible={disclaimerVisible} onClose={toggleDisclaimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  userButton: {
    padding: 25,
    display: "flex",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  uploadButton: {
    marginTop: 16,
  },
  userIcon: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  userName: {
    position: "absolute",
    left: 50,
    top: 14,
    fontSize: 18,
  },
  userCamera: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 90,
    right: 20,
  },
  addButtonSecond: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  pinnedBotBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
});
