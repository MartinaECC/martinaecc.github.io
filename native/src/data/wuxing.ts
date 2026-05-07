// @ts-nocheck
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

const dayMasterProfiles = {
  jin: {
    title: '金日主气质',
    text: '你更容易表现出清晰、克制和判断分明的一面。做事重边界、讲效率，遇到重要决定时往往希望先看清结构再行动。'
  },
  mu: {
    title: '木日主气质',
    text: '你通常带有向上生长的驱动力，重视方向感、学习感和持续发展。面对新环境时，常见倾向是先寻找空间，再逐步展开自己的节奏。'
  },
  shui: {
    title: '水日主气质',
    text: '你更容易以感受、观察和弹性来理解世界。遇到复杂关系或变化情境时，通常擅长先感知氛围，再寻找更柔和但有效的切入点。'
  },
  huo: {
    title: '火日主气质',
    text: '你常带有表达欲、行动感和感染力。很多时候不是等局势成熟才出手，而是在互动、尝试和反馈里逐渐把状态点亮。'
  },
  tu: {
    title: '土日主气质',
    text: '你往往更看重稳定、承接与落地。面对人和事时，常见倾向是先判断是否可靠，再决定投入多少时间、责任和信任。'
  }
};

const elementRecommendations = {
  jin: {
    rhythm: '把时间安排得更清楚，主动做减法，优先处理真正重要的事项。',
    environment: '适合保持整洁、有秩序的环境，让注意力集中在关键目标上。',
    style: '可多用白色、灰色、金属感或线条利落的穿搭元素，强化清明感。',
    action: '练习果断表达、明确边界和及时收尾，避免拖延消耗。'
  },
  mu: {
    rhythm: '把生活节奏拉回规律增长，适合持续学习、运动和建立长期计划。',
    environment: '适合多接触自然、绿色、植物感空间，让状态更舒展。',
    style: '可多用绿色、青色和轻盈材质，增强生长与延展的感觉。',
    action: '通过阅读、输入和循序渐进的练习来补强自己，不急于一口吃成。'
  },
  shui: {
    rhythm: '为自己保留休息、流动和回收精力的空间，不必一直硬顶。',
    environment: '适合待在安静、有流动感或有留白的环境里，帮助情绪和思路回稳。',
    style: '可多用黑、深蓝、雾蓝等色彩，提升沉静与洞察感。',
    action: '练习先观察再判断，让自己在变化中保持弹性和余地。'
  },
  huo: {
    rhythm: '适合提高行动密度，把想法更快变成表达、展示或现实推动。',
    environment: '适合更明亮、温暖、有互动感的场域，帮助状态被点燃。',
    style: '可多用红色、橙色、暖粉或更有存在感的搭配，提升气场。',
    action: '多说出来、多试一次、多站到台前，会比闷着想更容易打开局面。'
  },
  tu: {
    rhythm: '先把作息、饮食和任务节奏稳住，持续积累比短期冲刺更重要。',
    environment: '适合有安全感、收纳清楚、结构稳定的环境，让人更容易沉下来。',
    style: '可多用大地色、米色、卡其色和厚实材质，增强稳定和承载感。',
    action: '练习把计划拆成可执行步骤，让抽象想法真正落地。'
  }
};

const strongestElementGuidance = {
  jin: '金气偏旺时，判断力和执行边界通常较强，适合处理规则、决策和收束类事务。',
  mu: '木气偏旺时，成长欲和推进感会更明显，往往愿意主动拓展、学习和向前发力。',
  shui: '水气偏旺时，感知力、适应力和洞察变化的能力会更突出。',
  huo: '火气偏旺时，表达、行动和影响他人的能力更容易成为显性优势。',
  tu: '土气偏旺时，稳定性、承接力和长期积累的能力通常会更突出。'
};

const weakestElementGuidance = {
  jin: '金气偏弱时，常见课题是取舍不够明确，或边界感容易被外界打乱。',
  mu: '木气偏弱时，常见课题是方向感不足，或者想法有了却不易持续展开。',
  shui: '水气偏弱时，常见课题是身心弹性不足，容易在压力里变得紧绷。',
  huo: '火气偏弱时，常见课题是表达与行动偏保守，状态不容易被点亮。',
  tu: '土气偏弱时，常见课题是稳定度和落地感不足，容易出现节奏散乱。'
};

const lifeGuidanceTemplates = {
  career: {
    title: '事业与学习',
    advice: {
      jin: '适合把目标进一步收束，先做最关键的决定，再推进执行。',
      mu: '适合持续拓展能力边界，把学习和成长转成看得见的积累。',
      shui: '适合保留观察与调整空间，先理解局势，再选择发力位置。',
      huo: '适合增加表达、展示和主动争取，让机会更容易看见你。',
      tu: '适合稳扎稳打，把手头任务做深做实，建立长期可信度。'
    }
  },
  relationship: {
    title: '关系与合作',
    advice: {
      jin: '合作中越清楚规则和边界，关系反而越稳定。',
      mu: '关系里适合多给成长空间，用鼓励和共识带动连接。',
      shui: '先理解对方状态，再表达自己，会比硬碰硬更有效。',
      huo: '适合主动沟通、及时回应，让情绪与热度自然流动起来。',
      tu: '通过可靠、稳定和说到做到来建立信任，比技巧更重要。'
    }
  },
  lifestyle: {
    title: '生活状态',
    advice: {
      jin: '生活里适合做减法，清理杂乱后，你的状态会更清楚。',
      mu: '保持规律作息和持续输入，能明显提升你的生命力和伸展感。',
      shui: '给自己留白和休息时间，状态会比一味硬撑更快恢复。',
      huo: '多晒太阳、多活动、多与外界互动，会让整体能量更顺。',
      tu: '把基础节奏稳住，饮食、睡眠和日常秩序会直接影响你的运转质量。'
    }
  }
};

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

function getSortedScores(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}

function buildDistributionText(sortedScores) {
  const [strongest, secondStrongest] = sortedScores;
  const weakest = sortedScores[sortedScores.length - 1];
  const spread = strongest[1] - weakest[1];

  if (spread >= 2) {
    return `当前五行分布存在比较明显的偏重，${wuxingLabels[strongest[0]]}能量最为突出，${wuxingLabels[weakest[0]]}相对偏弱。这样的格局通常意味着优势很鲜明，但也更需要后天主动补平短板。`;
  }

  if (strongest[1] === secondStrongest[1]) {
    return `你的五行分布没有单一元素独占主导，整体属于相对均衡中带有重点的状态。这样往往适应性不错，但真正拉开差距的关键在于是否能持续经营自己的优势。`;
  }

  return `你的五行分布呈现出主次分明但不过度失衡的状态，${wuxingLabels[strongest[0]]}稍占上风，${wuxingLabels[weakest[0]]}则提醒你在相应能力面上做补强。`;
}

function buildEnergyPatternText(dayMasterElement, strongestKey, weakestKey) {
  return `${strongestElementGuidance[strongestKey]} 同时，${weakestElementGuidance[weakestKey]} 放在你的命局里，意味着你在发挥${wuxingLabels[dayMasterElement]}日主特质时，既要用好优势，也要照顾整体平衡。`;
}

function buildWorkStyleText(dayMasterElement, strongestKey, weakestKey) {
  return `做事风格上，你更容易从${wuxingLabels[strongestKey]}所代表的方式切入问题；顺的时候会显得很有自己的节奏和方法，失衡时则可能在${wuxingLabels[weakestKey]}相关的能力面上感到吃力。把${wuxingLabels[dayMasterElement]}日主的核心稳定住，会让你更容易把优势转成长期表现。`;
}

function buildSummaryText(dayMasterElement, strongestKey, weakestKey) {
  return `你的命局以${wuxingLabels[dayMasterElement]}日主为核心，当前五行分布更偏向${wuxingLabels[strongestKey]}的表达，说明相关特质较容易成为显性优势；同时${wuxingLabels[weakestKey]}能量偏弱，后续适合围绕补足${wuxingLabels[weakestKey]}方向来调整节奏与状态。`;
}

function buildFullSummary(dayMasterElement, strongestKey, weakestKey) {
  return `你的命局以${wuxingLabels[dayMasterElement]}日主为核心，整体五行呈现${wuxingLabels[strongestKey]}相对更旺、${wuxingLabels[weakestKey]}相对偏弱的倾向。这样的格局通常意味着你在${wuxingLabels[strongestKey]}所代表的能力面上更容易形成优势，做事会更自然地顺着这股能量展开；但若长期忽略${wuxingLabels[weakestKey]}方向，也可能在稳定性、节奏感或某些关键能力上出现短板。后天若能有意识地往${wuxingLabels[weakestKey]}的节奏与补强方向靠拢，整体状态会更平衡，优势也更容易沉淀成长期表现。`;
}

function buildSupportingElement(key) {
  const guidance = elementRecommendations[key];

  return {
    key,
    label: wuxingLabels[key],
    recommendations: [
      { title: '生活节奏', text: guidance.rhythm },
      { title: '环境氛围', text: guidance.environment },
      { title: '颜色与穿搭', text: guidance.style },
      { title: '行为补强', text: guidance.action }
    ]
  };
}

function buildLifeGuidance(yongShen) {
  return [
    {
      key: 'career',
      title: lifeGuidanceTemplates.career.title,
      text: `${strongestElementGuidance[yongShen.strongest]} ${lifeGuidanceTemplates.career.advice[yongShen.weakest]}`
    },
    {
      key: 'relationship',
      title: lifeGuidanceTemplates.relationship.title,
      text: `${weakestElementGuidance[yongShen.weakest]} ${lifeGuidanceTemplates.relationship.advice[yongShen.strongest]}`
    },
    {
      key: 'lifestyle',
      title: lifeGuidanceTemplates.lifestyle.title,
      text: lifeGuidanceTemplates.lifestyle.advice[yongShen.weakest]
    }
  ];
}

function buildDayunSummary(dayun) {
  const current = dayun.find((item) => item.age >= 0) || dayun[0];

  if (!current) {
    return '大运更适合看作长期阶段节奏的参考，帮助你理解人生不同阶段偏向积累、变化还是责任加深。';
  }

  return `大运部分更适合看作长期阶段节奏参考。你当前可优先关注 ${current.age} 岁起的「${current.ganZhi}」阶段，它提示的是人生重心如何转向，而不是短期吉凶的绝对判断。`;
}

function buildAnalysis(bazi, scores, yongShen, dayun) {
  const dayMasterElement = getGanWuxing(bazi.dayGan);
  const sortedScores = getSortedScores(scores);

  return {
    summaryTitle: '你的五行能量解读',
    fullSummary: buildFullSummary(dayMasterElement, yongShen.strongest, yongShen.weakest),
    summaryText: buildSummaryText(dayMasterElement, yongShen.strongest, yongShen.weakest),
    distributionText: buildDistributionText(sortedScores),
    dayMasterTraits: dayMasterProfiles[dayMasterElement],
    energyPattern: {
      title: '能量格局',
      text: buildEnergyPatternText(dayMasterElement, yongShen.strongest, yongShen.weakest)
    },
    workStyle: {
      title: '做事风格',
      text: buildWorkStyleText(dayMasterElement, yongShen.strongest, yongShen.weakest)
    },
    supportingElement: buildSupportingElement(yongShen.xiYong[0]),
    cautionElement: {
      key: yongShen.strongest,
      label: wuxingLabels[yongShen.strongest],
      text: `当前${wuxingLabels[yongShen.strongest]}气偏旺，优点是优势明显，但也要避免过度走向${wuxingLabels[yongShen.strongest]}一侧，造成节奏失衡。`
    },
    lifeGuidance: buildLifeGuidance(yongShen),
    dayunSummary: buildDayunSummary(dayun)
  };
}

// 计算函数，供TestPage调用
export function calculateScores(birthInfo) {
  const { year, month, day, hour, minute, gender } = birthInfo;
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = Lunar.fromSolar(solar);
  const eightChar = lunar.getEightChar();

  const bazi = {
    year: eightChar.getYearGan() + eightChar.getYearZhi(),
    month: eightChar.getMonthGan() + eightChar.getMonthZhi(),
    day: eightChar.getDayGan() + eightChar.getDayZhi(),
    hour: eightChar.getTimeGan() + eightChar.getTimeZhi(),
    yearGan: eightChar.getYearGan(),
    yearZhi: eightChar.getYearZhi(),
    monthGan: eightChar.getMonthGan(),
    monthZhi: eightChar.getMonthZhi(),
    dayGan: eightChar.getDayGan(),
    dayZhi: eightChar.getDayZhi(),
    hourGan: eightChar.getTimeGan(),
    hourZhi: eightChar.getTimeZhi(),
    zodiac: lunar.getYearShengXiao(),
    solar: { year, month, day, hour, minute },
    gender
  };

  const scores = calculateFiveElements(bazi);
  const yongShen = determineYongShen(scores);
  const dayun = eightChar.getYun(gender === 'male' ? 1 : 0).getDaYun();
  const dayunList = dayun.slice(0, 5).map(d => ({
    age: d.getStartAge(),
    ganZhi: d.getGanZhi(),
    startYear: d.getStartYear()
  }));

  return {
    bazi,
    scores,
    yongShen,
    dayun: dayunList,
    analysis: buildAnalysis(bazi, scores, yongShen, dayunList)
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
