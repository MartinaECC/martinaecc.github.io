import { Lunar, Solar } from "lunar-javascript";
import { getGanWuxing, getZhiWuxing, wuxingLabels } from "./wuxing.js";

export const DAILY_FORTUNE_PROFILE_KEY = "dailyFortuneProfile:v1";

export const fortuneCategories = [
  { key: "overall", label: "总运势" },
  { key: "career", label: "事业" },
  { key: "health", label: "健康" },
  { key: "love", label: "情感" },
  { key: "family", label: "家庭" }
];

const shichenHours = [23, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];

const zodiacSigns = [
  { key: "aries", label: "白羊座", start: [3, 21], end: [4, 19], element: "火" },
  { key: "taurus", label: "金牛座", start: [4, 20], end: [5, 20], element: "土" },
  { key: "gemini", label: "双子座", start: [5, 21], end: [6, 21], element: "风" },
  { key: "cancer", label: "巨蟹座", start: [6, 22], end: [7, 22], element: "水" },
  { key: "leo", label: "狮子座", start: [7, 23], end: [8, 22], element: "火" },
  { key: "virgo", label: "处女座", start: [8, 23], end: [9, 22], element: "土" },
  { key: "libra", label: "天秤座", start: [9, 23], end: [10, 23], element: "风" },
  { key: "scorpio", label: "天蝎座", start: [10, 24], end: [11, 22], element: "水" },
  { key: "sagittarius", label: "射手座", start: [11, 23], end: [12, 21], element: "火" },
  { key: "capricorn", label: "摩羯座", start: [12, 22], end: [1, 19], element: "土" },
  { key: "aquarius", label: "水瓶座", start: [1, 20], end: [2, 18], element: "风" },
  { key: "pisces", label: "双鱼座", start: [2, 19], end: [3, 20], element: "水" }
];

const keywordBank = {
  overall: [
    ["稳中求进", "贵人相助", "顺势而为"],
    ["灵感充沛", "大胆尝试", "突破边界"],
    ["保持耐心", "厚积薄发", "不宜冒进"],
    ["人际关系活跃", "信息通畅", "多听少说"],
    ["能量充足", "积极行动", "事半功倍"],
    ["情绪波动", "保持平稳", "减少决策"]
  ],
  career: [
    ["思路清晰", "合作顺畅", "方案落地"],
    ["抓住机会", "主动争取", "展现才华"],
    ["细节决定成败", "复盘梳理", "查漏补缺"],
    ["贵人提携", "资源到位", "推进重要项目"],
    ["静心沉淀", "储备能力", "等待时机"],
    ["避免争执", "低调沟通", "维持关系"]
  ],
  health: [
    ["作息规律", "饮食清淡", "保持运动"],
    ["注意休息", "避免熬夜", "养护肠胃"],
    ["精力充沛", "适合运动", "舒展身体"],
    ["情绪养护", "减少焦虑", "深呼吸放松"],
    ["颈椎保养", "坐姿调整", "多走动"],
    ["温差变化", "注意增减衣物"]
  ],
  love: [
    ["浪漫加分", "沟通走心", "增进理解"],
    ["勇敢表达", "机会出现", "打破僵局"],
    ["给彼此空间", "不逼太紧", "顺其自然"],
    ["小惊喜加分", "创造浪漫", "升温关系"],
    ["倾听更重要", "少讲道理", "多共情"],
    ["稳定平淡", "安排约会", "重新激活"]
  ],
  family: [
    ["团圆温馨", "话题顺畅", "共渡时光"],
    ["长辈提点", "听取建议", "保持尊重"],
    ["家务整理", "环境焕新", "提升气场"],
    ["少点争论", "多点包容", "家和万事兴"],
    ["家庭计划", "一起出行", "增进感情"],
    ["各自安好", "减少干涉", "保持边界"]
  ]
};

const adviceBank = {
  overall: [
    '今天适合推进已经准备充分的事项，不建议开启全新冒险。',
    '你状态比想象中好，放开手去做你想做的那件事。',
    '慢下来比急着赶路更重要，让子弹飞一会儿。',
    '多和积极的人聊天，他们会给你带来新的灵感。',
    '把最重要的一件事放在上午完成，下午会顺畅很多。',
    '今天适合复盘，不适合强行推进新计划。'
  ],
  career: [
    '主动对接同事，信息差会帮你节省不少时间。',
    '把难啃的任务拆解成小步，第一步只要五分钟。',
    '今天适合展示你的成果，不用担心被埋没。',
    '遇到分歧保持中立，先听完各方意见再说话。',
    '把重要决策放到明天，今天收集信息就好。',
    '适合学习新技能，入门比你想象中简单。'
  ],
  health: [
    '喝够八杯水，比你想的更重要。',
    '早点放下手机睡觉，睡好一半顶三样。',
    '户外走20分钟，比闷在屋里更能恢复精力。',
    '今天适合轻断食，让肠胃休息一下。',
    '不舒服就停下来，硬扛不是美德。',
    '肩颈拉伸安排一下，别攒着问题。'
  ].filter(Boolean),
  love: [
    '主动发个消息，关系会向你想要的方向走。',
    '不要猜对方想什么，直接问比猜测更省力气。',
    '今天适合安排两个人都舒服的约会，不用刻意安排。',
    '给对方一点空间，也给自己一点空间。',
    '放下过去的情绪，今天是新的一天。',
    '赞美对方具体的行为，比笼统的夸奖更暖。'
  ],
  family: [
    '回家说句暖心话，比带着情绪进门好很多。',
    '一起做顿饭，家务分工本身就是增进感情。',
    '尊重家人的选择，不用非要说服谁。',
    '安排一次家庭小散步，聊聊闲话比聊正事好。',
    '家里整理整理，环境顺了心情就顺了。',
    '少问为什么，多问“要不要一起喝杯茶”。'
  ].filter(Boolean)
};

const cautionBank = [
  "决策放缓，别在情绪上头时做决定。",
  "少刷手机，避免信息过载消耗精力。",
  "财务保守，不冲动做非理性消费。",
  "开车走路都慢一点，注意安全。",
  "少争辩，赢了道理输了情绪不值当。",
  "别把工作情绪带回家，分开处理更清爽。"
];

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededNumber(seed, min, max) {
  return min + (seed % (max - min + 1));
}

function pickRandom(seed, array) {
  const index = seededNumber(seed, 0, array.length - 1);
  return array[index];
}

function normalizeHourToShichen(hour) {
  const numericHour = Number.isFinite(hour) ? hour : 11;

  if (numericHour === 23 || numericHour === 0) return 23;
  if (numericHour >= 1 && numericHour <= 2) return 1;
  if (numericHour >= 3 && numericHour <= 4) return 3;
  if (numericHour >= 5 && numericHour <= 6) return 5;
  if (numericHour >= 7 && numericHour <= 8) return 7;
  if (numericHour >= 9 && numericHour <= 10) return 9;
  if (numericHour >= 11 && numericHour <= 12) return 11;
  if (numericHour >= 13 && numericHour <= 14) return 13;
  if (numericHour >= 15 && numericHour <= 16) return 15;
  if (numericHour >= 17 && numericHour <= 18) return 17;
  if (numericHour >= 19 && numericHour <= 20) return 19;
  if (numericHour >= 21 && numericHour <= 22) return 21;

  return 11;
}

function normalizeDailyFortuneProfile(profile) {
  if (!profile) return null;

  return {
    ...profile,
    year: Number.parseInt(profile.year, 10),
    month: Number.parseInt(profile.month, 10),
    day: Number.parseInt(profile.day, 10),
    hour: normalizeHourToShichen(Number.parseInt(profile.hour, 10)),
    minute: 0,
    gender: profile.gender || null
  };
}

function calculateUserElementPreference(eightChar) {
  const scores = { jin: 0, mu: 0, shui: 0, huo: 0, tu: 0 };
  const pillars = [
    [eightChar.getYearGan(), eightChar.getYearZhi()],
    [eightChar.getMonthGan(), eightChar.getMonthZhi()],
    [eightChar.getDayGan(), eightChar.getDayZhi()],
    [eightChar.getTimeGan(), eightChar.getTimeZhi()]
  ];

  pillars.forEach(([gan, zhi]) => {
    scores[getGanWuxing(gan)] += 1;
    scores[getZhiWuxing(zhi)] += 1;
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return {
    strongest: sorted[0][0],
    weakest: sorted[sorted.length - 1][0]
  };
}

export function getZodiacSign(month, day) {
  const sign = zodiacSigns.find(s => {
    const [sM, sD] = s.start;
    const [eM, eD] = s.end;
    if (month === sM && day >= sD) return true;
    if (month === eM && day <= eD) return true;
    return false;
  });
  return sign || zodiacSigns[0];
}

export function getScoreLevel(score) {
  if (score >= 90) return "极佳";
  if (score >= 82) return "顺畅";
  if (score >= 74) return "平稳";
  if (score >= 66) return "需经营";
  return "保守";
}

export function calculateUserBazi(profile) {
  const normalizedProfile = normalizeDailyFortuneProfile(profile);
  const { year, month, day, hour, minute } = normalizedProfile;
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = Lunar.fromSolar(solar);
  const eightChar = lunar.getEightChar();

  const dayGan = eightChar.getDayGan();
  const dayWuxing = getGanWuxing(dayGan);
  const preference = calculateUserElementPreference(eightChar);

  return {
    dayGan,
    dayWuxing,
    eightChar,
    strongestElement: preference.strongest,
    weakestElement: preference.weakest
  };
}

export function calculateDailyFortune(profile, date = new Date()) {
  const normalizedProfile = normalizeDailyFortuneProfile(profile);
  const { gender } = normalizedProfile;

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const dateLabel = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const zodiac = getZodiacSign(normalizedProfile.month, normalizedProfile.day);
  const userBazi = calculateUserBazi(normalizedProfile);
  const solarToday = Solar.fromYmd(y, m, d);
  const lunarToday = Lunar.fromSolar(solarToday);
  const eightCharToday = lunarToday.getEightChar();
  const todayGan = eightCharToday.getDayGan();
  const todayZhi = eightCharToday.getDayZhi();
  const todayGanWuxing = getGanWuxing(todayGan);
  const todayZhiWuxing = getZhiWuxing(todayZhi);

  const baseSeed = hashString(
    `${normalizedProfile.year}-${normalizedProfile.month}-${normalizedProfile.day}-${normalizedProfile.hour}-${gender}-${y}-${m}-${d}`
  );

  const categories = fortuneCategories.map((cat, idx) => {
    const catSeed = hashString(`${baseSeed}-${cat.key}`);
    let score = seededNumber(catSeed, 60, 88);

    if (todayGanWuxing === userBazi.weakestElement || todayZhiWuxing === userBazi.weakestElement) {
      score += 4;
    } else if (todayGanWuxing === userBazi.dayWuxing || todayZhiWuxing === userBazi.dayWuxing) {
      score += 2;
    } else if (todayGanWuxing === userBazi.strongestElement || todayZhiWuxing === userBazi.strongestElement) {
      score -= 2;
    }

    score = Math.max(58, Math.min(96, score));

    const level = getScoreLevel(score);
    const keywords = pickRandom(catSeed, keywordBank[cat.key]);
    const advice = pickRandom(catSeed, adviceBank[cat.key]);
    let text = `${level}。${keywords.join("，")}。${advice}`;

    return {
      key: cat.key,
      label: cat.label,
      score: Math.round(score),
      level,
      keywords,
      text,
      advice,
      caution: cat.key === "overall" ? pickRandom(catSeed, cautionBank) : null
    };
  });

  const summary = categories.find(c => c.key === "overall");
  const otherCategories = categories.filter(c => c.key !== "overall");

  return {
    dateLabel,
    zodiac,
    bazi: {
      dayMaster: userBazi.dayGan,
      dayMasterElement: wuxingLabels[userBazi.dayWuxing],
      dayMasterElementKey: userBazi.dayWuxing,
      todayGanZhi: todayGan + todayZhi,
      todayGanElement: wuxingLabels[todayGanWuxing],
      todayGanElementKey: todayGanWuxing
    },
    summary,
    categories: otherCategories
  };
}

export function loadDailyFortuneProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DAILY_FORTUNE_PROFILE_KEY);
    if (!raw) return null;
    return normalizeDailyFortuneProfile(JSON.parse(raw));
  } catch (e) {
    console.warn("Failed to load daily fortune profile:", e);
    return null;
  }
}

export function saveDailyFortuneProfile(profile) {
  if (typeof window === "undefined") return;
  try {
    const normalizedProfile = normalizeDailyFortuneProfile(profile);
    localStorage.setItem(DAILY_FORTUNE_PROFILE_KEY, JSON.stringify({
      ...normalizedProfile,
      savedAt: Date.now()
    }));
  } catch (e) {
    console.warn("Failed to save daily fortune profile:", e);
  }
}

export function clearDailyFortuneProfile() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DAILY_FORTUNE_PROFILE_KEY);
  } catch (e) {
    console.warn("Failed to clear daily fortune profile:", e);
  }
}

export function getDailyFortuneHomeSummary(profile) {
  if (!profile) return "";

  const result = calculateDailyFortune(profile);
  const { level, keywords } = result.summary;
  const primaryKeyword = Array.isArray(keywords) && keywords.length ? keywords[0] : "稳住节奏";

  const levelSummaryMap = {
    "极佳": `今日运势极佳，适合围绕${primaryKeyword}主动推进。`,
    "顺畅": `今日运势顺畅，适合围绕${primaryKeyword}稳步推进。`,
    "平稳": `今日状态平稳，适合围绕${primaryKeyword}安排节奏。`,
    "需经营": `今日需要多经营，适合围绕${primaryKeyword}耐心处理。`,
    "保守": `今日节奏偏保守，宜放慢决策并关注${primaryKeyword}。`
  };

  return levelSummaryMap[level] || `今日适合围绕${primaryKeyword}稳住节奏。`;
}

export const defaultFortunePreview = [
  { key: "overall", label: "总运势", score: 72 },
  { key: "career", label: "事业", score: 68 },
  { key: "health", label: "健康", score: 75 },
  { key: "love", label: "情感", score: 70 },
  { key: "family", label: "家庭", score: 74 }
];

export function getDailyFortunePreview(profile) {
  if (!profile) {
    return defaultFortunePreview;
  }

  const result = calculateDailyFortune(profile);

  return [
    { key: "overall", label: "总运势", score: result.summary.score },
    ...result.categories.map((item) => ({
      key: item.key,
      label: item.label,
      score: item.score
    }))
  ];
}
