import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { tests, getLiveTest } from '../data/tests';

type Props = NativeStackScreenProps<RootStackParamList, 'AssessmentTest'>;

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

function generateYearOptions() {
  return Array.from({ length: 131 }, (_, i) => 1900 + i);
}

function generateMonthOptions() {
  return Array.from({ length: 12 }, (_, i) => i + 1);
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function QuizResultView({ test, scores }: { test: any; scores: any }) {
  const actualScores = scores.scores || scores;
  const bftiType = scores.type;
  const isBfti = Boolean(bftiType);
  const dominantType =
    bftiType ||
    [...test.typeOrder].sort((a: string, b: string) => actualScores[b] - actualScores[a])[0];
  const profile = bftiType ? test.profiles[bftiType] : test.profiles[dominantType];
  const maxScore = Math.max(...test.typeOrder.map((type: string) => actualScores[type]));

  return (
    <View>
      <Text style={s.h1}>{isBfti ? '你的暴富人格' : '你的测试结果'}</Text>

      <View style={s.resultSummary}>
        {isBfti ? (
          profile.icon && <Text style={s.typeIcon}>{profile.icon}</Text>
        ) : (
          <Text style={[s.typeMarker, { backgroundColor: profile?.color || '#6f8372' }]}>
            {test.typeLabels[dominantType]?.slice(0, 1)}
          </Text>
        )}
        <Text style={s.eyebrow}>{isBfti ? bftiType : 'Primary Pattern'}</Text>
        <Text style={s.profileTitle}>{profile.name}</Text>
        <Text style={s.profileTagline}>{isBfti ? profile.nickname : profile.tagline}</Text>
        <Text style={s.disclaimer}>
          {isBfti
            ? '这个结果描述的是你当前的财富状态，未来掌握在你自己手中！'
            : '这个结果描述的是你在本次作答中呈现出的主要倾向，不代表固定不变的人格标签。'}
        </Text>
      </View>

      {isBfti ? (
        <View style={s.descGrid}>
          <View style={s.descCard}>
            <Text style={s.descCardTitle}>扎心现状</Text>
            <Text style={s.descCardText}>{profile.status}</Text>
          </View>
          <View style={s.descCard}>
            <Text style={s.descCardTitle}>暴富预言</Text>
            <Text style={s.descCardText}>{profile.prediction}</Text>
          </View>
        </View>
      ) : (
        <>
          <View style={s.descGridThree}>
            <View style={s.descCard}>
              <Text style={s.descCardTitle}>性格概览</Text>
              <Text style={s.descCardText}>{profile.summary}</Text>
            </View>
            <View style={s.descCard}>
              <Text style={s.descCardTitle}>主要优势</Text>
              <Text style={s.descCardText}>{profile.strengths}</Text>
            </View>
            <View style={s.descCard}>
              <Text style={s.descCardTitle}>适合场景</Text>
              <Text style={s.descCardText}>{profile.roles}</Text>
            </View>
          </View>
          <View style={s.adviceCard}>
            <Text style={s.descCardTitle}>沟通建议</Text>
            <Text style={s.descCardText}>{profile.advice}</Text>
          </View>
        </>
      )}

      <Text style={s.sectionLabel}>维度得分</Text>
      <View style={s.scoreList}>
        {test.typeOrder.map((type: string) => {
          const item = test.profiles[type];
          const itemLabel = test.typeLabels[type];
          const width = maxScore === 0 ? 0 : Math.round((actualScores[type] / maxScore) * 100);
          const color = item?.color || '#6f8372';

          return (
            <View style={s.scoreCard} key={type}>
              <Text style={s.scoreCardLabel}>{itemLabel}</Text>
              <Text style={[s.scoreCardValue, { color }]}>{actualScores[type]}</Text>
              {item?.tagline && <Text style={s.scoreCardTagline}>{item.tagline}</Text>}
              <View style={s.scoreBar}>
                <View style={[s.scoreBarFill, { width: `${width}%`, backgroundColor: color }]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function WuxingFormResultView({ result, test }: { result: any; test: any }) {
  const wuxingColors: Record<string, string> = {
    mu: '#5b7c6b',
    huo: '#a05a4c',
    tu: '#b58920',
    jin: '#8a846a',
    shui: '#405870',
  };
  const { bazi, scores, yongShen, analysis } = result;

  const ganZhiList = [
    { title: '年柱', gan: bazi.yearGan, zhi: bazi.yearZhi },
    { title: '月柱', gan: bazi.monthGan, zhi: bazi.monthZhi },
    { title: '日柱', gan: bazi.dayGan, zhi: bazi.dayZhi, highlight: true },
    { title: '时柱', gan: bazi.hourGan, zhi: bazi.hourZhi },
  ];

  const sortedScores = [...test.typeOrder]
    .map((key: string) => ({ key, label: test.typeLabels[key], score: scores[key] }))
    .sort((a: any, b: any) => b.score - a.score);

  return (
    <ScrollView style={s.scroll}>
      <View style={s.wuxingReport}>
        {/* Summary */}
        <View style={s.wuxingSection}>
          <Text style={s.wuxingSectionTitle}>总结</Text>
          <Text style={s.wuxingSectionText}>{analysis.fullSummary}</Text>
        </View>

        {/* Hero */}
        <View style={s.wuxingHero}>
          <Text style={s.eyebrow}>Structured Five Elements Reading</Text>
          <Text style={s.h1}>{analysis.summaryTitle}</Text>
          <Text style={s.wuxingLead}>{analysis.summaryText}</Text>

          <View style={s.overviewGrid}>
            <View style={s.overviewCard}>
              <Text style={s.overviewLabel}>日主</Text>
              <Text style={[s.overviewValue, { color: wuxingColors[bazi.dayMasterElement] || '#6f8372' }]}>
                {bazi.dayGan}
              </Text>
              <Text style={s.overviewSub}>{test.typeLabels[bazi.dayMasterElement]}日主</Text>
            </View>
            <View style={s.overviewCard}>
              <Text style={s.overviewLabel}>生肖</Text>
              <Text style={[s.overviewValue, { color: '#4b5563' }]}>{bazi.zodiac}</Text>
              <Text style={s.overviewSub}>{bazi.gender === 'male' ? '男' : '女'}</Text>
            </View>
            <View style={s.overviewCard}>
              <Text style={s.overviewLabel}>最旺五行</Text>
              <Text style={[s.overviewValue, { color: wuxingColors[yongShen.strongest] || '#6f8372' }]}>
                {test.typeLabels[yongShen.strongest]}
              </Text>
              <Text style={s.overviewSub}>当前显性优势</Text>
            </View>
            <View style={s.overviewCard}>
              <Text style={s.overviewLabel}>喜用五行</Text>
              <Text style={[s.overviewValue, { color: wuxingColors[analysis.supportingElement.key] || '#6f8372' }]}>
                {analysis.supportingElement.label}
              </Text>
              <Text style={s.overviewSub}>建议重点补强</Text>
            </View>
          </View>

          <Text style={s.metaStrip}>
            出生 {bazi.solar.year}-{bazi.solar.month}-{bazi.solar.day}  {bazi.hour}
          </Text>
        </View>

        {/* Bazi pillars */}
        <View style={s.wuxingSection}>
          <Text style={s.wuxingSectionTitle}>八字排盘</Text>
          <Text style={s.wuxingSectionDesc}>四柱是本次五行能量解读的排盘依据</Text>
          <View style={s.ganzhiGrid}>
            {ganZhiList.map((item, idx) => (
              <View key={idx} style={[s.pillarCard, item.highlight && s.pillarHighlight]}>
                <Text style={s.pillarTitle}>{item.title}</Text>
                <Text style={[s.pillarGan, { color: wuxingColors[result.scores] || '#6f8372' }]}>
                  {item.gan}{item.zhi}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Energy distribution */}
        <View style={s.wuxingSection}>
          <Text style={s.wuxingSectionTitle}>五行能量分布</Text>
          <Text style={s.wuxingSectionDesc}>{analysis.distributionText}</Text>
          {test.typeOrder.map((key: string) => {
            const label = test.typeLabels[key];
            const score = scores[key];
            const percent = (score / 8) * 100;
            const color = wuxingColors[key] || '#6f8372';

            return (
              <View style={s.energyBar} key={key}>
                <View style={s.energyBarLabel}>
                  <Text style={[s.energyBarText, { color }]}>{label}</Text>
                  <Text style={[s.energyBarScore, { color }]}>{score.toFixed(1)}</Text>
                </View>
                <View style={s.energyBarTrack}>
                  <View style={[s.energyBarFill, { width: `${percent}%`, backgroundColor: color }]} />
                </View>
              </View>
            );
          })}

          <View style={s.rankingList}>
            {sortedScores.map((item: any, index: number) => (
              <View style={s.rankingItem} key={item.key}>
                <Text style={s.rankingIndex}>{String(index + 1).padStart(2, '0')}</Text>
                <Text style={[s.rankingLabel, { color: wuxingColors[item.key] || '#6f8372' }]}>
                  {item.label}
                </Text>
                <Text style={s.rankingScore}>{item.score.toFixed(1)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Analysis */}
        <View style={s.wuxingSection}>
          <Text style={s.wuxingSectionTitle}>命局解读</Text>
          {[analysis.dayMasterTraits, analysis.energyPattern, analysis.workStyle].map(
            (item: any, i: number) => (
              <View style={s.analysisCard} key={i}>
                <Text style={s.analysisCardTitle}>{item.title}</Text>
                <Text style={s.analysisCardText}>{item.text}</Text>
              </View>
            ),
          )}
        </View>

        {/* Supporting direction */}
        <View style={s.wuxingSection}>
          <Text style={s.wuxingSectionTitle}>喜用方向</Text>
          <Text style={s.wuxingSectionDesc}>
            你的喜用五行是{' '}
            <Text style={{ color: wuxingColors[analysis.supportingElement.key], fontWeight: '700' }}>
              {analysis.supportingElement.label}
            </Text>
            ，当前偏旺方向是{' '}
            <Text style={{ color: wuxingColors[analysis.cautionElement.key], fontWeight: '700' }}>
              {analysis.cautionElement.label}
            </Text>
            。
          </Text>
          <View style={s.supportBanner}>
            <View style={s.supportBannerItem}>
              <Text style={s.supportBannerTitle}>补强重点</Text>
              <Text style={s.supportBannerText}>
                把生活和行动慢慢调向{analysis.supportingElement.label}的节奏，会更有助于整体平衡。
              </Text>
            </View>
            <View style={s.supportBannerItem}>
              <Text style={s.supportBannerTitle}>避免走偏</Text>
              <Text style={s.supportBannerText}>{analysis.cautionElement.text}</Text>
            </View>
          </View>
          {analysis.supportingElement.recommendations.map((item: any, i: number) => (
            <View style={s.guidanceCard} key={i}>
              <Text style={s.analysisCardTitle}>{item.title}</Text>
              <Text style={s.analysisCardText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Life guidance */}
        <View style={s.wuxingSection}>
          <Text style={s.wuxingSectionTitle}>发展建议</Text>
          {analysis.lifeGuidance?.map((item: any, i: number) => (
            <View style={s.guidanceCard} key={i}>
              <Text style={s.analysisCardTitle}>{item.title}</Text>
              <Text style={s.analysisCardText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Dayun */}
        {result.dayun && (
          <View style={s.wuxingSection}>
            <Text style={s.wuxingSectionTitle}>大运参考</Text>
            <Text style={s.wuxingSectionDesc}>{analysis.dayunSummary}</Text>
            {result.dayun.map((item: any, i: number) => (
              <View key={i} style={[s.dayunItem, i === 0 && s.dayunCurrent]}>
                <Text style={s.dayunAge}>{item.age}岁起</Text>
                <Text style={[s.dayunGanzhi, { color: '#4b5563' }]}>{item.ganZhi}</Text>
                <Text style={s.dayunYear}>{item.startYear}年开始</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={s.disclaimer}>本测试基于传统八字理论的简化五行模型，仅供娱乐与文化体验参考。</Text>
      </View>
    </ScrollView>
  );
}

export default function AssessmentTestScreen({ route, navigation }: Props) {
  const { testId } = route.params;
  const test = getLiveTest(testId);
  if (!test) {
    navigation.replace('Assessments');
    return null;
  }

  const questions = (test as any).questions || [];
  const hasForm = (test as any).hasForm || false;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => new Array(questions.length).fill(null));
  const [scores, setScores] = useState<any>(null);
  const [birthInfo, setBirthInfo] = useState({
    year: new Date().getFullYear() - 20,
    month: 1,
    day: 1,
    hour: 11,
    minute: 0,
    gender: null as 'male' | 'female' | null,
  });

  if (!test) {
    navigation.replace('Assessments');
    return null;
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: test.title,
      headerBackTitle: '返回',
    });
  }, [navigation, test.title]);

  const question = questions[currentIndex] || null;
  const selectedType = answers[currentIndex];
  const isLastQuestion = questions.length ? currentIndex === questions.length - 1 : false;
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  function selectAnswer(type: string) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = type;
      return next;
    });
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
      }, 180);
    }
  }

  function goNext() {
    if (!selectedType) {
      Alert.alert('提示', '请先选择一个答案。');
      return;
    }
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  }

  function submit() {
    const unansweredIndex = answers.findIndex((a) => !a);
    if (unansweredIndex !== -1) {
      setCurrentIndex(unansweredIndex);
      Alert.alert('提示', `还有${unansweredIndex + 1}题未作答，请完成后查看结果。`);
      return;
    }
    setScores((test as any).calculateScores(answers));
  }

  function restart() {
    setCurrentIndex(0);
    setAnswers(new Array(questions.length).fill(null));
    setScores(null);
  }

  function handleFormSubmit() {
    if (!birthInfo.gender) {
      Alert.alert('提示', '请选择性别。');
      return;
    }
    const result = (test as any).calculateScores(birthInfo);
    setScores(result);
  }

  function restartForm() {
    setBirthInfo({
      year: new Date().getFullYear() - 20,
      month: 1,
      day: 1,
      hour: 11,
      minute: 0,
      gender: null,
    });
    setScores(null);
  }

  if (scores) {
    return (
      <ScrollView style={s.scroll} contentContainerStyle={s.resultContent}>
        {hasForm ? (
          <WuxingFormResultView result={scores} test={test} />
        ) : (
          <QuizResultView test={test} scores={scores} />
        )}
        <Pressable style={s.restartBtn} onPress={hasForm ? restartForm : restart}>
          <Text style={s.restartBtnText}>{hasForm ? '重新测算' : '重新测试'}</Text>
        </Pressable>
      </ScrollView>
    );
  }

  if (hasForm) {
    const daysCount = getDaysInMonth(birthInfo.year, birthInfo.month);
    const safeDay = Math.min(birthInfo.day, daysCount);

    return (
      <ScrollView style={s.scroll} contentContainerStyle={s.formContent}>
        <Text style={s.eyebrow}>{test.eyebrow}</Text>
        <Text style={s.h1}>{test.title}</Text>
        <Text style={s.lead}>{test.description}</Text>
        <Text style={s.note}>请正确填写出生公历时间，系统将为你排盘计算八字五行能量分布。</Text>

        <View style={s.formGroup}>
          <Text style={s.formLabel}>年份</Text>
          <View style={s.pickerRow}>
            {[birthInfo.year - 1, birthInfo.year, birthInfo.year + 1].map((y) => (
              <Pressable
                key={y}
                style={[s.pickerBtn, birthInfo.year === y && s.pickerBtnActive]}
                onPress={() => setBirthInfo((p) => ({ ...p, year: y }))}
              >
                <Text style={[s.pickerBtnText, birthInfo.year === y && s.pickerBtnTextActive]}>
                  {y}年
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={s.formGroup}>
          <Text style={s.formLabel}>月份</Text>
          <View style={s.pickerRow}>
            {generateMonthOptions().map((m) => (
              <Pressable
                key={m}
                style={[s.pickerBtn, birthInfo.month === m && s.pickerBtnActive]}
                onPress={() => setBirthInfo((p) => ({ ...p, month: m, day: Math.min(p.day, getDaysInMonth(p.year, m)) }))}
              >
                <Text style={[s.pickerBtnText, birthInfo.month === m && s.pickerBtnTextActive]}>
                  {m}月
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={s.formGroup}>
          <Text style={s.formLabel}>日期</Text>
          <View style={s.pickerRow}>
            {Array.from({ length: daysCount }, (_, i) => i + 1)
              .slice(Math.max(0, safeDay - 3), Math.min(daysCount, safeDay + 4))
              .map((d) => (
                <Pressable
                  key={d}
                  style={[s.pickerBtn, birthInfo.day === d && s.pickerBtnActive]}
                  onPress={() => setBirthInfo((p) => ({ ...p, day: d }))}
                >
                  <Text style={[s.pickerBtnText, birthInfo.day === d && s.pickerBtnTextActive]}>
                    {d}日
                  </Text>
                </Pressable>
              ))}
          </View>
        </View>

        <View style={s.formGroup}>
          <Text style={s.formLabel}>时辰</Text>
          <View style={s.shichGrid}>
            {SHI_CHEN.slice(0, 6).map((item) => (
              <Pressable
                key={item.value}
                style={[s.shichBtn, birthInfo.hour === item.value && s.shichBtnActive]}
                onPress={() => setBirthInfo((p) => ({ ...p, hour: item.value, minute: 0 }))}
              >
                <Text style={[s.shichBtnText, birthInfo.hour === item.value && s.shichBtnTextActive]}>
                  {item.label.slice(0, 2)}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={s.shichGrid}>
            {SHI_CHEN.slice(6).map((item) => (
              <Pressable
                key={item.value}
                style={[s.shichBtn, birthInfo.hour === item.value && s.shichBtnActive]}
                onPress={() => setBirthInfo((p) => ({ ...p, hour: item.value, minute: 0 }))}
              >
                <Text style={[s.shichBtnText, birthInfo.hour === item.value && s.shichBtnTextActive]}>
                  {item.label.slice(0, 2)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={s.formGroup}>
          <Text style={s.formLabel}>性别</Text>
          <View style={s.genderRow}>
            <Pressable
              style={[s.genderBtn, birthInfo.gender === 'male' && s.genderBtnActive]}
              onPress={() => setBirthInfo((p) => ({ ...p, gender: 'male' }))}
            >
              <Text style={[s.genderBtnText, birthInfo.gender === 'male' && s.genderBtnTextActive]}>男</Text>
            </Pressable>
            <Pressable
              style={[s.genderBtn, birthInfo.gender === 'female' && s.genderBtnActive]}
              onPress={() => setBirthInfo((p) => ({ ...p, gender: 'female' }))}
            >
              <Text style={[s.genderBtnText, birthInfo.gender === 'female' && s.genderBtnTextActive]}>女</Text>
            </Pressable>
          </View>
        </View>

        <View style={s.formNav}>
          <Pressable style={s.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={s.secondaryBtnText}>返回主页</Text>
          </Pressable>
          <Pressable style={s.primaryBtn} onPress={handleFormSubmit}>
            <Text style={s.primaryBtnText}>开始测算</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={s.container}>
      <View style={s.progressBar}>
        <View style={[s.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={s.progressText}>
        第 {currentIndex + 1}/{questions.length} 题
      </Text>

      <ScrollView style={s.scroll} contentContainerStyle={s.quizContent}>
        <Text style={s.eyebrow}>{test.eyebrow}</Text>
        <Text style={s.h1}>{test.title}</Text>
        <Text style={s.lead}>{test.description}</Text>
        <Text style={s.note}>
          {'\uD83D\uDCA1'} 小贴士：约{test.duration}，共{test.questionCount}题，请选择最接近当下真实状态的选项。结果没有对错，只是帮你更了解自己。
        </Text>

        {question && (
          <View style={s.questionCard}>
            <Text style={s.questionTitle}>{question.text}</Text>
            <View style={s.optionsList}>
              {question.options.map((option: any, index: number) => {
                const answerValue = option.type ?? option;
                const isSelected = selectedType === answerValue;
                return (
                  <Pressable
                    key={index}
                    style={[s.optionItem, isSelected && s.optionSelected]}
                    onPress={() => selectAnswer(answerValue)}
                  >
                    <Text style={[s.optionLetter, isSelected && s.optionLetterSelected]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                    <Text style={[s.optionText, isSelected && s.optionTextSelected]}>
                      {option.text}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={s.nav}>
        <Pressable
          style={[s.secondaryBtn, currentIndex === 0 && s.btnDisabled]}
          disabled={currentIndex === 0}
          onPress={() => setCurrentIndex((i) => i - 1)}
        >
          <Text style={s.secondaryBtnText}>上一题</Text>
        </Pressable>
        {!isLastQuestion ? (
          <Pressable style={s.primaryBtn} onPress={goNext}>
            <Text style={s.primaryBtnText}>下一题</Text>
          </Pressable>
        ) : (
          <Pressable style={s.primaryBtn} onPress={submit}>
            <Text style={s.primaryBtnText}>查看结果</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffaf1' },
  scroll: { flex: 1 },
  quizContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 80 },
  resultContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  formContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  eyebrow: { fontSize: 12, fontWeight: '800', color: '#4f7d6d', letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' },
  h1: { fontSize: 24, fontWeight: '700', color: '#2f2b26', marginBottom: 12 },
  lead: { fontSize: 15, color: '#756f66', lineHeight: 22, marginBottom: 10 },
  note: { fontSize: 13, color: '#4f7d6d', backgroundColor: 'rgba(127,166,144,0.13)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 20 },
  progressBar: { height: 4, backgroundColor: '#dfcfb8', marginHorizontal: 16, marginTop: 12, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: '#78a18f', borderRadius: 2 },
  progressText: { textAlign: 'center', fontSize: 13, color: '#a09587', marginVertical: 8 },
  questionCard: { backgroundColor: '#fffefb', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#efe4d3', marginBottom: 16 },
  questionTitle: { fontSize: 17, fontWeight: '600', color: '#2f2b26', lineHeight: 26 },
  optionsList: { marginTop: 16 },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fffefb',
    borderWidth: 1,
    borderColor: '#efe4d3',
    marginBottom: 10,
  },
  optionSelected: { borderColor: '#78a18f', backgroundColor: '#f0f7f4' },
  optionLetter: { fontSize: 15, fontWeight: '700', color: '#a09587', marginRight: 12, minWidth: 20 },
  optionLetterSelected: { color: '#4f7d6d' },
  optionText: { fontSize: 14, color: '#756f66', flex: 1 },
  optionTextSelected: { color: '#2f2b26', fontWeight: '600' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fffefb', borderTopWidth: 1, borderTopColor: '#efe4d3', gap: 12 },
  primaryBtn: { flex: 1, backgroundColor: '#78a18f', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  secondaryBtn: { flex: 1, backgroundColor: '#fffefb', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#dfcfb8' },
  secondaryBtnText: { color: '#756f66', fontSize: 15, fontWeight: '600' },
  btnDisabled: { opacity: 0.4 },
  restartBtn: { backgroundColor: '#78a18f', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 20 },
  restartBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  // Quiz Result
  resultSummary: { backgroundColor: '#fffefb', borderRadius: 18, padding: 24, borderWidth: 1, borderColor: '#efe4d3', alignItems: 'center', marginBottom: 16 },
  typeIcon: { fontSize: 40, marginBottom: 8 },
  typeMarker: { width: 40, height: 40, borderRadius: 20, color: '#fff', textAlign: 'center', lineHeight: 40, fontSize: 18, fontWeight: '700', marginBottom: 8, overflow: 'hidden' },
  profileTitle: { fontSize: 20, fontWeight: '700', color: '#2f2b26', marginBottom: 4 },
  profileTagline: { fontSize: 14, color: '#756f66', textAlign: 'center', marginBottom: 8 },
  disclaimer: { fontSize: 11, color: '#a09587', textAlign: 'center', lineHeight: 16 },
  descGrid: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  descGridThree: { gap: 10, marginBottom: 16 },
  descCard: { flex: 1, backgroundColor: '#fffefb', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#efe4d3' },
  descCardTitle: { fontSize: 14, fontWeight: '700', color: '#4f7d6d', marginBottom: 8 },
  descCardText: { fontSize: 13, color: '#756f66', lineHeight: 20 },
  adviceCard: { backgroundColor: '#f8eedf', borderRadius: 14, padding: 16, marginBottom: 16 },
  sectionLabel: { fontSize: 15, fontWeight: '700', color: '#2f2b26', marginBottom: 12 },
  scoreList: { gap: 12, marginBottom: 16 },
  scoreCard: { backgroundColor: '#fffefb', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#efe4d3' },
  scoreCardLabel: { fontSize: 14, fontWeight: '600', color: '#2f2b26', marginBottom: 4 },
  scoreCardValue: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  scoreCardTagline: { fontSize: 12, color: '#a09587', marginBottom: 8 },
  scoreBar: { height: 8, backgroundColor: '#f8eedf', borderRadius: 4 },
  scoreBarFill: { height: 8, borderRadius: 4 },

  // Form items
  formGroup: { marginBottom: 20 },
  formLabel: { fontSize: 14, fontWeight: '600', color: '#2f2b26', marginBottom: 8 },
  pickerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pickerBtn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, backgroundColor: '#fffefb', borderWidth: 1, borderColor: '#efe4d3' },
  pickerBtnActive: { backgroundColor: '#78a18f', borderColor: '#78a18f' },
  pickerBtnText: { fontSize: 13, color: '#756f66' },
  pickerBtnTextActive: { color: '#fff', fontWeight: '600' },
  shichGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  shichBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#fffefb', borderWidth: 1, borderColor: '#efe4d3' },
  shichBtnActive: { backgroundColor: '#78a18f', borderColor: '#78a18f' },
  shichBtnText: { fontSize: 12, color: '#756f66' },
  shichBtnTextActive: { color: '#fff', fontWeight: '600' },
  genderRow: { flexDirection: 'row', gap: 12 },
  genderBtn: { flex: 1, paddingVertical: 14, borderRadius: 10, backgroundColor: '#fffefb', borderWidth: 1, borderColor: '#efe4d3', alignItems: 'center' },
  genderBtnActive: { backgroundColor: '#78a18f', borderColor: '#78a18f' },
  genderBtnText: { fontSize: 15, color: '#756f66', fontWeight: '600' },
  genderBtnTextActive: { color: '#fff' },
  formNav: { flexDirection: 'row', gap: 12, marginTop: 8 },

  // Wuxing result styles
  wuxingReport: { paddingBottom: 40 },
  wuxingSection: { marginBottom: 24 },
  wuxingSectionTitle: { fontSize: 18, fontWeight: '700', color: '#2f2b26', marginBottom: 6 },
  wuxingSectionDesc: { fontSize: 13, color: '#756f66', lineHeight: 20, marginBottom: 12 },
  wuxingSectionText: { fontSize: 14, color: '#756f66', lineHeight: 22 },
  wuxingHero: { backgroundColor: '#fffefb', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#efe4d3', marginBottom: 20 },
  wuxingLead: { fontSize: 14, color: '#756f66', lineHeight: 22, marginBottom: 16 },
  overviewGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  overviewCard: { width: '46%', backgroundColor: '#f8eedf', borderRadius: 12, padding: 14, alignItems: 'center' },
  overviewLabel: { fontSize: 11, color: '#a09587', marginBottom: 4 },
  overviewValue: { fontSize: 24, fontWeight: '700' },
  overviewSub: { fontSize: 11, color: '#756f66', marginTop: 2 },
  metaStrip: { fontSize: 12, color: '#a09587', textAlign: 'center' },
  ganzhiGrid: { flexDirection: 'row', gap: 10 },
  pillarCard: { flex: 1, backgroundColor: '#fffefb', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#efe4d3', alignItems: 'center' },
  pillarHighlight: { borderColor: '#78a18f', backgroundColor: '#f0f7f4' },
  pillarTitle: { fontSize: 12, color: '#a09587', marginBottom: 6 },
  pillarGan: { fontSize: 16, fontWeight: '700' },
  energyBar: { marginBottom: 10 },
  energyBarLabel: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  energyBarText: { fontSize: 13, fontWeight: '600' },
  energyBarScore: { fontSize: 13, fontWeight: '700' },
  energyBarTrack: { height: 8, backgroundColor: '#f8eedf', borderRadius: 4 },
  energyBarFill: { height: 8, borderRadius: 4 },
  rankingList: { marginTop: 12, gap: 6 },
  rankingItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rankingIndex: { fontSize: 13, fontWeight: '700', color: '#a09587', minWidth: 24 },
  rankingLabel: { fontSize: 13, fontWeight: '600', flex: 1 },
  rankingScore: { fontSize: 14, fontWeight: '700', color: '#2f2b26' },
  analysisCard: { backgroundColor: '#fffefb', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#efe4d3', marginBottom: 10 },
  analysisCardTitle: { fontSize: 14, fontWeight: '700', color: '#4f7d6d', marginBottom: 8 },
  analysisCardText: { fontSize: 13, color: '#756f66', lineHeight: 20 },
  supportBanner: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  supportBannerItem: { flex: 1, backgroundColor: '#f8eedf', borderRadius: 12, padding: 14 },
  supportBannerTitle: { fontSize: 14, fontWeight: '700', color: '#4f7d6d', marginBottom: 4 },
  supportBannerText: { fontSize: 12, color: '#756f66', lineHeight: 18 },
  guidanceCard: { backgroundColor: '#fffefb', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#efe4d3', marginBottom: 8 },
  dayunItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 10, marginBottom: 6, backgroundColor: '#fffefb', borderWidth: 1, borderColor: '#efe4d3' },
  dayunCurrent: { backgroundColor: '#f0f7f4', borderColor: '#78a18f' },
  dayunAge: { fontSize: 13, color: '#a09587' },
  dayunGanzhi: { fontSize: 15, fontWeight: '700' },
  dayunYear: { fontSize: 12, color: '#a09587' },
});
