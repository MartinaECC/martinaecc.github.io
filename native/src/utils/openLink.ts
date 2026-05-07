import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function openWebView(
  navigation: Navigation,
  url: string,
  title: string,
) {
  navigation.navigate('WebView', { url, title });
}
