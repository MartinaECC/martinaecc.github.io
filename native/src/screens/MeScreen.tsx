import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { openWebView } from '../utils/openLink';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function MeScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileMain}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>小</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>小优</Text>
            <Text style={styles.profileRole}>普通用户</Text>
          </View>
        </View>
        <View style={styles.profileActions}>
          <Pressable
            style={styles.circleBtn}
            onPress={() => openWebView(navigation, 'https://a8-im.7x24cc.com/phone_webChat.html?accountId=N000000050790&chatId=292fda02-6f42-465d-a2b9-4d8c0dec68ef', '客服')}
          >
            <Text style={styles.circleBtnText}>客服</Text>
          </Pressable>
          <Pressable style={styles.circleBtn}>
            <Text style={styles.circleBtnText}>设置</Text>
          </Pressable>
        </View>
      </View>

      {/* Member Info Card */}
      <Pressable style={styles.memberCard}>
        <View>
          <Text style={styles.memberTitle}>会员信息</Text>
          <Text style={styles.memberSub}>开通会员享特权</Text>
        </View>
        <Text style={styles.memberArrow}>{'\u203A'}</Text>
      </Pressable>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Banner 广告位</Text>
      </View>

      {/* My Orders */}
      <View style={styles.panelCard}>
        <Text style={styles.panelTitle}>我的订单</Text>
        <View style={styles.orderGrid}>
          {[
            { icon: '\u{1F4CB}', label: '报告' },
            { icon: '\u{1F381}', label: '订单' },
            { icon: '\u{1F6E1}', label: '退款售后' },
            { icon: '\u{2699}', label: '订阅管理' },
          ].map((item) => (
            <Pressable key={item.label} style={styles.orderItem}>
              <Text style={styles.orderIcon}>{item.icon}</Text>
              <Text style={styles.orderLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Partner Card */}
      <View style={styles.partnerCard}>
        <View style={styles.partnerItem}>
          <View>
            <Text style={styles.partnerLabel}>合伙人</Text>
            <Text style={styles.partnerSub}>邀请有礼</Text>
          </View>
        </View>
        <View style={styles.partnerItem}>
          <View>
            <Text style={styles.partnerLabel}>优鉴豆</Text>
            <Text style={styles.partnerSub}>0</Text>
          </View>
        </View>
        <Pressable
          style={styles.cashBtn}
          onPress={() => openWebView(navigation, 'https://m.shuzhigui.com/login?udchl=UY1BS41D&ut=1', '赚现金')}
        >
          <Text style={styles.cashBtnText}>赚现金</Text>
        </Pressable>
      </View>

      {/* Service List */}
      <View style={styles.panelCard}>
        <Pressable style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>{'\u{1F399}'}</Text>
          <Text style={styles.serviceText}>客服中心（找小优助手）</Text>
          <Text style={styles.serviceArrow}>{'\u203A'}</Text>
        </Pressable>
        <View style={styles.serviceDivider} />
        <Pressable style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>{'\u{1F4AC}'}</Text>
          <Text style={styles.serviceText}>企微助手（加企微领福利）</Text>
          <Text style={styles.serviceArrow}>{'\u203A'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f8f9fb' },
  content: { paddingBottom: 30 },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  profileMain: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  profileInfo: {},
  profileName: { fontSize: 17, fontWeight: '600', color: '#1f2937' },
  profileRole: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  profileActions: { flexDirection: 'row', gap: 10 },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBtnText: { fontSize: 11, color: '#374151' },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 14,
    marginTop: 14,
    backgroundColor: '#1e3a5f',
    borderRadius: 12,
    padding: 16,
  },
  memberTitle: { color: '#fff', fontSize: 15, fontWeight: '600' },
  memberSub: { color: '#93c5fd', fontSize: 12, marginTop: 4 },
  memberArrow: { color: '#fff', fontSize: 24 },
  banner: {
    marginHorizontal: 14,
    marginTop: 12,
    height: 70,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: { color: '#9ca3af', fontSize: 14 },
  panelCard: {
    marginHorizontal: 14,
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
  },
  panelTitle: { fontSize: 15, fontWeight: '600', color: '#1f2937', marginBottom: 12 },
  orderGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  orderItem: { alignItems: 'center' },
  orderIcon: { fontSize: 26, marginBottom: 6 },
  orderLabel: { fontSize: 12, color: '#4b5563' },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 14,
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  partnerItem: {},
  partnerLabel: { fontSize: 13, fontWeight: '600', color: '#1f2937' },
  partnerSub: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  cashBtn: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cashBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  serviceIcon: { fontSize: 20, marginRight: 10 },
  serviceText: { flex: 1, fontSize: 14, color: '#374151' },
  serviceArrow: { fontSize: 20, color: '#d1d5db' },
  serviceDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 4,
  },
});
