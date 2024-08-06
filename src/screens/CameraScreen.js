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
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraActions from "../components/CameraActions";
import CameraOptions from "../components/CameraOptions";
import PostcaptureOptions from "../components/PostcaptureActions";
// Add supabase to store:
import { supabase } from "../utils/hooks/supabase";
import CameraGalleryMenu from "../components/CameraGalleryMenu";
import { Button, FAB } from "react-native-elements";
import { ListItem } from "@rneui/themed";
import { Icon } from "@rneui/themed";

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
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text color="red" style={styles.text}>
            Grant 400 Permission
          </Text>
        </TouchableOpacity>
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
      // navigation.navigate("SnapScreen")

      console.log("Taking Phot1o");
      const options = { quality: 1, base64: true, exif: false };
      const newPhoto = { uri: "https://i.postimg.cc/VvFzmBwn/SMILE.png" };
      setPhoto(newPhoto);
      // console.log("This is the photo", newPhoto);
      // This part is to insert URI to "gallery" table
      console.log(" Before Insert to table!");
      const { error } = await supabase
        .from("gallery")
        .insert({ photo: newPhoto.uri });
      console.log("After Insert to table!");
      if (error) {
        console.error("Error inserting photo:", error.message);
      }
      // This part is to store images in a folder bucket named "pictureStorage"
      //uploadImage(newPhoto.uri);
    }
  }

  function savePhoto() {
    MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      setPhoto(null);
    });
  }

  // There is a photo
  if (photo) {
    const sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(null);
      });
    };

    return (
      <View
        style={[
          styles.container,
          {
            marginBottom: tabBarHeight,
            paddingTop: insets.top,
            backgroundColor: "red",
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <Image
          style={facing === "front" ? styles.frontPreview : styles.preview}
          //source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          // We don't need that base64 thing, just uri is good
          source={{ uri: photo.uri }}
        />
        {hasMediaLibraryPermission && (
          <PostcaptureOptions
            deletePhoto={() => setPhoto(null)}
            savePhoto={savePhoto}
          />
        )}
      </View>
    );
  }

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

  const list2 = [
    {
      name: "John Doe",
      subtitle: "Software Engineer",
      avatar_url: "https://example.com/avatar1.jpg",
    },
    {
      name: "Jane Smith",
      subtitle: "Product Manager",
      avatar_url: "https://example.com/avatar2.jpg",
    },
    {
      name: "Sam Wilson",
      subtitle: "Designer",
      avatar_url: "https://example.com/avatar3.jpg",
    },
  ];
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: tabBarHeight,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: "transparent", // COLOR OF the camera
        },
      ]}
    >

        {/* <ListItem.Accordion
          content={
            <>
              <Icon name="expand-more" size={30} />
              <ListItem.Content>
                <ListItem.Title>myWellness</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          containerStyle = {styles.dropdown}
          onPress={() => {
            console.log("Cheese");
            setExpanded(!expanded);
          }}
        >
          {list2.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ListItem.Accordion> */}
      
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      
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
    backgroundColor: "#ffffff",
  },
  camera: {
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  dropdown: {
    backgroundColor : 'transparent',
    borderRadius: 20,
    width: '20%',

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
