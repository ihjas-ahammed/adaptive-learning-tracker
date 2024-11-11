import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { StatusBar } from 'expo-status-bar';
let _data = null;



let subjects = null;

const Subject = () => {
  const { name, sub } = useLocalSearchParams();

  subjects = sub;

  
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar style='dark' />
    </SafeAreaView>
  )
}

export default Subject


// Store data
const storeData = async (key, value) => {
  await SecureStore.setItemAsync(key, value + "");
};





// Retrieve data
const getData = async (key, novalue) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    if (!isNaN(parseFloat(result))) {
      // result is a number
      return parseFloat(result);
    } else if (result === 'true' || result === 'false') {
      // result is a boolean
      return result === 'true';
    } else {
      // result is a string
      return result;
    }
  } else {
    return novalue;
  }
};


