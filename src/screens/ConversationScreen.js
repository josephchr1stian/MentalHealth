import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Platform, Text, View, ImageBackground } from "react-native";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import BasicChatbot from "../chatbots/BasicChatbot";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Actions from "../components/Actions";
import { FAB } from "react-native-elements";


export const CHATBOTS = {
  "BasicChatbot": {
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  },
};


export default function ConversationScreen({ route, navigation }) {
  const { user } = useAuthentication();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [visible, setVisible] = useState(true)
  const [messages, setMessages] = useState([]);


function toggleActions(){
  setVisible(!visible)

}

  return (
    <ImageBackground
      source={{ uri: "https://i.imgur.com/MfiOQCb.png" }} 
      style={styles.background}
    >
{/*       
      <Actions isVisible={visible} onClose={toggleActions}></Actions> */}
      <SafeAreaView style={styles.container}>
        <BasicChatbot />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
   
  },
  background: {
    flex: 1,
    resizeMode: "cover", 
  },
  addButton:{
    position: "absolute",
    bottom: 90,
    right: 20,
  },
});
