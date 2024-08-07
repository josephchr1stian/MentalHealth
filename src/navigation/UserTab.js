import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Pressable, Text, Button } from "react-native";
import { supabase } from '../utils/hooks/supabase'; // Import the Supabase client
// Screens
import EventScreen from "../screens/EventScreen"; //New component by Sona and Christian
import MapScreen from "../screens/MapScreen";
import CameraScreen from "../screens/CameraScreen";
import StoriesScreen from "../screens/StoriesScreen";
import SpotlightScreen from "../screens/SpotlightScreen";
import ChatScreen from "../screens/ChatScreen";

// Stacks
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  CameraOutline,
  LensSearchFill,
  ChatOutline,
  ChatFill,
  GroupOutline,
  GroupFill,
  MapPinOutline,
  MapPinFill,
  PlayOutline,
  PlayFill,
} from "../../assets/snapchat/NavigationIcons";
import { colors } from "../../assets/themes/colors";
import Ionicons from "react-native-vector-icons/Ionicons";


const Tab = createBottomTabNavigator();

export default function UserStack({ route, navigation }) {
  // Sign-out logic using Supabase
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

  const screenOptions = {
    
    tabBarShowLabel: false,
    headerLeft: () => (
      <Button onPress={handleSignOut} title="Log Out" />
    ),
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "black" }}
      initialRouteName="Camera"
    >
      {/* <Tab.Screen
        name="Event"
        component={EventScreen}
      /> */}
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ ...screenOptions, headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ ...screenOptions, headerShown: false }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{ ...screenOptions, headerShown: false }}
      />
      <Tab.Screen
        name="Stories"
        component={StoriesScreen}
        options={{ ...screenOptions, headerShown: false }}
      />
      <Tab.Screen
        name="Spotlight"
        component={SpotlightScreen}
        options={screenOptions}
      />
      
      
    </Tab.Navigator>
  );
}

const getTabIcon = (routeName, focused) => {
  switch (routeName) {
    case "Map":
      return focused ? <MapPinFill /> : <MapPinOutline />;
    case "Chat":
      return focused ? <ChatFill /> : <ChatOutline />;
    case "Camera":
      return focused ? <LensSearchFill /> : <CameraOutline />;
    case "Stories":
      return focused ? <GroupFill /> : <GroupOutline />;
    case "Spotlight":
      return focused ? <PlayFill /> : <PlayOutline />;
    case "Event":
      return focused ? <PlayFill /> : <PlayOutline />;
    default:
      return null;
  }
};

const CustomTabBar = (props) => {
  const { state, descriptors, navigation } = props;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.grayRectangle}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;

          const isActive = state.index === index;
          const tabStyle = isActive ? styles.activeTab : styles.inactiveTab;

          return (
            <Pressable
              key={route.key}
              style={[styles.tab, tabStyle]}
              onPress={() => navigation.navigate(route.name)}
            >
              {getTabIcon(route.name, isActive)}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    bottom: 0,
  },
  grayRectangle: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.belowPage,
    borderRadius: 100,
    height: 48,
  },
  tab: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    // Add styles for active tab if needed
  },
  inactiveTab: {
    // Add styles for inactive tab if needed
  },
});
