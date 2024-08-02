import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { Dialog } from "@rneui/themed";

export default function Disclaimer({ isVisible, onClose }) {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [event, setEvent] = useState({});

  return (
    <Dialog
      overlayStyle={styles.DialogueBox}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.eventText}>Intro to Wellness</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Something</Text>
      </TouchableOpacity>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  DialogueBox: {
    borderRadius: 20,
  },
  eventText: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
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
