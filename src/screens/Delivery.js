import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Icon from 'react-native-feather'

import { featured } from '../constants'
import { themeColors } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { emptyCart } from '../slices/cartSlice';

export default function Delivery({ navigation }) {
    const dispatch = useDispatch()
    const restaurant = useSelector(selectRestaurant)

    const cancelOrder = () => {
        dispatch(emptyCart())
        navigation.navigate('Home')
    }

    return (
        <View className='flex-1'>
            <MapView
                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                className='flex-1'
                mapType='standard'
            >
                <Marker coordinate={{
                    latitude: restaurant.lat,
                    longitude: restaurant.lng
                }} title={restaurant.name} description={restaurant.description} pinColor={themeColors.bgColor(1)} />
            </MapView>
            <View className='rounded-t-3xl -mt-12 bg-white relative'>
                <View className='flex-row justify-between px-5 pt-10'>
                    <View>
                        <Text className='text-lg text-gray-700 font-semibold'>Estimated Arrival</Text>
                        <Text className='text-lg text-gray-700 font-extrabold'>20-30 Minutes Arrival</Text>
                        <Text className='mt-2 text-gray-700 font-semibold'>Your order is own its way!</Text>
                    </View>
                    <Image source={require('../assets/images/bikeGuy2.gif')} className='w-24 h-24' />
                </View>
                <View className='p-2 flex-row justify-between items-center rounded-full my-5 mx-2' style={{ backgroundColor: themeColors.bgColor(0.8) }}>
                    <View className='p-1 rounded-full' style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
                        <Image source={require('../assets/images/deliveryGuy.jpg')} className='w-16 h-16 rounded-full' />
                    </View>
                    <View className='flex-1 ml-3'>
                        <Text className='text-lg font-bold text-white'>Arnan Comia</Text>
                        <Text className=' font-semibold text-white'>Your rider</Text>
                    </View>
                    <View className='flex-row items-center space-x-3 mr-3'>
                        <TouchableOpacity className='bg-white p-2 rounded-full'>
                            <Icon.Phone strokeWidth={1} stroke={themeColors.bgColor(1)} fill={themeColors.bgColor(1)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cancelOrder} className='bg-white p-2 rounded-full'>
                            <Icon.X strokeWidth={5} stroke='red' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}