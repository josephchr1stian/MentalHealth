import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { Dialog } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { Button, FAB } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Actions({ isVisible, onClose, updateStreak }) {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [actions, setActions] = useState([]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("allPrompt").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setActions(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Dialog
      overlayStyle={styles.Frame}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <Text style={styles.eventText}>Snap Daily</Text>
      <FlatList
        data={actions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SafeAreaView style={styles.Select}>
            {/* <Text style={styles.context}>{item.prompts.context}</Text> */}
            <Button
              title={item.prompts.prompt}
              buttonStyle={{
                borderColor: '#00000',
                borderBottomColor: '#ffff',
                borderWidth : 1,
                widith : '120%',
                height : 80,
              }}
              type="outline"
              
              titleStyle={{fontWeight: 'bold', fontSize: 20, color: '#00000' }}
              containerStyle={{
                width: '110%',
                marginHorizontal: 100,
                marginVertical: 0,
              }}
            />
          </SafeAreaView>
        )}
      />
    </Dialog>
  );
}

const styles = StyleSheet.create({
  Frame: {
    borderRadius: 20,
    height: "45%",
    width: "90%",
  },
  eventText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  Select: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    backgroundColor: "FFFFFF",
    width: "auto",
    height: 'auto',
  },
  context: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "semibold",
    width: 200,
    marginBottom: 20,
    backgroundColor: "cyan",
  },
  button: {
    backgroundColor: "#3CB2E2",
    borderRadius: 5,
    height: 50,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
