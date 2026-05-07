import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import WebViewScreen from '../screens/WebViewScreen';
import AssessmentsScreen from '../screens/AssessmentsScreen';
import AssessmentTestScreen from '../screens/AssessmentTestScreen';
import DailyFortuneScreen from '../screens/DailyFortuneScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  WebView: { url: string; title: string };
  Assessments: undefined;
  AssessmentTest: { testId: string };
  DailyFortune: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitle: '返回',
        })}
      />
      <Stack.Screen
        name="Assessments"
        component={AssessmentsScreen}
        options={{ title: '测试宇宙', headerBackTitle: '返回' }}
      />
      <Stack.Screen
        name="AssessmentTest"
        component={AssessmentTestScreen}
        options={{ title: '测试', headerBackTitle: '返回' }}
      />
      <Stack.Screen
        name="DailyFortune"
        component={DailyFortuneScreen}
        options={{ title: '每日运势', headerBackTitle: '返回' }}
      />
    </Stack.Navigator>
  );
}
