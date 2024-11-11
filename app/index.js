
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress, CircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import progress from './progress';


export default function App() {

  let sujs = [
    { id: 1, name: 'Physics', progress:30 },
    { id: 2, name: 'Maths', progress:4 },
    { id: 3, name: 'Chemistry', progress:5 },
    {id: 4, name: 'Biology', progress: 7}

  ]
  const [subjects, setSubjects] = useState(sujs)

  
  const [totalP, setTotalP] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let s = subjects == null ? subjects : sujs
      let k = 0
      for(let i = 0; i < s.length; i ++){
        k += s[i].progress/s.length
      }
      setTotalP(k);

    };

    const interval = setInterval(fetchData, 100);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handlePress = (item) => {
    router.push({ pathname: "sub", params: item,sub: subjects })
  }

  const itemView = ({ item }) => (

    <TouchableOpacity activeOpacity={0.7} onPress={() => handlePress(item)} >
      <View className={"h-16 justify-center px-8 mb-4 rounded-md bg-[#fff2]"} >
        <Text className={`font-semibold text-xl text-white`}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{flex:1}}>
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

            <Text className="text-white text-2xl font-semibold pl-1 mb-5 ">Daily Progress</Text>

          </View>

          <FlatList
            data={subjects}
            renderItem={itemView}
            keyExtractor={item => item.id}
            className="m-3 mb-auto "
          />

        </View>
      </View>
      <StatusBar style='dark' />
    </SafeAreaView>
  );
}