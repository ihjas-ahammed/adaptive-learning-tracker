import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' options={{title:"Adaptive Learning"}} />
        <Stack.Screen name='sub' o/>
        <Stack.Screen name='progress' />
    </Stack>
  )
}

export default RootLayout