import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import {
  fortuneCategories,
  calculateDailyFortune,
  clearDailyFortuneProfile,
  loadDailyFortuneProfile,
  saveDailyFortuneProfile,
  getScoreLevel,
} from '../data/dailyFortune';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyFortune'>;

const SHI_CHEN = [
  { value: 23, label: '子时 (23:00-01:00)' },
  { value: 1, label: '丑时 (01:00-03:00)' },
  { value: 3, label: '寅时 (03:00-05:00)' },
  { value: 5, label: '卯时 (05:00-07:00)' },
  { value: 7, label: '辰时 (07:00-09:00)' },
  { value: 9, label: '巳时 (09:00-11:00)' },
  { value: 11, label: '午时 (11:00-13:00)' },
  { value: 13, label: '未时 (13:00-15:00)' },
  { value: 15, label: '申时 (15:00-17:00)' },
  { value: 17, label: '酉时 (17:00-19:00)' },
  { value: 19, label: '戌时 (19:00-21:00)' },
  { value: 21, label: '亥时 (21:00-23:00)' },
];

function DailyFortuneResultView({ result, onEdit, onClear }: { result: any; onEdit: () => void; onClear: () => void }) {
  const { dateLabel, zodiac, bazi, summary, categories } = result;

  return (
    <ScrollView style={st.scroll} contentContainerStyle={st.resultContent}>
      <View style={st.fortuneHero}>
        <View style={{ flex: 1 }}>
          <Text style={st.eyebrow}>{dateLabel}</Text>
          <Text style={st.h1}>今日{zodiac.label}运势</Text>
          <Text style={st.lead}>{summary.text}</Text>
          {summary.caution && (
            <View style={st.cautionBox}>
              <Text style={st.cautionTitle}>今日提醒：</Text>
              <Text style={st.cautionText}>{summary.caution}</Text>
            </View>
          )}
        </View>
        <View style={st.scoreBox}>
          <Text style={st.scoreNum}>{summary.score}</Text>
          <Text style={st.scoreLevel}>{summary.level}</Text>
        </View>
      </View>

      <View style={st.metaGrid}>
        <View style={st.metaItem}>
          <Text style={st.metaLabel}>星座</Text>
          <Text style={st.metaValue}>{zodiac.label} ({zodiac.element})</Text>
        </View>
        <View style={st.metaItem}>
          <Text style={st.metaLabel}>日主</Text>
          <Text style={st.metaValue}>{bazi.dayMaster} ({bazi.dayMasterElement})</Text>
        </View>
        <View style={st.metaItem}>
          <Text style={st.metaLabel}>今日干支</Text>
          <Text style={st.metaValue}>{bazi.todayGanZhi}</Text>
        </View>
        <View style={st.metaItem}>
          <Text style={st.metaLabel}>今日五行</Text>
          <Text style={st.metaValue}>{bazi.todayGanElement}</Text>
        </View>
      </View>

      <Text style={st.sectionTitle}>分项运势</Text>
      <View style={st.categoryGrid}>
        {categories.map((cat: any) => (
          <View key={cat.key} style={st.categoryCard}>
            <Text style={st.categoryLabel}>
              {cat.label} <Text style={st.categoryScore}>· {cat.score}</Text>
            </Text>
            <Text style={st.categoryText}>{cat.text}</Text>
            <View style={st.keywordRow}>
              {cat.keywords.map((kw: string) => (
                <Text key={kw} style={st.keyword}>{kw}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={st.navRow}>
        <Pressable style={st.secondaryBtn} onPress={onEdit}>
          <Text style={st.secondaryBtnText}>修改生日信息</Text>
        </Pressable>
        <Pressable style={st.secondaryBtn} onPress={onClear}>
          <Text style={st.secondaryBtnText}>清除本地资料</Text>
        </Pressable>
      </View>
      <Text style={st.disclaimer}>本运势仅供娱乐参考，命运掌握在你自己手中。</Text>
    </ScrollView>
  );
}

export default function DailyFortuneScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<any>(() => loadDailyFortuneProfile());
  const [isEditing, setIsEditing] = useState(() => !loadDailyFortuneProfile());
  const [form, setForm] = useState({
    year: new Date().getFullYear() - 20,
    month: 1,
    day: 1,
    hour: 11,
    gender: null as 'male' | 'female' | null,
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: '每日运势', headerBackTitle: '返回' });
  }, [navigation]);

  const result = profile && !isEditing ? calculateDailyFortune(profile) : null;

  function handleSave() {
    if (!form.gender) {
      return;
    }
    const nextProfile = { ...form, minute: 0 };
    saveDailyFortuneProfile(nextProfile);
    setProfile(nextProfile);
    setIsEditing(false);
  }

  function handleClear() {
    clearDailyFortuneProfile();
    setProfile(null);
    setIsEditing(true);
    setForm({ year: new Date().getFullYear() - 20, month: 1, day: 1, hour: 11, gender: null });
  }

  if (result && !isEditing) {
    return (
      <DailyFortuneResultView
        result={result}
        onEdit={() => setIsEditing(true)}
        onClear={handleClear}
      />
    );
  }

  const daysCount = new Date(form.year, form.month, 0).getDate();
  const safeDay = Math.min(form.day, daysCount);

  return (
    <ScrollView style={st.scroll} contentContainerStyle={st.formContent}>
      <Text style={st.eyebrow}>Daily Fortune</Text>
      <Text style={st.h1}>每日运势</Text>
      <Text style={st.lead}>结合星座与八字五行，为你生成每天更新的五类运势参考。</Text>
      <Text style={st.note}>出生信息仅保存在当前设备本地，不会上传。</Text>

      <Text style={st.formLabel}>年份</Text>
      <View style={st.pickerRow}>
        {[form.year - 2, form.year - 1, form.year, form.year + 1, form.year + 2].map((y) => (
          <Pressable
            key={y}
            style={[st.pickerBtn, form.year === y && st.pickerBtnActive]}
            onPress={() => setForm((p) => ({ ...p, year: y }))}
          >
            <Text style={[st.pickerBtnText, form.year === y && st.pickerBtnTextActive]}>{y}年</Text>
          </Pressable>
        ))}
      </View>

      <Text style={st.formLabel}>月份</Text>
      <View style={st.pickerRow}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <Pressable
            key={m}
            style={[st.pickerBtn, form.month === m && st.pickerBtnActive]}
            onPress={() => setForm((p) => ({ ...p, month: m, day: Math.min(p.day, new Date(p.year, m, 0).getDate()) }))}
          >
            <Text style={[st.pickerBtnText, form.month === m && st.pickerBtnTextActive]}>{m}月</Text>
          </Pressable>
        ))}
      </View>

      <Text style={st.formLabel}>日期</Text>
      <View style={st.pickerRow}>
        {Array.from({ length: daysCount }, (_, i) => i + 1)
          .slice(Math.max(0, safeDay - 4), Math.min(daysCount, safeDay + 5))
          .map((d) => (
            <Pressable
              key={d}
              style={[st.pickerBtn, form.day === d && st.pickerBtnActive]}
              onPress={() => setForm((p) => ({ ...p, day: d }))}
            >
              <Text style={[st.pickerBtnText, form.day === d && st.pickerBtnTextActive]}>{d}日</Text>
            </Pressable>
          ))}
      </View>

      <Text style={st.formLabel}>时辰</Text>
      <View style={st.shichGrid}>
        {SHI_CHEN.slice(0, 6).map((item) => (
          <Pressable
            key={item.value}
            style={[st.shichBtn, form.hour === item.value && st.shichBtnActive]}
            onPress={() => setForm((p) => ({ ...p, hour: item.value }))}
          >
            <Text style={[st.shichBtnText, form.hour === item.value && st.shichBtnTextActive]}>
              {item.label.slice(0, 2)}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={st.shichGrid}>
        {SHI_CHEN.slice(6).map((item) => (
          <Pressable
            key={item.value}
            style={[st.shichBtn, form.hour === item.value && st.shichBtnActive]}
            onPress={() => setForm((p) => ({ ...p, hour: item.value }))}
          >
            <Text style={[st.shichBtnText, form.hour === item.value && st.shichBtnTextActive]}>
              {item.label.slice(0, 2)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={st.formLabel}>性别</Text>
      <View style={st.genderRow}>
        <Pressable
          style={[st.genderBtn, form.gender === 'male' && st.genderBtnActive]}
          onPress={() => setForm((p) => ({ ...p, gender: 'male' }))}
        >
          <Text style={[st.genderBtnText, form.gender === 'male' && st.genderBtnTextActive]}>男</Text>
        </Pressable>
        <Pressable
          style={[st.genderBtn, form.gender === 'female' && st.genderBtnActive]}
          onPress={() => setForm((p) => ({ ...p, gender: 'female' }))}
        >
          <Text style={[st.genderBtnText, form.gender === 'female' && st.genderBtnTextActive]}>女</Text>
        </Pressable>
      </View>

      <View style={st.navRow}>
        <Pressable style={st.primaryBtn} onPress={handleSave}>
          <Text style={st.primaryBtnText}>保存并查看运势</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#fffaf1' },
  formContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 },
  resultContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  eyebrow: { fontSize: 12, fontWeight: '800', color: '#4f7d6d', letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' },
  h1: { fontSize: 24, fontWeight: '700', color: '#2f2b26', marginBottom: 12 },
  lead: { fontSize: 15, color: '#756f66', lineHeight: 22, marginBottom: 10 },
  note: { fontSize: 13, color: '#4f7d6d', backgroundColor: 'rgba(127,166,144,0.13)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 20 },
  formLabel: { fontSize: 14, fontWeight: '600', color: '#2f2b26', marginBottom: 8, marginTop: 12 },
  pickerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pickerBtn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, backgroundColor: '#fffefb', borderWidth: 1, borderColor: '#efe4d3', minWidth: 44, alignItems: 'center' },
  pickerBtnActive: { backgroundColor: '#78a18f', borderColor: '#78a18f' },
  pickerBtnText: { fontSize: 13, color: '#756f66' },
  pickerBtnTextActive: { color: '#fff', fontWeight: '600' },
  shichGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  shichBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#fffefb', borderWidth: 1, borderColor: '#efe4d3', minWidth: 52, alignItems: 'center' },
  shichBtnActive: { backgroundColor: '#78a18f', borderColor: '#78a18f' },
  shichBtnText: { fontSize: 12, color: '#756f66' },
  shichBtnTextActive: { color: '#fff', fontWeight: '600' },
  genderRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  genderBtn: { flex: 1, paddingVertical: 14, borderRadius: 10, backgroundColor: '#fffefb', borderWidth: 1, borderColor: '#efe4d3', alignItems: 'center' },
  genderBtnActive: { backgroundColor: '#78a18f', borderColor: '#78a18f' },
  genderBtnText: { fontSize: 15, color: '#756f66', fontWeight: '600' },
  genderBtnTextActive: { color: '#fff' },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 8, marginBottom: 24 },
  primaryBtn: { flex: 1, backgroundColor: '#78a18f', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtn: { flex: 1, backgroundColor: '#fffefb', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#dfcfb8' },
  secondaryBtnText: { color: '#756f66', fontSize: 15, fontWeight: '600' },
  disclaimer: { fontSize: 11, color: '#a09587', textAlign: 'center', lineHeight: 16, marginBottom: 16 },

  // Fortune result
  fortuneHero: { backgroundColor: '#fffefb', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#efe4d3', marginBottom: 16, flexDirection: 'row' },
  scoreBox: { width: 80, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#efe4d3', marginLeft: 14, paddingLeft: 14 },
  scoreNum: { fontSize: 32, fontWeight: '700', color: '#78a18f' },
  scoreLevel: { fontSize: 13, color: '#756f66', marginTop: 4 },
  cautionBox: { marginTop: 8, backgroundColor: '#fde4d6', borderRadius: 10, padding: 10 },
  cautionTitle: { fontSize: 12, fontWeight: '700', color: '#c58a38' },
  cautionText: { fontSize: 12, color: '#a05a4c', marginTop: 2 },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  metaItem: { width: '46%', backgroundColor: '#fffefb', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#efe4d3' },
  metaLabel: { fontSize: 11, color: '#a09587', marginBottom: 4 },
  metaValue: { fontSize: 14, fontWeight: '600', color: '#2f2b26' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2f2b26', marginBottom: 12 },
  categoryGrid: { gap: 10, marginBottom: 20 },
  categoryCard: { backgroundColor: '#fffefb', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#efe4d3' },
  categoryLabel: { fontSize: 15, fontWeight: '600', color: '#2f2b26', marginBottom: 8 },
  categoryScore: { fontSize: 13, color: '#78a18f', fontWeight: '700' },
  categoryText: { fontSize: 13, color: '#756f66', lineHeight: 21, marginBottom: 10 },
  keywordRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  keyword: { fontSize: 11, color: '#4f7d6d', backgroundColor: 'rgba(127,166,144,0.13)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
});
