import React, { useState } from 'react';
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
import { tests } from '../data/tests';
import {
  getDailyFortuneHomeSummary,
  getDailyFortunePreview,
  loadDailyFortuneProfile,
  saveDailyFortuneProfile,
} from '../data/dailyFortune';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const PREVIEW_COLORS: Record<string, string> = {
  overall: '#78a18f',
  career: '#8fb6c8',
  health: '#7fa690',
  love: '#efaa9a',
  family: '#b5a9d4',
};

export default function AssessmentsScreen() {
  const navigation = useNavigation<Navigation>();
  const [profile, setProfile] = useState<any>(() => loadDailyFortuneProfile());
  const [isEditingDaily, setIsEditingDaily] = useState(() => !loadDailyFortuneProfile());
  const [editForm, setEditForm] = useState({
    year: profile?.year || new Date().getFullYear() - 20,
    month: profile?.month || 1,
    day: profile?.day || 1,
    hour: profile?.hour || 11,
    gender: profile?.gender || null,
  });

  const previewItems = getDailyFortunePreview(profile);
  const homeSummary = getDailyFortuneHomeSummary(profile);

  const SHI_CHEN = [
    { value: 23, label: '子' },
    { value: 1, label: '丑' },
    { value: 3, label: '寅' },
    { value: 5, label: '卯' },
    { value: 7, label: '辰' },
    { value: 9, label: '巳' },
    { value: 11, label: '午' },
    { value: 13, label: '未' },
    { value: 15, label: '申' },
    { value: 17, label: '酉' },
    { value: 19, label: '戌' },
    { value: 21, label: '亥' },
  ];

  function handleDailyFortuneSave() {
    if (!editForm.gender) return;
    const nextProfile = { ...editForm, minute: 0 };
    saveDailyFortuneProfile(nextProfile);
    setProfile(nextProfile);
    setIsEditingDaily(false);
  }

  function handleGoToTest(testId: string) {
    navigation.navigate('AssessmentTest', { testId });
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      {/* Orbit Visual Card */}
      <View style={s.orbitCard}>
        <View style={s.orbitVisual}>
          <View style={[s.orbitRing, { borderColor: '#78a18f' }]} />
          <View style={[s.orbitRing, { width: 28, height: 28, borderRadius: 14, borderColor: '#e39272' }]} />
          <View style={[s.orbitRing, { width: 24, height: 24, borderRadius: 12, borderColor: '#b5a9d4', borderStyle: 'dashed' as const }]} />
        </View>
        <Text style={s.orbitText}>
          一组温和而有结构的自我探索测试，帮助你理解性格、动机与行动模式。
        </Text>
        <Text style={s.orbitNote}>
          测试结果仅用于自我观察，不替代专业心理评估。
        </Text>
      </View>

      {/* Daily Fortune Card */}
      <View style={s.dailyHomeCard}>
        <View style={s.dailyHomeBody}>
          <Text style={s.eyebrow}>Daily Fortune</Text>
          <Text style={s.sectionTitleText}>每日运势</Text>

          {isEditingDaily ? (
            <View>
              <Text style={s.dailyHomeDesc}>填写您的生日看看今日运势</Text>
              <View style={s.inlineForm}>
                <View style={s.inlineFormRow}>
                  <Pressable
                    style={[s.inlineBtn, editForm.gender === 'male' && s.inlineBtnActive]}
                    onPress={() => setEditForm((p) => ({ ...p, gender: 'male' }))}
                  >
                    <Text style={[s.inlineBtnText, editForm.gender === 'male' && s.inlineBtnTextActive]}>男</Text>
                  </Pressable>
                  <Pressable
                    style={[s.inlineBtn, editForm.gender === 'female' && s.inlineBtnActive]}
                    onPress={() => setEditForm((p) => ({ ...p, gender: 'female' }))}
                  >
                    <Text style={[s.inlineBtnText, editForm.gender === 'female' && s.inlineBtnTextActive]}>女</Text>
                  </Pressable>
                </View>
                <View style={s.inlineFormRow}>
                  {[editForm.year - 1, editForm.year, editForm.year + 1].map((y) => (
                    <Pressable
                      key={y}
                      style={[s.inlineBtn, editForm.year === y && s.inlineBtnActive]}
                      onPress={() => setEditForm((p) => ({ ...p, year: y }))}
                    >
                      <Text style={[s.inlineBtnText, editForm.year === y && s.inlineBtnTextActive]}>{y}</Text>
                    </Pressable>
                  ))}
                </View>
                <View style={s.inlineFormRow}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).filter((m) => Math.abs(m - editForm.month) <= 1).map((m) => (
                    <Pressable
                      key={m}
                      style={[s.inlineBtn, editForm.month === m && s.inlineBtnActive]}
                      onPress={() => setEditForm((p) => ({ ...p, month: m }))}
                    >
                      <Text style={[s.inlineBtnText, editForm.month === m && s.inlineBtnTextActive]}>{m}月</Text>
                    </Pressable>
                  ))}
                </View>
                <View style={s.inlineFormRow}>
                  {SHI_CHEN.map((item) => (
                    <Pressable
                      key={item.value}
                      style={[s.inlineBtnSmall, editForm.hour === item.value && s.inlineBtnActive]}
                      onPress={() => setEditForm((p) => ({ ...p, hour: item.value }))}
                    >
                      <Text style={[s.inlineBtnText, editForm.hour === item.value && s.inlineBtnTextActive]}>{item.label}</Text>
                    </Pressable>
                  ))}
                </View>
                <Pressable style={s.saveInlineBtn} onPress={handleDailyFortuneSave}>
                  <Text style={s.saveInlineBtnText}>保存并查看今日运势</Text>
                </Pressable>
              </View>
            </View>
          ) : profile ? (
            <View>
              <Text style={s.dailyHomeStatus}>已保存生日信息</Text>
              <Text style={s.dailyHomeDesc}>{homeSummary}</Text>
              <View style={s.dailyHomeActions}>
                <Pressable style={s.dailyCta} onPress={() => navigation.navigate('DailyFortune')}>
                  <Text style={s.dailyCtaLabel}>查看今日运势</Text>
                </Pressable>
                <Pressable style={s.textLinkBtn} onPress={() => setIsEditingDaily(true)}>
                  <Text style={s.textLinkText}>修改资料 →</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <Text style={s.dailyHomeDesc}>
              结合星座与八字五行，每天生成今日运势参考。信息仅保存在本地，不会上传。
            </Text>
          )}
        </View>

        <View style={s.dailyPreview}>
          {previewItems.map((item: any) => (
            <View key={item.key} style={s.previewItem}>
              <View style={s.previewBarWrap}>
                <View
                  style={[
                    s.previewBar,
                    {
                      height: `${item.score}%`,
                      backgroundColor: PREVIEW_COLORS[item.key] || '#78a18f',
                    },
                  ]}
                />
              </View>
              <Text style={s.previewScore}>{item.score}</Text>
              <Text style={s.previewLabel}>{item.label.slice(0, 1)}</Text>
            </View>
          ))}
        </View>

        {profile && (
          <Pressable style={s.editAction} onPress={() => setIsEditingDaily(true)}>
            <Text style={s.editActionText}>修改资料 →</Text>
          </Pressable>
        )}
      </View>

      {/* Test Cards Section */}
      <View style={s.sectionBlock}>
        <View style={s.moduleHeading}>
          <View>
            <Text style={s.eyebrow}>Assessments</Text>
            <Text style={s.sectionTitleText}>个性测试</Text>
          </View>
          <Text style={s.moduleSub}>从不同主题开始观察自己</Text>
        </View>

        <View style={s.testGrid}>
          {tests
            .filter((t) => t.status === 'live')
            .map((test) => (
              <Pressable key={test.id} style={s.testCard} onPress={() => handleGoToTest(test.id)}>
                <View style={s.testCardTopline}>
                  <Text style={s.testCardBadge}>{test.badge}</Text>
                </View>
                <Text style={s.testCardIcon}>{test.icon}</Text>
                <Text style={s.testCardTitle}>{test.title}</Text>
                <Text style={s.testCardDesc}>{test.description}</Text>
                <View style={s.tagRow}>
                  {test.tags.map((tag: string) => (
                    <Text key={tag} style={s.tag}>{tag}</Text>
                  ))}
                </View>
                <View style={s.testCardAction}>
                  <Text style={s.testCardCta}>进入测试</Text>
                </View>
              </Pressable>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#fffaf1' },
  content: { paddingBottom: 40 },
  eyebrow: { fontSize: 11, fontWeight: '800', color: '#4f7d6d', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  sectionTitleText: { fontSize: 20, fontWeight: '700', color: '#2f2b26', marginBottom: 8 },

  // Orbit card
  orbitCard: { marginHorizontal: 14, marginTop: 14, backgroundColor: '#fffefb', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#efe4d3', alignItems: 'center' },
  orbitVisual: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 14 },
  orbitRing: { width: 32, height: 32, borderRadius: 16, borderWidth: 2 },
  orbitText: { fontSize: 14, color: '#756f66', textAlign: 'center', lineHeight: 22 },
  orbitNote: { fontSize: 11, color: '#a09587', marginTop: 10 },

  // Daily Fortune Card
  dailyHomeCard: { marginHorizontal: 14, marginTop: 14, backgroundColor: '#fffefb', borderRadius: 18, borderWidth: 1, borderColor: '#efe4d3', overflow: 'hidden' },
  dailyHomeBody: { padding: 16 },
  dailyHomeDesc: { fontSize: 13, color: '#756f66', lineHeight: 20, marginBottom: 10 },
  dailyHomeStatus: { fontSize: 12, color: '#7fa690', fontWeight: '600', marginBottom: 4 },
  dailyHomeActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  dailyCta: { flex: 1, backgroundColor: '#78a18f', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  dailyCtaLabel: { color: '#fff', fontSize: 14, fontWeight: '700' },
  textLinkBtn: { paddingVertical: 8 },
  textLinkText: { color: '#4f7d6d', fontSize: 13, fontWeight: '600' },
  dailyPreview: { flexDirection: 'row', justifyContent: 'center', gap: 10, paddingHorizontal: 16, paddingBottom: 12, alignItems: 'flex-end' },
  previewItem: { alignItems: 'center', width: 40 },
  previewBarWrap: { width: 20, height: 50, backgroundColor: '#f8eedf', borderRadius: 6, justifyContent: 'flex-end', overflow: 'hidden' },
  previewBar: { width: 20, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 },
  previewScore: { fontSize: 10, color: '#756f66', marginTop: 2, fontWeight: '600' },
  previewLabel: { fontSize: 9, color: '#a09587' },
  editAction: { borderTopWidth: 1, borderTopColor: '#efe4d3', padding: 12, alignItems: 'center' },
  editActionText: { color: '#4f7d6d', fontSize: 13, fontWeight: '600' },

  // Inline form
  inlineForm: { marginTop: 6 },
  inlineFormRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  inlineBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#fffefb', borderWidth: 1, borderColor: '#dfcfb8' },
  inlineBtnSmall: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: '#fffefb', borderWidth: 1, borderColor: '#dfcfb8' },
  inlineBtnActive: { backgroundColor: '#78a18f', borderColor: '#78a18f' },
  inlineBtnText: { fontSize: 12, color: '#756f66' },
  inlineBtnTextActive: { color: '#fff', fontWeight: '600' },
  saveInlineBtn: { backgroundColor: '#78a18f', borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 4 },
  saveInlineBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },

  // Test cards
  sectionBlock: { marginHorizontal: 14, marginTop: 20 },
  moduleHeading: { marginBottom: 12 },
  moduleSub: { fontSize: 12, color: '#a09587', marginTop: 2 },
  testGrid: { gap: 12 },
  testCard: { backgroundColor: '#fffefb', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#efe4d3' },
  testCardTopline: { marginBottom: 10 },
  testCardBadge: { alignSelf: 'flex-start', fontSize: 11, color: '#7fa690', fontWeight: '600', backgroundColor: '#eef7f2', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, overflow: 'hidden' },
  testCardIcon: { fontSize: 28, fontWeight: '700', color: '#4f7d6d', marginBottom: 6 },
  testCardTitle: { fontSize: 16, fontWeight: '700', color: '#2f2b26', marginBottom: 6 },
  testCardDesc: { fontSize: 13, color: '#756f66', lineHeight: 19, marginBottom: 10 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  tag: { fontSize: 11, color: '#756f66', backgroundColor: '#f8eedf', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, overflow: 'hidden' },
  testCardAction: { borderTopWidth: 1, borderTopColor: '#efe4d3', paddingTop: 10 },
  testCardCta: { color: '#78a18f', fontSize: 14, fontWeight: '700', textAlign: 'center' },
});
