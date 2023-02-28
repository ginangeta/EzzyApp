import { ImageBackground, StyleSheet, View, StatusBar } from 'react-native'
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native"
import { PanResponder } from "react-native"
import { theme } from '../core/theme'

export default function IdleBackground({ children }) {
  const timerId = useRef(false);
  const [timeForinactivityInSecond, setTimeForinactivityInSecond] = useState(3600);
  const { reset } = useNavigation();

  useEffect(() => {
    resetInactivityTimeout();
  }, []);


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
      }
    })
  )

  const resetInactivityTimeout = () => {
    console.log('System Timeout Reset');
    clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      console.log('System Timeout');

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
    <ImageBackground {...panResponder.panHandlers}
      source={require('../src/assets/blue_fluid.jpg')}
      resizeMode="cover"
      style={styles.background}
      imageStyle={{ opacity: 0.4 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.container} behavior="padding">
        {children}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  transparent: {
    backgroundColor: "rgba(225, 229, 235, 0.5)"
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
})