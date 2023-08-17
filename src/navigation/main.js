import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, Restaurant, Cart, OrderPreparing, Delivery } from '../screens'

const Stack = createNativeStackNavigator();


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="Cart" component={Cart} options={{ presentation: 'modal' }} />
        <Stack.Screen name="OrderPreparing" component={OrderPreparing} options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="Delivery" component={Delivery} options={{ presentation: 'fullScreenModal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}