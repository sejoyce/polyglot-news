// App.js
import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SubscriptionsScreen from './screens/SubscriptionsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import PodcastsScreen from './screens/PodcastsScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { LanguageProvider } from './context/LanguageContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
    <LanguageProvider>
    <SubscriptionProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'newspaper-outline';
            else if (route.name === 'Subscriptions') iconName = 'list-outline';
            //else if (route.name === 'Podcasts') iconName = 'list-outline';
            else if (route.name === 'Settings') iconName = 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Subscriptions" component={SubscriptionsScreen} />
        {/*<Tab.Screen name="Podcasts" component={PodcastsScreen} />*/}
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </SubscriptionProvider>
    </LanguageProvider>
    </PaperProvider>
  );
}