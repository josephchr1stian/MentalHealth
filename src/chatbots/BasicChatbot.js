import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import defaultProfileImage from "../../assets/snapchat/defaultprofile12.png";
import { getChat } from "../utils/hooks/getChatGPT";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

const prompt = [
  {
    role: "assistant",
    content: "Imagine you are a therapist helping me explore my thoughts and emotions. Do not make any insights or suggestions. Help me reflect and open up. Be kind.Ask me questions to help me get a brief lay of the land. Be succinct. Question chaining. One tight question at a time. "
  },
];

export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);


  async function fetchInitialMessage() {
    const response = await getChat(prompt);
    console.log(prompt);
    const message = response.choices[0].message;
    console.log("message: ", message);
    const content = response.choices[0].message.content;
    console.log("content: ", content);
    addBotMessage(content);
  }
  useEffect(() => {
    //setMessages([]);
    fetchInitialMessage();
  }, []);

  async function fetchReply(messageHistory) {
    console.log("HISTORY PRE PROMPT",messageHistory)
    console.log("HISTORY POST PROMPT", [prompt[0],...messageHistory])
    const response = await getChat([prompt[0],...messageHistory]);
    if (response != null) {
      console.log("responces choice message : ", response.choices[0].message);
      const message = response.choices[0].message;
      const content = response.choices[0].message.content;
      console.log("content: ", content);
      addBotMessage(content)

    }
  }

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  // We have a previous message array we are updating. We can create our chat response using this
  // When chat or user sends a message
  // We need to show the message, and call add new message
  // When the user sends a message
  // Add this message history
  //Send everything to chat
  // Map thru message history to send the right things to chat
  //Add chat reply to history
  //Display messages

  // Reverse the messages
  const respondToUser = (userMessages) => {

    const allMessages = [userMessages[0], ...messages].reverse(); // Add the user message to the front of the array
    const temp = {};
    console.log("all messages: ", allMessages);
    //let gptMessages = []
    // Desired format is {role; "", content: ""}
    const gptMessages = allMessages.map((entry) => {
      let temp = {};
      console.log("Mapping through message", entry);
      if (entry.user.name === "React Native Chatbot") {
        temp["role"] = "assistant";
      } else {
        temp["role"] = "user";
      }
      temp["content"] = entry.text;
      console.log("Temp is", temp);
      return temp
    });
    console.log("Object 2 gpt", gptMessages);
    fetchReply(gptMessages)
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
