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

  const fetchData = async () => {
    console.log("oooo im gonna fetch");
    try {
      const { data, error } = await supabase
        .from("allPrompt")
        .select("*")
        .eq("category", "snap");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("data is", data);
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
  function handlePress() {
    setVisible(!visible);
  }

  function getRandomAction(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={[styles.cameraOptions, { marginTop: insets.top }]}>
      <Dialog
        overlayStyle={styles.suggest}
        isVisible={visible}
        onBackdropPress={() => setVisible(!visible)}
        backdropStyle={styles.backdrop}
      >
        <Text style={styles.action}> {action}</Text>
        <Text style={styles.suggestion}> {suggestion} </Text>
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

        <TouchableOpacity onPress={handlePress}>
          <Ionicons
            style={styles.Icon}
            name="heart"
            size={30}
            color="#68D89B"
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
    height: 340,
    width: 45,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  },
  fab: {
    width: 40, // Adjust the width of the FAB
    height: 60, // Adjust the height of the FAB
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  iconContainer: {
    justifyContent: "center", // Center the icon vertically
    alignItems: "center", // Center the icon horizontally
  },
  suggest: {
    position : 'absoloute',
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

  Icon: {
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
