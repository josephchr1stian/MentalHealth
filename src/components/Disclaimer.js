import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { Dialog } from "@rneui/themed";
import masielquestion from "../../assets/snapchat/masielquestion.png";

export default function Disclaimer({ isVisible, onClose }) {
  return (
    <Dialog
      overlayStyle={styles.DialogueBox}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.titleText}>Oh hey! It's MyWellness</Text>
      <Image style={styles.masielquestion} source={masielquestion} />
      <Text style={styles.disclaimerHeadText}>
        Here's what you should know from MyWellness:
      </Text>
      <Text style={styles.disclaimerText}>
        This is built on generative Al language models.While we strive for
        accuracy and quality, please note that the information provided may not
        be entirely error-free or up-to-date.
      </Text>

      <Text style={styles.disclaimerText}>
        We recommend independently verifying the content and consulting with
        professionals for specific advice or information.
      </Text>

      <Text style={styles.disclaimerText}>
        We do not assume any responsibility or liability for the use or
        interpretation of this content.
      </Text>
      <Text style={styles.disclaimerText}>
        MyWellness content, information, comments, opinions, advice or guidance,
        programs and activities do not constitute medical or legal advice and
        are not intended to be relied upon to cure, diagnose or treat any mental
        or physical health condition.
      </Text>

      <TouchableOpacity onPress={onClose} style={styles.button}>
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
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
  },
  disclaimerText: {
    textAlign: "left",
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    backgroundColor: "#3CB2E2",
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
    width: "25%",
    height: "25%",
  },
});
