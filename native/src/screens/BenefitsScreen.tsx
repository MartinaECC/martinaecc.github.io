import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

const benefitTabs = [
  '风险排查', '手机雷达', '生活服务', '0元领', '好物券',
  '影视会员', '音频会员', '小说会员', '吃喝红包', '打车券',
  '券包天天领', '车主福利',
];

const benefitCards = [
  { title: '风险报告免费领', count: '', type: 'gauge', tags: ['失信风险检测', '130+个人风险项', '司法涉诉检测'], badge: null },
  { title: '手机防骚扰雷达免费领', count: '', type: 'radar', tags: ['一键反诈', '防信息泄露', '风险预警'], badge: '防骚扰防护' },
  { title: '生活服务免费领', count: '可领1次', type: 'grid', items: ['同程', '流量话费', '京东卡', '美团', '轻喜到家'] },
  { title: '好物0元领', count: '可领1次', type: 'grid', items: ['形象美护手霜', '泊泉雅鼻膜', '形象美洁面膏', '韩纪芦荟啫喱'] },
  { title: '好物券免费领', count: '千元券包免费领', type: 'grid', items: ['双头眉笔', '荞麦面60g×两包', '猴头菇味饼干', '吮指薯片'] },
  { title: '影视会员', count: '可领2次', type: 'ticket', brands: ['腾讯', '芒果', '爱奇艺'] },
  { title: '音频会员', count: '可领2次', type: 'ticket', brands: ['网易云', '喜马', 'QQ音乐'] },
  { title: '小说会员', count: '可领1次', type: 'ticket', brands: ['快看', '知乎', '书旗'] },
  { title: '吃喝红包免费领', count: '可领2次', type: 'ticket', brands: ['美团', '饿了么', '奈雪'] },
  { title: '打车券免费领', count: '可领1次', type: 'ticket', brands: ['滴滴', '曹操', 'T3'] },
  { title: '电影券免费领', count: '免费领', type: 'movie' },
  { title: '券包天天领', count: '天天免费领', type: 'daily', items: ['京东外卖', '美团外卖', '滴滴出行'] },
  { title: '车主福利免费领', count: '免费领', type: 'carOwner', items: ['洗车券', '车保养'] },
];

export default function BenefitsScreen() {
  const [activeTab, setActiveTab] = useState('风险排查');
  const [agreed, setAgreed] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.bgPanel}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>
              {'\u265B'} 会员尊享
            </Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>尊享权益</Text>
                <Text style={styles.summaryValue}>27项</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>预计可享</Text>
                <Text style={styles.summaryValue}>7528元</Text>
              </View>
              <Pressable style={styles.openMemberBtn}>
                <Text style={styles.openMemberBtnText}>开通领权益</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabScroll}
            contentContainerStyle={styles.tabContent}
          >
            {benefitTabs.map((tab) => (
              <Pressable
                key={tab}
                style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {benefitCards.map((card) => (
            <View key={card.title} style={styles.benefitCard}>
              <View style={styles.benefitCardHead}>
                <Text style={styles.benefitCardTitle}>{card.title}</Text>
                {card.count ? <Text style={styles.benefitCardCount}>{card.count}</Text> : null}
              </View>

              <View style={styles.benefitCardBody}>
                {card.type === 'gauge' && card.tags ? (
                  <View style={styles.tagCloud}>
                    {card.tags?.map((tag: string) => (
                      <Text key={tag} style={styles.tag}>{tag}</Text>
                    ))}
                  </View>
                ) : null}
                {card.type === 'radar' && card.tags ? (
                  <View style={styles.radarPreview}>
                    <Text style={styles.radarText}>深度排查泄露风险</Text>
                    <View style={styles.radarCircle}>
                      <Text style={styles.radarCircleText}>较高</Text>
                    </View>
                  </View>
                ) : null}
                {card.type === 'grid' && card.items ? (
                  <View style={styles.itemGrid}>
                    {card.items.map((item: string) => (
                      <View key={item} style={styles.gridItem}>
                        <Text style={styles.gridItemText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
                {card.type === 'ticket' && card.brands ? (
                  <View style={styles.ticketRow}>
                    {card.brands.map((brand: string) => (
                      <Text key={brand} style={styles.brandPill}>{brand}</Text>
                    ))}
                  </View>
                ) : null}
                {card.type === 'movie' ? (
                  <View style={styles.moviePreview}>
                    <Text style={styles.movieText}>热门电影 86折看</Text>
                  </View>
                ) : null}
                {card.type === 'daily' && card.items ? (
                  <View style={styles.itemGrid}>
                    {card.items.map((item: string) => (
                      <View key={item} style={[styles.gridItem, styles.dailyItem]}>
                        <Text style={styles.gridItemText}>{item}</Text>
                        <Text style={styles.dailySub}>天天领</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
                {card.type === 'carOwner' && card.items ? (
                  <View style={styles.itemGrid}>
                    {card.items.map((item: string) => (
                      <View key={item} style={styles.gridItem}>
                        <Text style={styles.gridItemText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>

              <Pressable style={styles.claimBtn}>
                <Text style={styles.claimBtnText}>开通可领</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.floatingCard}>
        <Pressable style={styles.floatingPrice}>
          <View style={styles.floatingLeft}>
            <Text style={styles.floatingPriceNum}>¥69特价</Text>
            <Text style={styles.floatingPriceOld}>原价¥99</Text>
          </View>
          <Text style={styles.floatingRight}>开通包回本</Text>
        </Pressable>
        <Pressable style={styles.agreementRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkBox, agreed && styles.checkBoxActive]}>
            {agreed ? <Text style={styles.checkMark}>{'\u2713'}</Text> : null}
          </View>
          <Text style={styles.agreementText}>
            开通即同意 <Text style={styles.agreementLink}>《会员服务协议》</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fb' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  bgPanel: { paddingBottom: 20 },
  summaryCard: {
    marginHorizontal: 14,
    marginTop: 14,
    backgroundColor: '#1e3a5f',
    borderRadius: 14,
    padding: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fbbf24',
    marginBottom: 12,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryItem: { alignItems: 'center' },
  summaryLabel: { fontSize: 11, color: '#93c5fd', marginBottom: 4 },
  summaryValue: { fontSize: 20, fontWeight: '700', color: '#fff' },
  openMemberBtn: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  openMemberBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  tabScroll: { maxHeight: 44, marginTop: 12 },
  tabContent: { paddingHorizontal: 14, gap: 8, flexDirection: 'row' },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tabBtnActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  tabBtnText: { fontSize: 12, color: '#6b7280' },
  tabBtnTextActive: { color: '#fff' },
  benefitCard: {
    marginHorizontal: 14,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
  },
  benefitCardHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitCardTitle: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  benefitCardCount: { fontSize: 12, color: '#2563eb' },
  benefitCardBody: { marginBottom: 10 },
  tagCloud: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    fontSize: 11,
    color: '#4b5563',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  radarPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radarText: { fontSize: 13, color: '#4b5563' },
  radarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  radarCircleText: { color: '#ef4444', fontSize: 12, fontWeight: '600' },
  itemGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  gridItem: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  gridItemText: { fontSize: 12, color: '#374151' },
  dailyItem: { alignItems: 'center' },
  dailySub: { fontSize: 9, color: '#6b7280', marginTop: 2 },
  ticketRow: { flexDirection: 'row', gap: 8 },
  brandPill: {
    fontSize: 12,
    color: '#2563eb',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  moviePreview: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  movieText: { fontSize: 13, color: '#dc2626' },
  claimBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#f59e0b',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  claimBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  floatingCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  floatingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 10,
    padding: 14,
  },
  floatingLeft: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  floatingPriceNum: { color: '#fff', fontSize: 18, fontWeight: '700' },
  floatingPriceOld: { color: '#93c5fd', fontSize: 12, textDecorationLine: 'line-through' },
  floatingRight: { color: '#fff', fontSize: 14 },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 4,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  checkMark: { color: '#fff', fontSize: 12 },
  agreementText: { fontSize: 12, color: '#6b7280' },
  agreementLink: { color: '#2563eb' },
});
