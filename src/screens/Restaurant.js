import React, { useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import * as Icon from "react-native-feather";
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';

import { themeColors } from '../../theme';
import { CartIcon, DishesRow } from '../components';
import { setRestaurant } from '../slices/restaurantSlice'
import { urlFor } from '../../sanity';

const Restaurant = ({ navigation }) => {
  const { params } = useRoute()
  const dispatch = useDispatch()
  let item = params

  useEffect(() => {
    if (item && item._id) {
      dispatch(setRestaurant({ ...item }))
    }
  }, [])

  return (
    <View>
      <CartIcon />
      <StatusBar style='light' />
      <ScrollView>
        <View className='relative'>
          <Image source={{ uri: urlFor(item.image).url() }} className='w-full h-72' />
          <TouchableOpacity onPress={() => navigation.goBack()} className='absolute top-14 left-4 bg-gray-50 rounded-full shadow'>
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className='bg-white -mt-12 pt-6'
        >
          <View className='px-5'>
            <Text className='text-xl font-bold'>{item.name}</Text>
            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <Image source={require('../assets/images/fullStar.png')} className='h-4 w-4' />
                <Text className='text-xs'>
                  <Text className='text-green-700'>{item.stars}</Text>
                  <Text className='text-gray-700'>({item.reviews}) · <Text className='font-semibold'>{item?.type?.name}</Text></Text>
                </Text>
              </View>
              <View className='flex-row items-center space-x-1'>
                <Icon.MapPin color='gray' width={15} height={15} />
                <Text className='text-gray-700 text-xs'>Nearby · {item.address}</Text>
              </View>
            </View>
            <Text className='text-gray-500'>{item.description}</Text>
          </View>
        </View>
        <View className='pb-36 bg-white'>
          <Text className='px-4 text-2xl font-bold'>Menu</Text>
          {/* Dishes */}
          {
            item.dishes.map((dish, index) => <DishesRow key={index} item={{ ...dish }} />)
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Restaurant