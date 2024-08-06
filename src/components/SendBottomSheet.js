import React from "react";
import { BottomSheet, ListItem } from "@rneui/themed";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SendBottomSheet = ({ showMenu, setShowMenu }) => {
  const list = [
    {
      title: "",
      containerStyle: { backgroundColor: "#3CB2E2" },
      titleStyle: { color: "white" },
      onPress: () => setShowMenu(false),
    },
  ];

  return (
    <BottomSheet
      modalProps={{
        transparent: true,
        animationType: "slide",
        visible: showMenu,
        onRequestClose: () => setShowMenu(false),
      }}
      isVisible={showMenu}
      containerStyle={{ backgroundColor: "transparent" }}
    >
      {list.map((l, i) => (
        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
          <ListItem.Content style={styles.listItemContent}>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            <Ionicons
              style={styles.sendIcon}
              name="send"
              size={24}
              color="white"
            />
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  listItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sendIcon: {
    marginRight: 10,
  },
});

export default SendBottomSheet;
