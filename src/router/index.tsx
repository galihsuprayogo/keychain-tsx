import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Home,
  Landing
} from '../pages'
import { RootStackParamList } from '../interfaces'

const Stack = createNativeStackNavigator<RootStackParamList>()

function Router() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Router
