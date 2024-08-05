import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { Dialog } from "@rneui/themed";

export default function Disclaimer({ isVisible, onClose }) {
  return (
    <Dialog
      overlayStyle={styles.DialogueBox}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.titleText}>Intro to Wellness</Text>
      <Text style={styles.disclaimerText}>
        This AI is not a therapist. It is here to help you explore your thoughts
        and emotions and to aid in self-reflection.
      </Text>
      <TouchableOpacity onPress={onClose} style={styles.button}>
        <Text style={styles.buttonText}>Something</Text>
      </TouchableOpacity>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  DialogueBox: {
    borderRadius: 20,
  },
  titleText: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
  },
  disclaimerText: {
    textAlign: "center",
    fontSize: 15,
    //fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3CB2E2",
    borderRadius: 5,
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
});
