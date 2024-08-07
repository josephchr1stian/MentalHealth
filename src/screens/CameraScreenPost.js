import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
import { FAB } from "react-native-elements";
import {
  BottomTabBar,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraActions from "../components/CameraActions";
import CameraOptions from "../components/CameraOptions";
import PostcaptureOptions from "../components/PostcaptureActions";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function CameraScreenPost({}) {
  //   const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [expanded, setExpanded] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(true);
  const [photo, setPhoto] = useState(null);
  //const [image, setImage] = useState(null);
  const [showGalleryMenu, setShowGalleryMenu] = useState(false);
  const navigation = useNavigation();

  const [sending, setSending] = useState(false);
  const route = useRoute();

  function savePhoto() {
    MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      setPhoto(null);
    });
  }

  const photoImport = route.params;
  return (
    <View
      style={[
        styles.container,
        {
          //   marginBottom: tabBarHeight,
          paddingTop: insets.top,
          // backgroundColor: 'orange',
          paddingBottom: insets.bottom,
        },
      ]}
    >
        
      <Image
        style={facing === "front" ? styles.frontPreview : styles.preview}
        //source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        // We don't need that base64 thing, just uri is good
        source={{ uri: photoImport.uri }}
        // source={{ uri: "https://i.postimg.cc/VvFzmBwn/SMILE.png" }}
      />
      <Text position= {{top: 100, right: 40 }}> This is a new screen why nav..... </Text>

       <PostcaptureOptions></PostcaptureOptions>
      <View style={styles.bottomRow}>
        {/* <PostcaptureOptions></PostcaptureOptions> */}
        <FAB
          title=""
          icon={{ name: "download", color: "white" }}
          color="#6e6e6e"
        ></FAB>
        <FAB title="Stories" fontWeight="bold" color="#6e6e6e"></FAB>
        <FAB
          title="Send to"
          icon={{ name: "send", color: "white" }}
          color="#10A9A1"
          onPress={() => navigation.navigate("SnapScreen")}
        ></FAB>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bottomRow: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "8%",
    flexDirection: "row",
    backgroundColor: "#333333",
    justifyContent: "space-around", // Space buttons evenly
    paddingHorizontal: 20,
    zIndex: 10000,
  },
  save: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 60,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sendTo: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 60,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: "#00aeef",
    borderColor: "red",
    borderWidth: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  camera: {
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  dropdown: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "transparent",
    borderRadius: 20,
    width: "20%",
  },
  preview: {
    flex: 1,
    borderRadius: 16,
  },
  frontPreview: {
    flex: 1,
    borderRadius: 16,
    transform: [{ scaleX: -1 }],
  },
  modalView: {
    margin: 20,
    marginTop: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#2196F3",
  },
  closeButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: "white",
  },
});
