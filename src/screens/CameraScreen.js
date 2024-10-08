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
import {
  BottomTabBar,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraActions from "../components/CameraActions";
import CameraOptions from "../components/CameraOptions";
import PostcaptureOptions from "../components/PostcaptureActions";
import { useNavigation } from "@react-navigation/native";
// Add supabase to store:
import { supabase } from "../utils/hooks/supabase";
import CameraGalleryMenu from "../components/CameraGalleryMenu";
import { Button, FAB } from "react-native-elements";
import { ListItem } from "@rneui/themed";
import { Overlay } from "react-native-elements";
import { Icon } from "@rneui/themed";
import { ImageBackground } from "react-native";

export default function CameraScreen({ navigation, focused }) {
  const tabBarHeight = useBottomTabBarHeight();
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

  const [sending, setSending] = useState(false);
  const nav2 = useNavigation();

  useEffect(() => {
    (async () => {
      // Request media library permissions
      const { status: mediaLibraryStatus } =
        await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus === "granted");
      requestPermission(true);
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.button}
        ></TouchableOpacity>
      </View>
    );
  }

  function flipCamera() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function galleryMenu() {
    // console.log("HELLO, is the gallery menu being shown?\n", !showGalleryMenu)
    // return <CameraGalleryMenu />
    setShowGalleryMenu(!showGalleryMenu);
  }
  async function checkGallery() {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);
    console.log(pickerResult);
    setShowGalleryMenu(false); //By Ryan
    console.log(pickerResult.assets[0].uri);
    if (!pickerResult.canceled) {
      //setImage(pickerResult.uri);
      setPhoto(pickerResult.assets[0]); //By Ryan
    }
  }

  async function takePhoto() {
    if (cameraRef.current) {
      navigation.navigate("CameraScreenPost");

      console.log("Taking Photo now");
      const options = { quality: 1, base64: true, exif: false };
      const passPhoto = await cameraRef.current.takePictureAsync(options);
      // const newPhoto = { uri: "https://i.postimg.cc/VvFzmBwn/SMILE.png" };
      setPhoto(passPhoto);
      const { error } = await supabase
        .from("gallery")
        .insert({ photo: passPhoto.uri });
      console.log("After Insert to table!");
      if (error) {
        console.error("Error inserting photo:", error.message);
      }
      console.log(passPhoto);
      navigation.navigate("CameraScreenPost", { photo: passPhoto });
    }
  }

  function savePhoto() {
    MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      setPhoto(null);
    });
  }

  // There is a photo
  // if (photo) {
  //   const sharePic = () => {
  //     shareAsync(photo.uri).then(() => {
  //       setPhoto(null);

  //       navigation.setOptions({ tabBarStyle: { display: "none" } });
  //     });
  //   };

  //   // If there is a photo taken we see this

  //   return (
  //     <View
  //       style={[
  //         styles.container,
  //         {
  //           marginBottom: tabBarHeight,
  //           paddingTop: insets.top,
  //           // backgroundColor: 'orange',
  //           paddingBottom: insets.bottom,
  //         },
  //       ]}
  //     >
  //       <Image
  //         style={facing === "front" ? styles.frontPreview : styles.preview}
  //         //source={{ uri: "data:image/jpg;base64," + photo.base64 }}
  //         // We don't need that base64 thing, just uri is good
  //         source={{ uri: photo.uri }}
  //       />
  //       {hasMediaLibraryPermission && (
  //         <PostcaptureOptions
  //           deletePhoto={() => setPhoto(null)}
  //           savePhoto={savePhoto}
  //         />
  //       )}
  //       <View style={styles.bottomRow}>
  //         <FAB
  //           title=""
  //           icon={{ name: "download", color: "white" }}
  //           color="#6e6e6e"
  //         ></FAB>
  //         <FAB title="Stories" fontWeight="bold" color="#6e6e6e"></FAB>
  //         <FAB
  //           title="Send to joe"
  //           icon={{ name: "send", color: "white" }}
  //           color="#10A9A1"
  //           onPress={() => navigation.navigate("SnapScreen")}
  //         ></FAB>
  //       </View>
  //     </View>
  //   );
  // }

  if (showGalleryMenu) {
    return (
      <View
        style={[
          styles.container,
          {
            marginBottom: tabBarHeight,
            paddingTop: insets.top,
            backgroundColor: "#fffff",
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
        <CameraOptions flipCamera={flipCamera} />
        <CameraActions
          galleryMenu={galleryMenu}
          checkGallery={checkGallery}
          takePhoto={takePhoto}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={showGalleryMenu}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                onPress={checkGallery}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? "blue" : "transparent" },
                  styles.buttonStyle,
                ]}
                // style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>Phone Gallery</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate("MemoryScreen");
                }}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>ChatSnap Memories</Text>
              </Pressable>
              <Pressable onPress={galleryMenu} style={styles.closeButtonStyle}>
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: tabBarHeight,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: "rgba(0, 0, 0, 0.00)", // COLOR OF the camera
        },
      ]}
    >

     

      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      <ImageBackground source={{uri: "/Users/christian/VsCodeProjects/MentalHealth/assets/snapchat/Mask group.png"}} style={styles.pic}>
      </ImageBackground>


      <CameraOptions flipCamera={flipCamera} />

      <CameraActions
        galleryMenu={galleryMenu}
        checkGallery={checkGallery}
        takePhoto={takePhoto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgba(0, 0, 0, 0.00)" ,
  },
  pic: {
    
    position: "absolute",
    left: -50,
    top: 0,
    width: '110%', // Adjust size as needed
    height: '110%', // Adjust size as needed
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "rgba(0, 0, 0, 0.00)",
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
