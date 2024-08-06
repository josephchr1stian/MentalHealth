import React from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem } from "@rneui/themed";
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
    <Modal
      transparent={true}
      animationType="slide"
      visible={showMenu}
      onRequestClose={() => setShowMenu(false)}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={() => setShowMenu(false)}
      >
        <View style={styles.bottomSheet}>
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content style={styles.listItemContent}>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                <TouchableOpacity onPress={() => console.log("AHHHHHHHH")}>
                  <Ionicons
                    style={styles.sendIcon}
                    name="send"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#3CB2E2",
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
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
