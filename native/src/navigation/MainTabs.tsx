import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import MeScreen from '../screens/MeScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, string> = {
  Home: '\u{25A0}',
  Reports: '\u{25B6}',
  Benefits: '\u{2605}',
  Me: '\u{25CF}',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          const icon = TAB_ICONS[route.name] || '\u{25CF}';
          return (
            <View style={[t.iconWrap, focused && t.iconWrapActive]}>
              <Text style={[t.icon, { color }]}>{icon}</Text>
            </View>
          );
        },
        tabBarActiveTintColor: '#4f7d6d',
        tabBarInactiveTintColor: '#a09587',
        tabBarStyle: {
          backgroundColor: '#fffefb',
          borderTopColor: '#efe4d3',
          borderTopWidth: 1,
          height: 56,
          paddingBottom: 6,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginTop: 2 },
        headerStyle: { backgroundColor: '#fffaf1' },
        headerTitleStyle: { fontWeight: '700', fontSize: 17, color: '#2f2b26' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: '首页', headerTitle: '优鉴信用' }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{ tabBarLabel: '报告', headerTitle: '报告' }}
      />
      <Tab.Screen
        name="Benefits"
        component={BenefitsScreen}
        options={{ tabBarLabel: '福利', headerTitle: '优鉴会员' }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{ tabBarLabel: '我的', headerTitle: '我的' }}
      />
    </Tab.Navigator>
  );
}

const t = StyleSheet.create({
  iconWrap: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  iconWrapActive: {},
  icon: { fontSize: 18 },
});
