import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

interface ReportCard {
  title: string;
  date: string;
  summary: string;
  tone?: 'warning';
  meta?: string;
  cta?: string;
}

const reportCards: ReportCard[] = [
  {
    title: '手机风险报告',
    date: '26/02/03',
    summary: '有1项风险尽快查看',
    tone: 'warning',
    meta: '最新',
  },
  {
    title: '个人风险报告',
    date: '26/01/03',
    summary: '立刻完成授权查看报告，110+风险待查',
    cta: '去授权',
  },
  {
    title: '背调报告',
    date: '26/01/01',
    summary: '等待 xx 完成授权，去提醒',
    meta: '处理中',
  },
];

const monitorCards = [
  {
    title: 'xx企业',
    date: '26/01/01',
    summary: 'xx 开庭信息',
  },
];

const filterTabs = ['全部', '待授权', '已完成'];

export default function ReportsScreen() {
  const [activeFilter, setActiveFilter] = React.useState('全部');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.segmented}>
        <Pressable style={[styles.segmentPill, styles.segmentSelected]}>
          <Text style={styles.segmentLabel}>我的报告</Text>
          <Text style={styles.segmentCount}>3</Text>
        </Pressable>
        <Pressable style={styles.segmentPill}>
          <Text style={styles.segmentLabel}>实时监控</Text>
          <Text style={styles.segmentCountGray}>2</Text>
        </Pressable>
      </View>

      <View style={styles.filterRow}>
        {filterTabs.map((tab) => (
          <Pressable
            key={tab}
            style={[styles.filterTab, activeFilter === tab && styles.filterTabActive]}
            onPress={() => setActiveFilter(tab)}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === tab && styles.filterTabTextActive,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {reportCards.map((card) => (
        <Pressable
          key={card.title + card.date}
          style={[styles.reportCard, card.tone === 'warning' && styles.reportCardWarning]}
        >
          <View style={styles.reportCardHead}>
            <Text style={styles.reportCardTitle}>{card.title}</Text>
            <Text style={styles.reportCardDate}>{card.date}</Text>
          </View>
          <Text style={styles.reportCardSummary}>{card.summary}</Text>
          <View style={styles.reportCardFooter}>
            {card.meta ? <Text style={styles.statusChip}>{card.meta}</Text> : null}
            {card.cta ? (
              <Pressable style={styles.reportCta}>
                <Text style={styles.reportCtaText}>{card.cta}</Text>
              </Pressable>
            ) : null}
          </View>
        </Pressable>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>实时监控</Text>
      </View>

      {monitorCards.map((card) => (
        <Pressable key={card.title} style={styles.reportCard}>
          <View style={styles.reportCardHead}>
            <Text style={styles.reportCardTitle}>{card.title}</Text>
            <Text style={styles.reportCardDate}>{card.date}</Text>
          </View>
          <Text style={styles.reportCardSummary}>{card.summary}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f8f9fb' },
  content: { paddingBottom: 24 },
  segmented: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginTop: 14,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 3,
  },
  segmentPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  segmentSelected: { backgroundColor: '#fff' },
  segmentLabel: { fontSize: 14, fontWeight: '600', color: '#374151' },
  segmentCount: {
    marginLeft: 6,
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: 11,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  segmentCountGray: {
    marginLeft: 6,
    color: '#9ca3af',
    fontSize: 11,
  },
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginTop: 12,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  filterTabActive: { backgroundColor: '#2563eb' },
  filterTabText: { fontSize: 13, color: '#6b7280' },
  filterTabTextActive: { color: '#fff' },
  reportCard: {
    marginHorizontal: 14,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
  },
  reportCardWarning: {
    borderLeftWidth: 3,
    borderLeftColor: '#ef4444',
  },
  reportCardHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  reportCardTitle: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  reportCardDate: { fontSize: 12, color: '#9ca3af' },
  reportCardSummary: { fontSize: 13, color: '#4b5563', lineHeight: 19 },
  reportCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  statusChip: {
    fontSize: 11,
    color: '#059669',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  reportCta: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  reportCtaText: { color: '#fff', fontSize: 13 },
  sectionHeader: {
    marginHorizontal: 14,
    marginTop: 24,
    marginBottom: 6,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1f2937' },
});
