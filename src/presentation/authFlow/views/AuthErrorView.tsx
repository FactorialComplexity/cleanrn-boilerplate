import React from 'react'
import {
  Text
} from 'react-native'

export default function AuthErrorView (props: {
  authError?: Error
}) {
  return (
    <Text style={{
      color: '#FF8282',
      textAlign: 'center',
      marginTop: 16,
      paddingHorizontal: 16,
      minHeight: 20
    }}>
      {props.authError ? props.authError.message : ''}
    </Text>
  )
}
