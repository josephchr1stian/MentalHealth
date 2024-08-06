import React from "react";
import { BottomSheet, ListItem } from "@rneui/themed";
import { StyleSheet } from "react-native";

const SendBottomSheet = ({ showMenu, setShowMenu }) => {
  const list = [
    {
      title: "boop boop boop",
      containerStyle: { backgroundColor: "#3CB2E2" },
      titleStyle: { color: "white" },
    },
    {
      title: "Done",
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
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default SendBottomSheet;
