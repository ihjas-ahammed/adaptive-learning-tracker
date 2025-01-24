import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { StatusBar } from 'expo-status-bar';
import { CircularProgress } from 'react-native-circular-progress';

let _data = null;
const getAverageProgress = (lst) => {
  let p = 0;
  for (let i = 0; i < lst.length; i++) {
    p += lst[i].progress / lst.length
  }
  return p
}


let subjects = null;
let current = null;

const Subject = () => {
  const { data } = useLocalSearchParams();

  let realData = JSON.parse(data)
  subjects = realData["sub"];
  current = realData["sub"][realData["id"] - 1];

  console.log(realData["id"])
  const [totalP, setTotalP] = useState(current.modules.length == 0 ? current.progress : getAverageProgress(current.modules))

  const itemView = ({ item }) => (

    <TouchableOpacity activeOpacity={0.7} onPress={() => handlePress(item)} >
      <View className={"h-16 justify-center px-8 mb-4 rounded-md bg-[#fff2]"} >
        <Text className={`font-semibold text-xl text-white`}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <ImageBackground source={require('../assets/splash.png')} resizeMode='stretch' className='absolute h-[110%] w-full inset-0 flex-1' blurRadius={0} />
      <View className="items-center justify-center h-full px-5 py-5 pt-8">
        <Image source={require('../assets/splash.png')} resizeMode='cover' className='absolute h-full w-full rounded-xl inset-0' blurRadius={10} />
        <View className="w-full h-full -mt-5 px-5 justify-center bg-[#0005]">
          <View className="w-full items-center justify-center">
            <View className="pt-7 relative">
              <CircularProgress
                size={120}
                width={3}
                rotation={-120}
                fill={parseInt(totalP)}
                tintColor="#e74c3c"
                arcSweepAngle={240}
                backgroundColor="#ecf0f1"
              />
              <View className="absolute inset-0 flex items-center justify-center h-[120px] w-[120px] top-7">
                <Text className="text-white text-2xl font-semibold pl-1">{parseInt(totalP)}%</Text>
              </View>

            </View>

            <Text className="text-white text-2xl font-semibold pl-1 mb-5 ">{current.name}</Text>

          </View>
          <FlatList
            data={current.modules}
            renderItem={itemView}
            keyExtractor={item => item.id}
            className="m-3 mb-5"
          />

        </View>
      </View>
      <StatusBar style='dark' />
    </SafeAreaView>
  )
}

export default Subject


// Store data
export const storeData = async (key, value) => {
  await SecureStore.setItemAsync(key, value + "");
};





// Retrieve data
export const getData = async (key, novalue) => {
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


