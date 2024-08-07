import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, Text, View } from "react-native";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import UserChat from "../components/UserChat";
import BasicChatbot from "../chatbots/BasicChatbot";
import { supabase } from "../utils/hooks/supabase";
import { GiftedChat } from "react-native-gifted-chat";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import MyAi from "../chatbots/MyAi";

export const CHATBOTS = {
  "BasicChatbot": {
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  },
  "MyAi": {
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: MyAi,
  }
};

export default function ConversationScreen({ route, navigation }) {
  const { user } = useAuthentication();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <BasicChatbot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
