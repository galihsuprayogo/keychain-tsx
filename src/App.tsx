import React from 'react'
import {
  NativeBaseProvider,
} from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'

function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
export default App
