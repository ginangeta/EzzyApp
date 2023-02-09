import React from 'react'
import { ImageBackground, StyleSheet, View, StatusBar } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
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
