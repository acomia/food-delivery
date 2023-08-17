import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";

import { themeColors } from '../../theme';
import { Categories, FeaturedRow } from '../components';
import { featured } from '../constants';
import { getFeaturedRestaurants } from '../../api';

const HomeScreen = () => {

  const [featuredRestaurants, setFeaturedRestaurants] = useState([])

  useEffect(() => {
    getFeaturedRestaurants().then(data => {
      setFeaturedRestaurants(data);
    })
  }, [])

  return (
    <SafeAreaView className='bg-white'>
      <StatusBar barStyle='dark-content' />
      {/* Search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className='flex-row flex-1 items-center p-3 rounded-full border border-gray-300'>
          <Icon.Search height={25} width={25} stroke='gray' />
          <TextInput placeholder='Restaurants' className='ml-2 flex-1' />
          <View className='flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300'>
            <Icon.MapPin height={20} width={20} stroke='gray' />
            <Text className="text-gray-400">General Trias, Cavite</Text>
          </View>
        </View>
        <View style={{ backgroundColor: themeColors.bgColor(1) }} className='p-3 rounded-full'>
          <Icon.Sliders height={20} width={20} strokeWidth={2.5} stroke='white' />
        </View>
      </View>

      {/* Main */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Categories */}
        <Categories />

        {/* Feature */}
        <View className='mt-5'>
          {
            featuredRestaurants.map((feature, index) => {
              return (
                <FeaturedRow
                  key={index}
                  title={feature.name}
                  restaurants={feature?.restaurants}
                  description={feature?.description} />
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen