import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dialog, FAB } from "react-native-elements";

export default function CameraOptions({ flipCamera, switchFlash }) {
  const [flashState, setFlashState] = useState("flash-off-outline");
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState("Lead with Compassion")
  const [suggestion, setSuggestion] = useState("It never fails <3")

  function switchFlash() {
    if (flashState == "flash-off-outline") {
      setFlashState("flash-outline");
    } else {
      setFlashState("flash-off-outline");
    }
  }
  function handlePress (){
    setVisible(!visible)
    newAct = getRandomAction(actions)
    setAction(newAct.action)
    setSuggestion(newAct.suggestion)
  }

  let actions = [
    {
      "action": "Show Appreciation",
      "suggestion": "Say thanks and let them know you notice their kindness 🌿💚"
    },
    {
      "action": "Offer Praise",
      "suggestion": "Give them a genuine compliment about something they’re great at! 🌟🌱"
    },
    {
      "action": "Create Joyful Moments",
      "suggestion": "Do stuff that’s fun and makes good memories together! 🌞🌻"
    },
    {
      "action": "Lend a Hand",
      "suggestion": "Offer to help out, or just be there to listen when they need it. 🌳🤝"
    },
    {
      "action": "Share Personal Stories",
      "suggestion": "Open up about something meaningful from your own life to connect better <3 🍂🌼"
    },
    {
      "action": "Plan Memorable Outings",
      "suggestion": "Plan a cool outings based on what you like, and have a great time!  🏞️🌄"
    },
    {
      "action": "Support Their Passions",
      "suggestion": "Show you care about their hobbies by getting into them or learning about them. 🌲📚"
    }]
    function getRandomAction(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }

  return (
    <View style={[styles.cameraOptions, { marginTop: insets.top }]}>
      <FAB
        style={styles.expanded}
        title={"myWellness"}
        titleStyle={{ color: "white", fontWeight: "bold" }}
        icon={{ name: "favorite", color: "white" }}
        color="rgba(52, 52, 52, 0.6)"
        onPress={handlePress}
      />
      <Dialog overlayStyle = {styles.suggest} isVisible={visible} onBackdropPress={() => setVisible(!visible)} backdropStyle = {styles.backdrop}>
        <Text style = {styles.action}> {action}</Text>
        <Text style = {styles.suggestion}> {suggestion} </Text>
      </Dialog>
      <View>
        <TouchableOpacity onPress={flipCamera}>
          <Ionicons
            style={styles.flipIcon}
            name="repeat"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={switchFlash}>
          <Ionicons
            style={styles.Icon}
            name={flashState}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.Icon}
            name="videocam"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.Icon}
            name="musical-notes-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.Icon}
            name="moon-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraOptions: {
    position: "absolute",
    right: 12,
    paddingTop: 20,
    height: 280,
    width: 40,
    padding: 5,
    borderRadius: 20,
    backgroundColor:"rgba(52, 52, 52, 0.6)",

  },
  suggest: {

    backgroundColor:"rgba(52, 52, 52, 0.0)",
    width: '60%',

  },
  action: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',

  },
  suggestion:{
    color: 'white',
    fontSize : 14

  },

  expanded: {
    position: "absolute",
    top: 10,
    left: -345,
    width: 200,
    color: "white",
  },
  backdrop:{
    backgroundColor: 'rgba(0, 0, 0, 0.01)', 
  },
  Icon:{
    marginTop: 20,


  },
  flipIcon: {
    marginTop: 10,
    transform: [{ rotate: "90deg" }],
  },
  flashIcon: {
    marginTop: 20,
  },
  videoIcon: {
    marginTop: 20,
  },
  musicIcon: {
    marginTop: 20,
  },
  nightModeIcon: {
    marginTop: 20,
  },
});
