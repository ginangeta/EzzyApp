import "react-native-gesture-handler";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect, useRef } from "react";
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableWithoutFeedback, InteractionManager, AppState, BackHandler, Alert } from "react-native"
import Home from "./Home";
import About from "./About";
import Dial from "./Dail";
import AccountDial from "./AccountDail";
import LoanDial from "./LoanDial";
import Loan from "./Loan";
import LoanDetails from "./LoanDetails";
import Profile from "./Profile";
import LoanApplication from "./LoanApplication";
import LoanGuarantors from "./LoanGuarantors";
import Password from "./auth/Password";
import OTP from "./auth/OTP";
import Statements from "./Statements";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {

  const timerId = useRef(false);
  const [timeForinactivityInSecond, setTimeForinactivityInSecond] = useState(3600);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const { reset } = useNavigation();

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      console.log('App state changed:', nextAppState);
      if (nextAppState === 'active') {
        setLastActiveTime(Date.now());
      } else {
        setTimeout(() => {
          console.log('counting');
          if (Date.now() - lastActiveTime > 5000) {
            console.log('User has exited the app...');
            resetToLogin();
          }
        }, 1000);
      }
    });

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES', onPress: () => {
            resetToLogin();
            BackHandler.exitApp()
          }
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      appStateListener.remove();
    };

  }, []);

  useEffect(() => {
    const interactionHandler = InteractionManager.createInteractionHandle();

    const timeout = setTimeout(() => {
      console.log('Timeout function called!');
      InteractionManager.clearInteractionHandle(interactionHandler);

      if (AppState.currentState !== 'active' && Date.now() - lastActiveTime > 5000) {
        console.log('User has been idle for too long. Logging out...');
        // Add code here to log out the user or perform any other actions.

        Toast.show({
          type: 'error',
          text1: 'Logged Out',
          text2: 'User has been idle for too long. Logging out... 🛑',
          position: 'top'
        });

        resetToLogin();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [lastActiveTime]);

  const resetToLogin = () => {

    reset({ index: 0, routes: [{ name: "Login" }] });
  }

  const resetInactivityTimeout = () => {
    // console.log('System Timeout Reset');
    clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      // console.log('System Timeout');


      // Toast.show({
      //   type: 'error',
      //   text1: 'Logged Out',
      //   text2: 'The application was idle for too long 🛑',
      //   position: 'top'
      // });

      // reset({ index: 0, routes: [{ name: "Login" }] });

    }, timeForinactivityInSecond * 10);
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({ route }) => ({
          headerStyle: { visible: false },
          tabBarActiveTintColor: '#348bd3',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeStack') {
              iconName = focused
                ? 'home-circle'
                : 'home-circle-outline';
            } else if (route.name === 'StatementStack') {
              iconName = focused
                ? 'clipboard-text-clock'
                : 'clipboard-text-clock-outline';
            } else if (route.name === 'SettingsStack') {
              iconName = focused
                ? 'account-settings'
                : 'account-settings-outline';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        })}>
        <Tab.Screen
          name="HomeStack" component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            title: 'Home',
          }} />
        <Tab.Screen
          name="StatementStack" component={StatementStack}
          options={{
            headerShown: false,
            tabBarLabel: 'History',
            title: 'History'
          }} />
        <Tab.Screen
          name="SettingsStack" component={SettingsStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            title: 'Profile'
          }} />
      </Tab.Navigator>
      <Toast />
    </>
  );
}

const StatementStack = () => {
  return (
    <TouchableWithoutFeedback>
      <Stack.Navigator
        initialRouteName="Statements"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Statements" component={Statements} options={{ headerShown: false }} />
        <Stack.Screen name="StatementDetails" component={Statements} options={{ headerShown: false }} />
      </Stack.Navigator>
    </TouchableWithoutFeedback>
  );
}

const SettingsStack = () => {
  return (
    <TouchableWithoutFeedback>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Stack.Navigator>
    </TouchableWithoutFeedback>
  );
}

const HomeStack = () => {
  return (
    <TouchableWithoutFeedback>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
        <Stack.Screen name="Dial" component={Dial} options={{ headerShown: false }} />
        <Stack.Screen name="AccountDial" component={AccountDial} options={{ headerShown: false }} />
        <Stack.Screen name="LoanDial" component={LoanDial} options={{ headerShown: false }} />
        <Stack.Screen name="Loan" component={Loan} options={{ headerShown: false }} />
        <Stack.Screen name="LoanDetails" component={LoanDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Password" component={Password} options={{ headerShown: false }} />
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
        <Stack.Screen name="LoanGuarantors" component={LoanGuarantors} options={{ headerShown: false }} />
        <Stack.Screen name="LoanApplication" component={LoanApplication} options={{ headerShown: false }} />
      </Stack.Navigator>
    </TouchableWithoutFeedback>
  );
}

export default Main;