import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraActions({ galleryMenu, checkGallery, takePhoto }) {
  return (
    <View style={styles.cameraActions}>
      <View style={styles.cameraButtons}>
        <TouchableOpacity onPress={galleryMenu} style={styles.photosIcon}>
          <Ionicons name="copy-outline" size={25} color="white" />

        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.pictureIcon}>
          <Ionicons name="ellipse-outline" size={80} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lensesIcon}>
          <Ionicons name="happy-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraActions: {
    position: "absolute",
    bottom: 16,
    paddingBottom: 32,
    width: "100%",
    alignItems: "center",
  },
  cameraButtons: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  photosIcon: {
    flex: 1,
    alignItems: "center",
    textShadowColor: 'red',
    
    
  },
  pictureIcon: {
    flex: 1,
    alignItems: "center",
  },
  lensesIcon: {
    flex: 1,
    alignItems: "center",
  },
});
