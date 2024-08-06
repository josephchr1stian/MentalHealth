import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostcaptureOptions({ savePhoto, deletePhoto }) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.deleteIcon, { marginTop: insets.top }]}>
        <TouchableOpacity onPress={deletePhoto}>
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
        <Text> gonna kill myself</Text>
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
        <TouchableOpacity onPress={deletePhoto}>
          <Ionicons
            style={styles.musicIcon}
            name="download-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
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
  textIcon: {
    marginTop: 10,
  },
  flashIcon: {
    marginTop: 20,
  },
  pencilIcon: {
    marginTop: 10,
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
