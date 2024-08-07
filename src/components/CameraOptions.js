import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dialog, FAB } from "react-native-elements";
import { supabase } from "../utils/hooks/supabase";

export default function CameraOptions({ flipCamera, switchFlash }) {
  const [flashState, setFlashState] = useState("flash-off-outline");
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState("Lead with Compassion");
  const [suggestion, setSuggestion] = useState("It never fails <3");
  const [pressedIcon, setPressedIcon] = useState(null);

  const fetchData = async () => {

    try {
      const { data, error } = await supabase
        .from("allPrompt")
        .select("*")
        .eq("category", "snap");
      if (error) {
        console.error("Error fetching data:", error);
      } else {

        setAction(data[0].prompts.prompt);
        setSuggestion(data[0].prompts.context);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  function switchFlash() {
    if (flashState == "flash-off-outline") {
      setFlashState("flash-outline");
    } else {
      setFlashState("flash-off-outline");
    }
  }
  // function handlePress() {
  //   setVisible(!visible);
  // }

  function getRandomAction(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  const handlePress = (icon) => {
    console.log(icon);
    setPressedIcon(icon === pressedIcon ? null : icon);
    if (icon === "heart") {
      console.log("heart clicked");
      setVisible(!visible);
      // setPressedIcon(!pressedIcon)
    }
  };

  function closeBoth() {
    setVisible(false);
    handlePress('heart');

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={[styles.cameraOptions, { marginTop: insets.top }]}>
      <Dialog
        overlayStyle={styles.suggest}
        isVisible={visible}
        onBackdropPress={() => closeBoth()}
        backdropStyle={styles.backdrop}
      >
        <Text style={styles.action}>{action}</Text>
        <Text style={styles.suggestion}>{suggestion}</Text>
      </Dialog>

      <View style={styles.iconContainer}>
        {[
          {
            name: "repeat",
            color: "white",
            onPress: flipCamera,
            caption: "Flip Camera",
          },
          {
            name: flashState,
            color: "white",
            onPress: switchFlash,
            caption: "Switch Flash",
          },
          {
            name: "videocam",
            color: "white",
            onPress: () => {},
            caption: "Record Video",
          },
          {
            name: "heart",
            color: "#68D89B",
            onPress: { handlePress },
            caption: "myWellness",
          },
          {
            name: "musical-notes-outline",
            color: "white",
            onPress: () => {},
            caption: "Music",
          },
          {
            name: "moon-outline",
            color: "white",
            onPress: () => {},
            caption: "Night Mode",
          },
        ].map((icon, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(icon.name)}>
            <View style={styles.iconRow}>
              {pressedIcon === icon.name && (
                <View style = {styles.captionWrapper}>
                  <Text style={styles.caption}>{icon.caption}</Text>
                </View>
              )}
              <Ionicons
                style={styles.icon}
                name={icon.name}
                size={30}
                color={icon.color}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraOptions: {
    position: "absolute",
    right: 12,
    paddingTop: 20,
    height: 320,
    width: 45,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  },
  iconContainer: {
    top: -20,
    justifyContent: "center", // Center the icon vertically
    alignItems: "center", // Center the icon horizontally
  },
  iconRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  caption: {
    color: "white",
    fontWeight: "bold",
    fontSize: "16",
  },
    captionWrapper: {
    position: 'absolute', // Position text absolutely
    left: -100, // Adjust this value to control the text position
    backgroundColor: 'transparent', // Background color
    padding: 5, // Padding around text
    zIndex: 1, // Ensure text is on top
  },

  suggest: {
    position: "absoloute",
    top: 200,
    backgroundColor: "rgba(52, 52, 52, 0.0)",
    width: "90%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.01)",
  },
  action: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  suggestion: {
    color: "white",
    fontSize: 14,
  },

  expanded: {
    top: 5,
    left: -3,
    // color: "white",
  },
});
