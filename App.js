import "react-native-gesture-handler";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { BackHandler, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import Login from "./views/auth/Login";
import Main from "./views/Main";

const Stack = createStackNavigator();

// SplashScreen.preventAutoHideAsync();

const App = () => {

  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`

  useEffect(() => {
    prepare();

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

    return () => backHandler.remove();
  }, []);


  const resetToLogin = () => {
    navigationRef.navigate('Login')
  }

  async function prepare() {
    try {
      await new Promise((resolve, reject) => {
        resolve(getToken());
      });
    } catch (e) {
      console.warn(e);
    } finally {
      // console.log("Done Promise");
      // SplashScreen.hideAsync();
    }
  }

  const getToken = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ApiKey: "QWRTY0987Dezy",
        SecretKey: "EZYCASH"
      })
    }

    fetch("https://asili.devopsfoundry.cloud:7074/" + "Token", requestOptions)
      .then(response => response.json())
      .then(response => {
        global.token = response[0].token;
        global.apiKey = "QWRTY0987Dezy";
        console.log(response, "\n", token, "\n", apiKey, "\n");
        // getData();
      })
      .catch(err => {
        // console.log(err);

      });
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;