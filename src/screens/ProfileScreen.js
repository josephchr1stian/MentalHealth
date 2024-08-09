import { Image, Text, View, Button, StyleSheet } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      // Handle successful sign out (e.g., redirect to login screen)
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [astrology, setAstrology] = useState("Pisces");
  const userSign = findAstrologySign()

  useEffect(()=>{
    setAstrology(userSign.sign)
  }),[]

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../assets/snapchat/IMG_1619.jpg")}
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
      <Text style={{ justifyContents: "center" }}>User Name Would Go Here</Text>
      <Button
        onPress={() => {
          navigation.navigate("Astrology");
        }}
        title={astrology}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button onPress={handleSignOut} title="Log Out" />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        alignItems: "center",
    }
})
