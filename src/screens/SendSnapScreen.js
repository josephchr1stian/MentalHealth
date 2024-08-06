import React from "react";

import { View, SafeAreaView, TouchableOpacity, StyleSheet, Text } from "react-native";
export default function SendSnapScreen() {
  return (
    <SafeAreaView >
      <TouchableOpacity style={styles.Active}>
        <Text> hiiii </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Active: {
    flex: 1,
    backgroundColor: "red",
    width: "auto",
    height: "auto",
  },
});
