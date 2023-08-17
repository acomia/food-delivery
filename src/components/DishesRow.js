import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import * as Icon from "react-native-feather";
import { themeColors } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart, selectCartItemById } from '../slices/cartSlice';
import { urlFor } from '../../sanity';

export default function DishesRow({ item }) {
    const dispatch = useDispatch()
    const totalItems = useSelector(state => selectCartItemById(state, item._id))

    const handleIncrease = () => {
        dispatch(addToCart({ ...item }))
    }
    const handleDecrease = () => {
        dispatch(removeToCart({ id: item._id }))
    }

    return (
        <View className='flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2'>
            <Image className='rounded-3xl' style={{ height: 100, width: 100 }} source={{ uri: urlFor(item.image).url() }} resizeMode='contain' />
            <View className='flex flex-1 space-y-3'>
                <View className='pl-3'>
                    <Text className='text-xl'>{item.name}</Text>
                    <Text className='text-gray-500'>{item.description}</Text>
                </View>
                <View className='flex-row justify-between items-center pl-3'>
                    <Text className='text-gray-700 text-lg font-bold'>₱{item.price}</Text>
                    <View className='flex-row items-center gap-2'>
                        <TouchableOpacity onPress={handleDecrease} disabled={!totalItems.length} className='p-1 rounded-full' style={{ backgroundColor: themeColors.bgColor(1) }}>
                            <Icon.Minus stroke='white' strokeWidth={2} height={20} width={20} />
                        </TouchableOpacity>
                        <Text>{totalItems.length}</Text>
                        <TouchableOpacity onPress={handleIncrease} className='p-1 rounded-full' style={{ backgroundColor: themeColors.bgColor(1) }}>
                            <Icon.Plus stroke='white' strokeWidth={2} height={20} width={20} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )
}