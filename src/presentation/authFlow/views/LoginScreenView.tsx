import React from 'react'
import { StyleSheet, Keyboard, SafeAreaView } from 'react-native'
import { Container, Button, Text, Content, Form, Item, Input, Spinner, Toast } from 'native-base'

// Types imports
import { LoginWithEmailPayload } from '_app/domain/auth'

interface Props {
  isAuthenticating: boolean
  error: Error | undefined

  loginWithEmail: (payload: LoginWithEmailPayload) => void
  dismissError: () => void
}

interface State {
  email: string
  password: string
}

class LoginScreenView extends React.Component<Props, State> {
  constructor (props: any) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    this._authErrorDismiss()
  }

  componentDidUpdate (prevProps: Props) {
    const { error } = this.props
    if (error) {
      Toast.show({
        text: error.message,
        buttonText: 'Dimiss',
        type: 'danger'
      })
    }
    this._authErrorDismiss()
  }

  _authErrorDismiss () {
    const { error, dismissError } = this.props
    if (error) {
      dismissError()
    }
  }

  _login = () => {
    const { email, password } = this.state
    const { loginWithEmail } = this.props

    this._authErrorDismiss()
    Keyboard.dismiss()
    loginWithEmail({ email, password })
  }

  _onEmailChange = (email: string) => {
    this.setState({ email })
  }

  _onPasswordChange = (password: string) => {
    this.setState({ password })
  }

  render () {
    const { isAuthenticating } = this.props
    const { email, password } = this.state

    return (
      <Container>
        <Content alwaysBounceVertical={false}>
          <SafeAreaView>
            <Form>
              <Item>
                <Input
                  placeholder='Email'
                  autoCorrect={false}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  value={email}
                  onChangeText={this._onEmailChange}
                />
              </Item>
              <Item last>
                <Input
                  placeholder='Password'
                  secureTextEntry={true}
                  value={password}
                  onChangeText={this._onPasswordChange}
                />
              </Item>

              <Button full onPress={this._login} disabled={isAuthenticating}>
                {isAuthenticating && <Spinner color='#fff' />}
                <Text>Login</Text>
              </Button>
            </Form>
          </SafeAreaView>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({})

export default LoginScreenView
