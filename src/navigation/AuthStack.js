import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen"
import ProfileScreen from "../screens/ProfileScreen"
import AddFriendScreen from "../screens/AddFriendScreen"
import SendSnapScreen from "../screens/SendSnapScreen";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();


const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthHome" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AddFriend" component={AddFriendScreen} options={{ headerShown: false}}/>
        {/* <Stack.Screen name="SendSnap" component={SendSnapScreen} options={{ headerShown: false}}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
