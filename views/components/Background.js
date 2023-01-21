import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../src/assets/blue_bg.jpg')}
      resizeMode="cover"
      style={styles.background}
      imageStyle={{ opacity: 0.4 }}>
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
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
