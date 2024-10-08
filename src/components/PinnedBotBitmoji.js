import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { fontHeader } from "../../assets/themes/font";
import { colors } from "../../assets/themes/colors";



export default function PinnedBotBitmoji({name="defualtName", streak = {} , imgSource=require("../../assets/snapchat/personalBitmoji.png")}) {
  
  function pickEmoji(streak){
    if( streak < 3){
      return null
    }
    else if (streak <= 6){
      return streak + " " + '🌱'
    }
    else if (streak <= 7){
      return streak + " " + '🪴'
    }
    else if (streak > 7){
      return streak + " " + '🌷'
    }

  }

  return (
    <View style={styles.myBitmoji}>
      <Image
        style={styles.bitmojiImage}
        source={imgSource}
        

      />
      <View style={styles.bitmojiTextContainer}>
        <Text style={styles.bitmojiText}>{name}</Text>
        <Text style = {styles.bitmojiText}> {pickEmoji(streak)} </Text>
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  myBitmoji: {
    alignItems: "center",
    justifyContent: "center",
  },
  bitmojiImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  bitmojiTextContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  bitmojiText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  usernameText: {
    fontSize: 8,
    fontWeight: "700",
    opacity: 0.5,
  },
  Friends: {
    textAlign: "left",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.primary,
    fontSize: fontHeader.fontSize,
    fontFamily: fontHeader.fontFamily,
    fontWeight: fontHeader.fontWeight,
  },
});
