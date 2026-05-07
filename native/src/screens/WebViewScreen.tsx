import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Pressable,
  BackHandler,
  Linking,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { WebView, type WebViewNavigation } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

const EXTERNAL_SCHEMES = [
  'alipays:',
  'alipayqr:',
  'intent:',
  'tel:',
  'mailto:',
  'sms:',
];

const BUSINESS_HOSTS = new Set([
  'm.udataai.com',
  'qixun.udataai.com',
  'm.gzzdcredit.com',
  'a8-im.7x24cc.com',
  'm.shuzhigui.com',
]);

export default function WebViewScreen({ route, navigation }: Props) {
  const { url } = route.params;
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const isExternalPage = useRef(false);

  function handleNavStateChange(navState: WebViewNavigation) {
    setLoading(navState.loading);
    setCanGoBack(navState.canGoBack);
    setCurrentUrl(navState.url);
  }

  function tryOpenExternalApp(requestUrl: string) {
    Linking.canOpenURL(requestUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(requestUrl);
        } else {
          Alert.alert('无法打开', '当前设备不支持打开此链接');
        }
      })
      .catch(() => {
        Alert.alert('打开失败', '无法处理该链接');
      });
  }

  function handleShouldStartLoadWithRequest(request: { url: string; navigationType: string }) {
    const { url: requestUrl } = request;
    const lowerUrl = requestUrl.toLowerCase();

    for (const scheme of EXTERNAL_SCHEMES) {
      if (lowerUrl.startsWith(scheme)) {
        tryOpenExternalApp(requestUrl);
        return false;
      }
    }

    if (!lowerUrl.startsWith('http://') && !lowerUrl.startsWith('https://')) {
      tryOpenExternalApp(requestUrl);
      return false;
    }

    let host: string | null = null;
    try {
      const parsed = new URL(requestUrl);
      host = parsed.hostname;
    } catch {
      return true;
    }

    if (host && !BUSINESS_HOSTS.has(host)) {
      isExternalPage.current = true;
    }

    return true;
  }

  const handleBack = useCallback(() => {
    if (canGoBack) {
      webViewRef.current?.goBack();
      return true;
    }

    if (isExternalPage.current) {
      (webViewRef.current as any)?.loadUrl({ uri: url });
      isExternalPage.current = false;
      return true;
    }

    navigation.goBack();
    return true;
  }, [canGoBack, navigation, url]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', handleBack);
      return () => subscription.remove();
    }, [handleBack]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable style={styles.headerBackBtn} onPress={handleBack}>
          <Text style={styles.headerBackText}>{'<\u00A0\u8FD4\u56DE'}</Text>
        </Pressable>
      ),
      title: route.params.title,
      headerBackVisible: false,
    });
  }, [handleBack, navigation, route.params.title]);

  function handleReload() {
    setError(false);
    webViewRef.current?.reload();
  }

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>加载失败</Text>
          <Pressable style={styles.retryBtn} onPress={handleReload}>
            <Text style={styles.retryText}>重试</Text>
          </Pressable>
        </View>
      ) : null}
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color="#2563eb"
        />
      ) : null}
      {canGoBack ? (
        <Pressable style={styles.floatingBackBtn} onPress={() => webViewRef.current?.goBack()}>
          <Text style={styles.floatingBackText}>网页内返回</Text>
        </Pressable>
      ) : null}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onNavigationStateChange={handleNavStateChange}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        onError={() => setError(true)}
        startInLoadingState={false}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
    zIndex: 1,
  },
  headerBackBtn: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  headerBackText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '600',
  },
  centered: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: '#f5f5f5',
  },
  errorText: { fontSize: 16, color: '#ef4444', marginBottom: 12 },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontSize: 14 },
  floatingBackBtn: {
    position: 'absolute',
    right: 16,
    bottom: 20,
    zIndex: 2,
    backgroundColor: '#cc111827',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  floatingBackText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
