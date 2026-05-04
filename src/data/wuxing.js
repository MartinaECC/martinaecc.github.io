import { Lunar, Solar } from 'lunar-javascript';

export const wuxingColors = {
  mu: '#5b7c6b',
  huo: '#a05a4c',
  tu: '#b58920',
  jin: '#8a846a',
  shui: '#405870'
};

export const wuxingLabels = {
  jin: '金',
  mu: '木',
  shui: '水',
  huo: '火',
  tu: '土'
};

export const typeOrder = ['jin', 'mu', 'shui', 'huo', 'tu'];

// 干支五行对照表
const ganWuxingMap = {
  '甲': 'mu', '乙': 'mu',
  '丙': 'huo', '丁': 'huo',
  '戊': 'tu', '己': 'tu',
  '庚': 'jin', '辛': 'jin',
  '壬': 'shui', '癸': 'shui'
};

const zhiWuxingMap = {
  '子': 'shui', '丑': 'tu', '寅': 'mu', '卯': 'mu',
  '辰': 'tu', '巳': 'huo', '午': 'huo', '未': 'tu',
  '申': 'jin', '酉': 'jin', '戌': 'tu', '亥': 'shui'
};

// 天干+地支获取对应五行
export function getGanWuxing(gan) {
  return ganWuxingMap[gan];
}

export function getZhiWuxing(zhi) {
  return zhiWuxingMap[zhi];
}

// 计算五行分数
function calculateFiveElements(bazi) {
  const scores = { jin: 0, mu: 0, shui: 0, huo: 0, tu: 0 };
  const { yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, hourGan, hourZhi } = bazi;
  
  // 天干分数1.0，地支分数1.0，简化计算
  scores[ganWuxingMap[yearGan]] += 1.0;
  scores[zhiWuxingMap[yearZhi]] += 1.0;
  scores[ganWuxingMap[monthGan]] += 1.0;
  scores[zhiWuxingMap[monthZhi]] += 1.0;
  scores[ganWuxingMap[dayGan]] += 1.0;
  scores[zhiWuxingMap[dayZhi]] += 1.0;
  scores[ganWuxingMap[hourGan]] += 1.0;
  scores[zhiWuxingMap[hourZhi]] += 1.0;
  
  return scores;
}

// 判断五行喜用 (简化算法：补弱为喜用)
function determineYongShen(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const weakest = sorted[sorted.length - 1];
  const strongest = sorted[0];
  
  return {
    strongest: strongest[0],
    strongestScore: strongest[1],
    weakest: weakest[0],
    weakestScore: weakest[1],
    xiYong: [weakest[0]],
    ji: [strongest[0]]
  };
}

// 计算函数，供TestPage调用
export function calculateScores(birthInfo) {
  const { year, month, day, hour, minute, gender } = birthInfo;
  const solar = Solar.fromYmdHms(year, month, day, hour, minute);
  const lunar = Lunar.fromSolar(solar);
  const eightChar = lunar.getEightChar();
  
  const bazi = {
    year: eightChar.getYearGan() + eightChar.getYearZhi(),
    month: eightChar.getMonthGan() + eightChar.getMonthZhi(),
    day: eightChar.getDayGan() + eightChar.getDayZhi(),
    hour: eightChar.getHourGan() + eightChar.getHourZhi(),
    yearGan: eightChar.getYearGan(),
    yearZhi: eightChar.getYearZhi(),
    monthGan: eightChar.getMonthGan(),
    monthZhi: eightChar.getMonthZhi(),
    dayGan: eightChar.getDayGan(),
    dayZhi: eightChar.getDayZhi(),
    hourGan: eightChar.getHourGan(),
    hourZhi: eightChar.getHourZhi(),
    zodiac: lunar.getZodiac(),
    solar: { year, month, day, hour, minute },
    gender
  };
  
  const scores = calculateFiveElements(bazi);
  const yongShen = determineYongShen(scores);
  const dayun = eightChar.getDaYun(gender === 'male');
  
  return {
    bazi,
    scores,
    yongShen,
    dayun: dayun.slice(0, 5).map(d => ({
      age: d.getStartAge(),
      ganZhi: d.getGanZhi(),
      startYear: d.getStartYear()
    }))
  };
}

// 测试描述元数据
export const wuxingTest = {
  id: 'wuxing',
  title: '五行能量测试',
  eyebrow: 'Bazi Five Elements',
  description: '输入出生时间，测算你的八字格局与五行能量分布，找到五行喜用方向。',
  duration: '1分钟',
  questionCount: 0,
  hasForm: true,
  typeOrder,
  typeLabels: wuxingLabels,
  calculateScores
};