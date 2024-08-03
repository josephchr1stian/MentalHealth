import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { Dialog } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { FAB } from "react-native-elements";

export default function Actions({ isVisible, onClose }) {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [actions, setActions] = useState([]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("allPrompt").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setActions(data);
        console.log(data)
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  useEffect(() => {
    fetchData();
}, []);

  return (
    <Dialog
      overlayStyle={styles.DialogueBox}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.eventText}>Snap Daily</Text>
      <ScrollView horizontal = {true}>
        {actions.map((action) => (
          <View style ={styles.textAndButt}>
            <Text style = {styles.context}> {action.prompts.context} </Text>
            <FAB color = {action.prompts.color} title={action.prompts.prompt}> </FAB>
          </View>
        ))}
      </ScrollView>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  DialogueBox: {
    borderRadius: 20,
    height: "80%",
    width: "100%",
  },
  eventText: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textAndButt:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0, 
    backgroundColor : 'orange'

  },
  context: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "semibold",
    width: '30%',
    marginBottom: 20,
    backgroundColor : 'cyan'
    

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
