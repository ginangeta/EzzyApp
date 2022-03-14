import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./views/Home";
import About from "./views/About";
import Dial from "./views/Dail";
import Loan from "./views/Loan";
import LoanApplication from "./views/LoanApplication";
import LoanGuarantors from "./views/LoanGuarantors";
import Login from "./views/auth/Login";
import Password from "./views/auth/Password";
import CoffeeList from "./views/CoffeeList";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ApiKey: "abcdef12345",
        SecretKey: "abcdef12345"
      })
    }

    fetch("http://54.225.69.7:8050/Token", requestOptions)
      .then(response => response.json())
      .then(response => {
        global.token = response;
        global.apiKey = 'abcdef12345';
        console.log(response, token, apiKey);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
        <Stack.Screen name="Dial" component={Dial} options={{ headerShown: false }} />
        <Stack.Screen name="Loan" component={Loan} options={{ headerShown: false }} />
        <Stack.Screen name="Password" component={Password} options={{ headerShown: false }} />
        <Stack.Screen name="CoffeeList" component={CoffeeList} options={{ headerShown: false }} />
        <Stack.Screen name="LoanGuarantors" component={LoanGuarantors} options={{ headerShown: false }} />
        <Stack.Screen name="LoanApplication" component={LoanApplication} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;