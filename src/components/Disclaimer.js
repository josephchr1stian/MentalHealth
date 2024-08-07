import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { Dialog } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import masielquestion from "../../assets/snapchat/masielquestion.png";

export default function Disclaimer({ isVisible, setIsVisible, onClose }) {
  const navigation = useNavigation();
  return (
    <Dialog
      overlayStyle={styles.DialogueBox}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.titleText}>Oh hey! It's MyWellness</Text>
      <Image
        style={styles.masielquestion}
        source={masielquestion}
        resizeMode="contain"
      />
      <Text style={styles.disclaimerHeadText}>
        Here's what you should know from MyWellness:
      </Text>
      <Text style={styles.disclaimerText}>
        • This is built on generative Al language models.While we strive for
        accuracy and quality, please note that the information provided may not
        be entirely error-free or up-to-date.
      </Text>

      <Text style={styles.disclaimerText}>
        • We recommend independently verifying the content and consulting with
        professionals for specific advice or information.
      </Text>

      <Text style={styles.disclaimerText}>
        • We do not assume any responsibility or liability for the use or
        interpretation of this content.
      </Text>
      <Text style={styles.disclaimerText}>
        • MyWellness content, information, comments, opinions, advice or
        guidance, programs and activities do not constitute medical or legal
        advice and are not intended to be relied upon to cure, diagnose or treat
        any mental or physical health condition.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsVisible(false);

          navigation.navigate("Conversation", {
            isChatbot: false,
            chatId: 1,
          });
        }}
        key={1}
      >
        <Text style={styles.buttonText}>Start Chat</Text>
      </TouchableOpacity>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  DialogueBox: {
    borderRadius: 20,
    width: "85%",
    height: "85%",
  },
  titleText: {
    color: "#0da89f",
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
  },
  disclaimerText: {
    textAlign: "left",
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    backgroundColor: "#0da89f",
    borderRadius: 30,
    height: 50,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disclaimerHeadText: {
    textAlign: "center",
    fontSize: 15,
    //fontWeight: "bold",
    marginBottom: 20,
  },
  masielquestion: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    width: "60%", // Adjust the width to a larger percentage
    height: undefined,
    aspectRatio: 1, // Maintains aspect ratio of pic
  },
});
