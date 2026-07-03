import 'react-native-gesture-handler';
import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './HomeScreenNovo';
import EarningsScreen from './EarningsScreen';

const Stack = createNativeStackNavigator();

function isDayTime() {
  const h = new Date().getHours();
  return h >= 6 && h < 18;
}

export default function App() {
  const themeMode = useMemo(() => (isDayTime() ? 'light' : 'dark'), []);

  return (
    <NavigationContainer>
      <StatusBar style={themeMode === 'light' ? 'dark' : 'light'} />

      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{ themeMode }} />
        <Stack.Screen name="Order" component={HomeScreen} initialParams={{ themeMode }} />
        <Stack.Screen name="Earnings" component={EarningsScreen} initialParams={{ themeMode }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
