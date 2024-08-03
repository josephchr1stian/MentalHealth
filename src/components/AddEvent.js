import React from "react";
import { useState } from "react";

import { View, Text, TextInput, StyleSheet, Image, Button, TouchableOpacity} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { Dialog, FAB } from "@rneui/themed";


export default function AddEvent({ isVisible, onClose }) {
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [imageURL, setImageURL] = useState('');

    const [event, setEvent] = useState({})

    const fallbackImageURL = "https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg";

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
    //we want to use this function to send information to Supabse when Submit button is clicked
    function submitToSupabase(){  
        const validImageURL = isValidUrl(imageURL) ? imageURL : fallbackImageURL;
        let object = {
            id: btoa(title + time + new Date().toISOString()),
            title:title,
            description:descr,
            time:time,
            location:location,
            host:"someUsername",
            imageURL: validImageURL,
            attending:0,
            private:false,
            created_at: new Date().toISOString(),
        }
        return object
    }

    const insertData = async () => {
        if(title!="" && time!="" && location!=""){

            const eventData = submitToSupabase()
            console.log(eventData)

            onClose()
            try {
            const { data, error } = await supabase
                .from("event_table") // 
                .insert([eventData]); // Insert the event data
        
            if (error) {
                console.error("Event already exists:", error);
            } else {
                console.log("Data inserted:", data);
            }
            } catch (error) {
            console.error("Unexpected error:", error);
            }
        }
      };
  return (
    <Dialog overlayStyle= {styles.DialogueBox} isVisible={isVisible} onBackdropPress={onClose}>
      <Text style={styles.eventText}>Event Details</Text>
      <TextInput onChangeText={text => setTitle(text)} style={styles.inputFields} placeholder="Title (required)"></TextInput>
      <TextInput
        onChangeText={text => setDescr(text)} 
        style={styles.descriptionField}
        placeholder="Description"
      ></TextInput>
      <TextInput onChangeText={text => setTime(text)}  id = "time" style={styles.inputFields} placeholder="Time (required)"></TextInput>
      <TextInput onChangeText={text => setLocation(text)}  style={styles.inputFields} placeholder="Location (required)"></TextInput>
      <TextInput onChangeText={text => setImageURL(text)}  style={styles.inputFields} placeholder="Picture Url"></TextInput>

      <FAB
        icon={{ name: "upload", color: "white" }}
        style = {styles.uploadButton}
        title="Upload Picture"
        color = "#65BEFF"
      />
    <FAB style = {styles.closeIcon} onPress={onClose}
        color = {"none"}
        icon={{ name: "close", color: "black" }}
    />

    <FAB
        style = {styles.uploadButton}
        title="Submit"
        onPress = {insertData}
        color = "#289CF1"
      />
    </Dialog>
  );
}
const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "yellow",
    width: "80%",
    // aspectRatio: 1,
    position: "absolute",
    alignSelf: "center",
    top: "20%",
    borderRadius: 20,
    padding: 20,
  },
  DialogueBox:{
    // height: "60%",
    borderRadius:20,
  },
  eventText: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
  inputFields: {
    marginTop: 10,
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 5,
  },
  descriptionField: {
    marginTop: 10,
    backgroundColor: "#F0F0F0",
    padding: 8,
    borderRadius: 5,
    paddingBottom: 30,
  },
  otherButtons:{
    backgroundColor:"yellow",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    flexWrap:"wrap"
  },
  uploadButton:{
    marginTop:16,
    
  },
  closeIcon:{
    position:"absolute",
    top:0,
    right:0,
  }
});