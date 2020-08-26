import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import "react-native-gesture-handler";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";

// ログイン、新規登録、ローディング画面
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoadingScreen from "./screens/LoadingScreen";

// 基本画面
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import NotificationScreen from "./screens/NotificationScreen";

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBePEbaPdSELRDooVS545Fbd70Qd_5-j8M",
  authDomain: "socialapp-fbeb2.firebaseapp.com",
  databaseURL: "https://socialapp-fbeb2.firebaseio.com",
  projectId: "socialapp-fbeb2",
  storageBucket: "socialapp-fbeb2.appspot.com",
  messagingSenderId: "914579538243",
  appId: "1:914579538243:web:b433514e34c9fba560eff6",
  measurementId: "G-N0L2T1Y8TZ",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// タブ遷移機能

const Tab = createBottomTabNavigator();

function AppTabNavigator() {
  return (
    <NavigationContainer>
      {/* 初期画面 */}
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e63"
        style={{ backgroundColor: "tomato" }}
      >
        {/* ホーム画面 */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        {/* チャット画面 */}
        <Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat" size={size} color={color} />
            ),
          }}
        />

        {/* 投稿画面 */}
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarLabel: "Post",
            tabBarIcon: ({ tintColor }) => (
              <MaterialCommunityIcons
                name="map-marker-plus"
                size={36}
                color="#E9446A"
                style={{
                  shadowColor: "#E9446A",
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 10,
                  shadowOpacity: 0.3,
                }}
              />
            ),
          }}
        />

        {/* 通知画面 */}
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: "通知",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />

        {/* プロフィール画面 */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ログインと新規登録遷移

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: "Login",
  }
);

// 画面遷移

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
