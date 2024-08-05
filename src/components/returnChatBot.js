import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import BasicChatbot from "../chatbots/BasicChatbot";


// prettier-ignore
export const CHATBOTS = {
  "Monkey Paw Bot": {
    id: "Monkey Paw Bot",
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  }
//   "BakersChatbot": {
//     id: "BakersChatbot",
//     name: "Baker's Dog Trivia",
//     imageUrl: "https://img.freepik.com/free-vector/cute-dog-robot-cartoon-character-animal-technology-isolated_138676-3143.jpg?w=150",
//     component: BakersChatbot,
//   },
//   "TriviaChatbot": {
//     id: "TriviaChatbot",
//     name: "chill cat trivia",
//     imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/White_square_with_question_mark.png",
//     component: TriviaChatbot,
//   },
//   "SedsChatbot": {
//     id: "SedsChatbot",
//     name: "agnostic sedbot",
//     imageUrl: "https://static.miraheze.org/greatcharacterswiki/thumb/5/59/Girdog_as_GIR%27s_disguise.png/280px-Girdog_as_GIR%27s_disguise.png",
//     component: SedsChatbot,
  };

export default function returnChatBot({ route }) {
  const { chatbotName } = route.params;
  console.log("ChatScreen :", chatbotName)

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
