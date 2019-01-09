import React from 'react'
import { StyleSheet } from 'react-native'
import { Content, List, ListItem, Left, Text, Right, Button } from 'native-base'

interface Props {
  isLoggedIn: boolean
  email: string | undefined

  logout: () => void
}

interface State {}

class AccountScreenView extends React.Component<Props, State> {
  render () {
    const { email, logout } = this.props
    return (
      <Content alwaysBounceVertical={false}>
        <List>
          <ListItem>
            <Left>
              <Text>Email</Text>
            </Left>

            <Right>
              <Text note>{email}</Text>
            </Right>
          </ListItem>

          <Button full danger onPress={logout}>
            <Text>Logout</Text>
          </Button>
        </List>
      </Content>
    )
  }
}

const styles = StyleSheet.create({})

export default AccountScreenView
