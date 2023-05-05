import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Toast from 'react-native-toast-message';
import Login from "./views/auth/Login";
import Main from "./views/Main";

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    prepare();
  }, []);

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