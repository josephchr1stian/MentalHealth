import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../utils/hooks/supabase";
import { Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";



export default function PostcaptureOptions() {
  const insets = useSafeAreaInsets();
  const [action, setAction] = useState("Lead with Compassion");
  const [suggestion, setSuggestion] = useState("It never fails <3");
  const [visible, setVisible] = useState(false);
 const navigation = useNavigation()

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

  function toggleVis() {
    setVisible(!visible);

  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <View style={[styles.deleteIcon, { marginTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Ionicons
            style={styles.textIcon}
            name="close"
            size={35}
            color="white"
            
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.cameraOptions, { marginTop: insets.top }]}>
        <TouchableOpacity>
          <Ionicons
            style={styles.textIcon}
            name="text-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            style={styles.pencilIcon}
            name="pencil-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.documentIcon}
            name="document-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleVis();
          }}
        >
          <Image
          style = {styles.pic}
          source={{uri:'/Users/christian/VsCodeProjects/MentalHealth/assets/snapchat/myWellVec.png'}}>

          </Image>
          {/* <ImageBackground
            style = {styles.pic}
            source={{uri: '/Users/christian/VsCodeProjects/MentalHealth/assets/snapchat/myWellVec.png'}}
            >

          </ImageBackground> */}
          <Ionicons
            style={styles.musicIcon}
            name="heart"
            size={30}
            color= "rgba(0, 0, 0, 0.00)"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.scissorsIcon}
            name="cut-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.musicIcon}
            name="musical-notes"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={styles.musicIcon}
            name="search"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Ionicons
            style={styles.musicIcon}
            name="download-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        {visible && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.action}>{action}</Text>
              <Text style={styles.suggestion}>{suggestion}</Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cameraOptions: {
    position: "absolute",
    right: 12,
    paddingTop: 8,
    height: 250,
    width: 40,
    padding: 5,
  },
  deleteIcon: {
    position: "absolute",
    left: 12,
    paddingTop: 8,
    height: 250,
    width: 40,
    padding: 5,
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
  textIcon: {
    marginTop: 10,
  },
  flashIcon: {
    marginTop: 20,
  },
  modalContainer: {
    position: "absolute",
    top: 600,
    width: 400,
    flex: 1,
    left: -363,
    backgroundColor: "rgba(0, 0, 0, 0.0)", // Slightly darkened background
  },
  modalContent: {
    backgroundColor: "rgba(52, 52, 52, 0.9)",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    alignItems: "center",
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
  pencilIcon: {
    marginTop: 10,
  },
  pic : {
    position: 'absolute',
    left: -10,
    top: 11,
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    justifyContent: 'center',
    alignItems: 'center',

  },
  videoIcon: {
    marginTop: 20,
  },
  scissorsIcon: {
    marginTop: 20,
    transform: [{ rotate: "270deg" }],
  },
  documentIcon: {
    marginTop: 20,
    transform: [{ rotate: "10deg" }],
  },
  musicIcon: {
    marginTop: 20,
  },
});
