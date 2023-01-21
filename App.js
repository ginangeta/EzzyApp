import "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from "react";
import Toast from 'react-native-toast-message';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./views/Main";
import Login from "./views/auth/Login";


const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ApiKey: "QWRTY0987Dezy",
        SecretKey: "EZYCASH"
      })
    }

    fetch("https://testasili.devopsfoundry.cloud:8050/Token", requestOptions)
      .then(response => response.json())
      .then(response => {
        global.token = response[0].token;
        global.apiKey = 'QWRTY0987Dezy';
        console.log(response, "\n", token, "\n", apiKey, "\n");
        // getData();
      })
      .catch(err => {
        console.log(err);

      });


    // const getData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('user_phone')
    //     if (value !== null) {
    //       global.user_phone = value;
    //       console.log(value);
    //     } else {
    //       console.log('Here');
    //       return 0;
    //     }
    //   } catch (e) {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Error obtaining phone number',
    //       text2: e,
    //       position: 'bottom'
    //     });
    //   }
    // }


  }, [])

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