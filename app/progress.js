import { View, Text, Image, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AnimatedCircularProgress, CircularProgress } from 'react-native-circular-progress';
import { BlurView } from 'expo-blur';

const progress = () => {

  return (
    <SafeAreaView className="bg-white h-full ">
      <StatusBar style='dark' />
    </SafeAreaView>
  )
}

export default progress 