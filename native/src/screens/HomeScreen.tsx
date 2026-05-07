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

interface QuickEntry {
  label: string;
  icon: string;
  url: string;
  badge: string | null;
}

const homeQuickEntries: QuickEntry[] = [
  { label: '查风险', icon: '\u{1F6E1}', url: 'https://m.udataai.com/?udchl=UO8NQWCD&ut=8', badge: 'AI优化' },
  { label: '查企业', icon: '\u{1F3E2}', url: 'https://qixun.udataai.com/?udchl=Ul2c4JGD&ut=4', badge: null },
  { label: '查财税', icon: '\u{1F4CA}', url: 'https://m.gzzdcredit.com/?udchl=UZtgfvCD&ut=3', badge: null },
  { label: '查保姆', icon: '\u{1F46E}', url: 'https://m.udataai.com/?udchl=UkM4q7JD&ut=7', badge: null },
  { label: '手机报告', icon: '\u{1F4F1}', url: 'https://m.udataai.com/?udchl=UfNELh7D&ut=7', badge: '防骚扰' },
  { label: '查车辆', icon: '\u{1F697}', url: 'https://m.udataai.com/?udchl=UMdYg76D&ut=1', badge: null },
  { label: '婚恋查', icon: '\u{2764}', url: 'https://m.udataai.com/?udchl=UaoreseD&ut=5', badge: null },
  { label: '司法案件', icon: '\u{2696}', url: 'https://m.udataai.com/advlogin?udchl=UY1BSgwD&ut=2', badge: '限免' },
  { label: '查学历', icon: '\u{1F4DA}', url: 'https://m.udataai.com/?udchl=UeK6PCWD&ut=5', badge: null },
  { label: '运势', icon: '\u{1F9ED}', url: '/assessments', badge: null },
];

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();

  function handleEntryPress(entry: QuickEntry) {
    if (entry.label === '运势') {
      navigation.navigate('Assessments');
      return;
    }
    openWebView(navigation, entry.url, entry.label);
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {/* Search Shell */}
      <View style={styles.searchShell}>
        <Text style={styles.searchPlaceholder}>搜索框</Text>
      </View>

      {/* Quick Entry Grid */}
      <View style={styles.quickGrid}>
        {homeQuickEntries.map((entry) => (
          <Pressable
            key={entry.label}
            style={styles.quickEntry}
            onPress={() => handleEntryPress(entry)}
            android_ripple={{ color: '#e5e7eb' }}
          >
            <View style={styles.quickIconWrap}>
              {entry.badge ? (
                <Text style={styles.quickBadge}>{entry.badge}</Text>
              ) : null}
              <Text style={styles.quickIcon}>{entry.icon}</Text>
            </View>
            <Text style={styles.quickLabel}>{entry.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* News Card */}
      <Pressable style={styles.newsCard} onPress={() => openWebView(navigation, 'https://m.udataai.com/?udchl=UMdYgZbD&ut=5', '报告详情')}>
        <View style={styles.newsBell}>
          <Text style={{ fontSize: 18 }}>{'\u{1F514}'}</Text>
        </View>
        <View style={styles.newsCopy}>
          <Text style={styles.newsLine}>
            <Text style={styles.newsTag}>最新</Text>
            您的最新报告已生成，<Text style={styles.newsStrong}>立刻查看</Text>
          </Text>
          <Text style={styles.newsSub}>
            有 <Text style={styles.newsDanger}>1项</Text> 风险，请关注并及时优化
          </Text>
        </View>
        <Text style={styles.newsDot}>{'\u{2022}'}</Text>
      </Pressable>

      {/* Risk Hero Card */}
      <View style={styles.riskHeroCard}>
        <Text style={styles.heroFloatingTag}>借款被拒？</Text>
        <View style={styles.riskCopy}>
          <Text style={styles.riskTitle}>全面排查个人风险</Text>
          <Text style={styles.riskPoint}>{'\u{2022}'} 落实核心敏感原因</Text>
          <Text style={styles.riskPoint}>{'\u{2022}'} 了解信用扣分项</Text>
          <Text style={styles.riskPoint}>{'\u{2022}'} 快速挽回信用损失</Text>
        </View>
        <View style={styles.riskMeter}>
          <View style={styles.riskArc} />
          <Text style={styles.riskMeterLabel}>申请风险</Text>
          <Text style={styles.riskMeterValue}>风险偏高</Text>
        </View>
        <Pressable
          style={styles.heroCta}
          onPress={() => openWebView(navigation, 'https://m.udataai.com/pay?udchl=UMdYgZbD&ut=5', '风险排查')}
        >
          <Text style={styles.heroCtaText}>立即排查风险</Text>
        </Pressable>
      </View>

      {/* Promo Grid */}
      <View style={styles.promoGrid}>
        <View style={[styles.promoCard, styles.promoVisual]}>
          <Text style={styles.promoTitle}>深度信用解读</Text>
          <Text style={styles.promoSub}>图片</Text>
        </View>
        <View style={[styles.promoCard, styles.promoReport]}>
          <Text style={styles.promoTitle}>报告免费查</Text>
          <Text style={styles.promoSub}>每日首单免费</Text>
        </View>
        <Pressable
          style={[styles.promoCard, styles.promoEvent]}
          // @ts-ignore cross-navigator navigation
          onPress={() => navigation.navigate('Benefits')}
        >
          <Text style={styles.promoTitle}>优鉴会员</Text>
          <Text style={styles.promoSub}>免费赠 10 次</Text>
        </Pressable>
        <View style={[styles.promoCard, styles.promoArticle]}>
          <Text style={styles.promoTitle}>2026 逾期记录</Text>
          <Text style={styles.promoSub}>全面清零</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f8f9fb' },
  content: { paddingBottom: 24 },
  searchShell: {
    marginHorizontal: 16,
    marginTop: 12,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchPlaceholder: { color: '#9ca3af', fontSize: 14 },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingTop: 14,
  },
  quickEntry: {
    width: '20%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickIconWrap: { position: 'relative', marginBottom: 4 },
  quickBadge: {
    position: 'absolute',
    top: -4,
    right: -12,
    zIndex: 1,
    backgroundColor: '#ef4444',
    color: '#fff',
    fontSize: 9,
    paddingHorizontal: 3,
    borderRadius: 4,
    overflow: 'hidden',
  },
  quickIcon: { fontSize: 26 },
  quickLabel: { fontSize: 11, color: '#374151', marginTop: 2 },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#ef4444',
  },
  newsBell: { marginRight: 10 },
  newsCopy: { flex: 1 },
  newsLine: { fontSize: 13, color: '#374151', lineHeight: 19 },
  newsTag: {
    backgroundColor: '#ef4444',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 4,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 4,
  },
  newsStrong: { fontWeight: '700' },
  newsSub: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  newsDanger: { color: '#ef4444', fontWeight: '700' },
  newsDot: { fontSize: 20, color: '#d1d5db' },
  riskHeroCard: {
    marginHorizontal: 14,
    marginTop: 14,
    backgroundColor: '#1e3a5f',
    borderRadius: 14,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  heroFloatingTag: {
    position: 'absolute',
    top: 10,
    right: 14,
    backgroundColor: '#f59e0b',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  riskCopy: { marginBottom: 14 },
  riskTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  riskPoint: { color: '#bfdbfe', fontSize: 13, lineHeight: 22 },
  riskMeter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  riskArc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#f59e0b',
    marginRight: 10,
  },
  riskMeterLabel: { color: '#93c5fd', fontSize: 12 },
  riskMeterValue: { color: '#f59e0b', fontSize: 16, fontWeight: '700', marginLeft: 10 },
  heroCta: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  heroCtaText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  promoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginTop: 14,
  },
  promoCard: {
    width: '46%',
    margin: '2%',
    borderRadius: 12,
    padding: 14,
    minHeight: 80,
    justifyContent: 'center',
  },
  promoVisual: { backgroundColor: '#dbeafe' },
  promoReport: { backgroundColor: '#d1fae5' },
  promoEvent: { backgroundColor: '#ede9fe' },
  promoArticle: { backgroundColor: '#fff7ed' },
  promoTitle: { fontSize: 14, fontWeight: '700', color: '#1f2937', marginBottom: 4 },
  promoSub: { fontSize: 12, color: '#6b7280' },
});
