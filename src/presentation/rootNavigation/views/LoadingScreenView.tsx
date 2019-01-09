import React from 'react'
import { View, Image, StyleSheet, Platform, SafeAreaView, StatusBar } from 'react-native'

export default function LoadingScreenView () {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='#1B1B1B'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 200
  }
})
