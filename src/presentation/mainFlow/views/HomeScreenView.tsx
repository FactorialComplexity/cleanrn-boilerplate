import React from 'react'
import { StyleSheet } from 'react-native'
import { Content, Text } from 'native-base'

class HomeScreenView extends React.Component {
  render () {
    return (
      <Content alwaysBounceVertical={false} contentContainerStyle={styles.content}>
        <Text>Hello from Clean React Native!</Text>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreenView
