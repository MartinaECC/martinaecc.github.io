const bftiTestData = {
  title: "BFTI暴富性格测试",
  description: "一个关于财富动机、风险偏好与行动模式的轻量探索测试",
  questions: [
    {
      id: 1,
      text: "朋友喊你一起拼团抢消费券，你会？",
      dimension: "E",
      options: [
        { text: "立刻拉群，把身边朋友都喊上", score: 5 },
        { text: "朋友喊了就参加，不主动凑", score: 3 },
        { text: "没兴趣，几块钱不值得折腾", score: 1 }
      ]
    },
    {
      id: 2,
      text: "发了工资你第一反应是？",
      dimension: "I",
      options: [
        { text: "先还上再说，剩下再说", score: 5 },
        { text: "留足生活费，剩下分期还", score: 3 },
        { text: "先花了再说，船到桥头自然直", score: 1 }
      ]
    },
    {
      id: 3,
      text: "看到\"低门槛日赚五百\"的广告，你会？",
      dimension: "N",
      options: [
        { text: "有点心动，想点进去看看", score: 5 },
        { text: "怀疑是坑，但忍不住好奇", score: 3 },
        { text: "直接划走，肯定是骗子", score: 1 }
      ]
    },
    {
      id: 4,
      text: "有个靠谱副业机会需要垫资启动，你会？",
      dimension: "R",
      options: [
        { text: "借钱也要干，机会不等人", score: 5 },
        { text: "拿出一半积蓄试试水", score: 3 },
        { text: "稳一手，等攒够钱再说", score: 1 }
      ]
    },
    {
      id: 5,
      text: "朋友推荐了一个新风口项目，你倾向于？",
      dimension: "Q",
      options: [
        { text: "赶紧上车，赚一波就走", score: 5 },
        { text: "观察几天，涨了再进", score: 3 },
        { text: "研究透了再长期持有", score: 1 }
      ]
    },
    {
      id: 6,
      text: "逛街看到喜欢的东西，你会？",
      dimension: "E",
      options: [
        { text: "砍价还价，必须拿下", score: 5 },
        { text: "喜欢就买，不怎么犹豫", score: 3 },
        { text: "忍忍回去网上搜便宜的", score: 1 }
      ]
    },
    {
      id: 7,
      text: "你更认同哪种搞钱理念？",
      dimension: "Sf",
      options: [
        { text: "打工才是最大的稳，稳稳当当攒钱", score: 5 },
        { text: "一边打工一边折腾，两不误", score: 3 },
        { text: "年轻就要闯，赢了会所嫩模", score: 1 }
      ]
    },
    {
      id: 8,
      text: "欠了点钱，你会告诉身边人吗？",
      dimension: "I",
      options: [
        { text: "自己扛，打死不说", score: 5 },
        { text: "关系好的知道，其他人不说", score: 3 },
        { text: "无所谓，大家都知道现在难", score: 1 }
      ]
    },
    {
      id: 9,
      text: "有人说\"撑死胆大的饿死胆小的\"，你觉得？",
      dimension: "R",
      options: [
        { text: "说得对，富贵险中求", score: 5 },
        { text: "有道理但不敢太冒进", score: 3 },
        { text: "稳比什么都重要", score: 1 }
      ]
    },
    {
      id: 10,
      text: "刷到暴富神话短视频，你会？",
      dimension: "N",
      options: [
        { text: "反复看，研究人家是怎么发的", score: 5 },
        { text: "看完羡慕，该干嘛干嘛", score: 3 },
        { text: "都是剧本，划走不犹豫", score: 1 }
      ]
    },
    {
      id: 11,
      text: "投资赚到第一笔钱，你会？",
      dimension: "L",
      options: [
        { text: "落袋为安，赶紧兑现", score: 5 },
        { text: "拿利润继续滚，本金留着", score: 3 },
        { text: "继续持有，让利润奔跑", score: 1 }
      ]
    },
    {
      id: 12,
      text: "周末朋友约你出去社交搞资源，你会？",
      dimension: "E",
      options: [
        { text: "必须去，说不定有机会", score: 5 },
        { text: "关系好才去，一般不去", score: 3 },
        { text: "不去，在家歇着多舒服", score: 1 }
      ]
    },
    {
      id: 13,
      text: "你更习惯怎么攒钱还债？",
      dimension: "S",
      options: [
        { text: "每月固定存一笔，雷打不动", score: 5 },
        { text: "发了钱就还点，随缘", score: 3 },
        { text: "赚到大钱一次性还清", score: 1 }
      ]
    },
    {
      id: 14,
      text: "夜里睡不着，你通常在想什么？",
      dimension: "I",
      options: [
        { text: "复盘今天，规划明天搞钱计划", score: 5 },
        { text: "想着怎么快点还清债务", score: 3 },
        { text: "刷手机打发时间，不想那么多", score: 1 }
      ]
    },
    {
      id: 15,
      text: "遇到心仪的项目但不懂技术，你会？",
      dimension: "N",
      options: [
        { text: "找懂技术的合伙人一起干", score: 5 },
        { text: "边干边学，慢慢摸索", score: 3 },
        { text: "等学会了再说，不打无准备的仗", score: 1 }
      ]
    },
    {
      id: 16,
      text: "信用卡额度涨了，你感觉？",
      dimension: "R",
      options: [
        { text: "开心，又多了一笔周转资金", score: 5 },
        { text: "一般般，该用还是用", score: 3 },
        { text: "慌，怕自己控制不住多刷", score: 1 }
      ]
    },
    {
      id: 17,
      text: "你更喜欢哪种赚钱节奏？",
      dimension: "Q",
      options: [
        { text: "快进快出，赚快钱", score: 5 },
        { text: "细水长流，慢慢赚", score: 3 },
        { text: "深耕一个领域，赚大钱", score: 1 }
      ]
    },
    {
      id: 18,
      text: "你相信\"选择大于努力\"这句话吗？",
      dimension: "Sf",
      options: [
        { text: "非常相信，选对风口少走十年弯路", score: 5 },
        { text: "有时候对，努力也很重要", score: 3 },
        { text: "努力才是根本，风口都是赌", score: 1 }
      ]
    },
    {
      id: 19,
      text: "相亲时对方问你存款，你会？",
      dimension: "E",
      options: [
        { text: "实话实说，现在周转不开", score: 5 },
        { text: "含糊过去，以后再说", score: 3 },
        { text: "打个哈哈混过去，不正面答", score: 1 }
      ]
    },
    {
      id: 20,
      text: "你更愿意为什么付费？",
      dimension: "L",
      options: [
        { text: "能马上用得上的资讯和资源", score: 5 },
        { text: "提升自己能力的课程", score: 3 },
        { text: "长期有价值的无形资产", score: 1 }
      ]
    },
    {
      id: 21,
      text: "如果创业失败欠了债，你会？",
      dimension: "S",
      options: [
        { text: "从头再来，打工慢慢还", score: 5 },
        { text: "找新项目，想快速翻盘", score: 3 },
        { text: "反正这样了，破罐子破摔", score: 1 }
      ]
    },
    {
      id: 22,
      text: "你更喜欢在哪里找搞钱灵感？",
      dimension: "N",
      options: [
        { text: "网上看别人分享案例", score: 5 },
        { text: "和身边朋友喝茶聊天", score: 3 },
        { text: "自己看书学习总结", score: 1 }
      ]
    },
    {
      id: 23,
      text: "有朋友拉你进付费社群，你会？",
      dimension: "Q",
      options: [
        { text: "觉得有用立刻报名", score: 5 },
        { text: "问问已经进去的人再说", score: 3 },
        { text: "太贵，不去，不如自学", score: 1 }
      ]
    },
    {
      id: 24,
      text: "你更能接受哪种搞钱方式？",
      dimension: "Sf",
      options: [
        { text: "摆地摊开滴滴，能赚就行不丢人", score: 5 },
        { text: "做自媒体搞直播，当网红", score: 3 },
        { text: "做项目炒概念，玩资本", score: 1 }
      ]
    },
    {
      id: 25,
      text: "需要借钱周转时，你优先找？",
      dimension: "I",
      options: [
        { text: "平台借贷，不欠人情", score: 5 },
        { text: "关系好的几个朋友", score: 3 },
        { text: "家里人，帮兜底", score: 1 }
      ]
    },
    {
      id: 26,
      text: "房价上涨，你觉得？",
      dimension: "R",
      options: [
        { text: "再加杠杆也要上车，不然涨更买不起", score: 5 },
        { text: "有闲钱可以投资，不加杠杆", score: 3 },
        { text: "已经涨成这样了，不追高", score: 1 }
      ]
    },
    {
      id: 27,
      text: "你攒钱的目标更接近？",
      dimension: "L",
      options: [
        { text: "攒够应急资金，心里不慌", score: 5 },
        { text: "攒第一桶金，准备投资", score: 3 },
        { text: "攒养老钱，长远打算", score: 1 }
      ]
    },
    {
      id: 28,
      text: "朋友说有内部消息带你赚钱，你会？",
      dimension: "S",
      options: [
        { text: "先投点小钱试试水", score: 5 },
        { text: "观察一段时间再说", score: 3 },
        { text: "不信，肯定是坑", score: 1 }
      ]
    },
    {
      id: 29,
      text: "休息的时候你更喜欢？",
      dimension: "E",
      options: [
        { text: "出去跑，见人谈事找机会", score: 5 },
        { text: "约几个朋友出来吃吃饭", score: 3 },
        { text: "宅在家里，补觉刷手机", score: 1 }
      ]
    },
    {
      id: 30,
      text: "你对未来暴富的信念是？",
      dimension: "Q",
      options: [
        { text: "三年内必定翻身，我等着那一天", score: 5 },
        { text: "慢慢来，总有一天会好起来", score: 3 },
        { text: "能吃饱饭就不错了，不想那么多", score: 1 }
      ]
    }
  ],
  dimensions: [
    { key: "E", name: "向外搞钱", opposite: "I", oppositeName: "向内搞钱" },
    { key: "R", name: "敢加杠杆", opposite: "S", oppositeName: "稳扎稳打" },
    { key: "Q", name: "快进快出", opposite: "L", oppositeName: "长期持有" },
    { key: "N", name: "抓住风口", opposite: "Sf", oppositeName: "稳走正道" }
  ],
  profiles: {
    "ERQN": {
      name: "借风破浪型",
      nickname: "风口赌徒",
      icon: "🌊",
      color: "#d84a35",
      status: "现在靠着各种周转走南闯北，银行卡余额永远是红多绿少，朋友说你太激进，但你知道不闯就永远翻不了身。",
      prediction: "三年之内必遇大风口，一次翻盘还清所有债务，直接实现财务自由。天生不怕输的性格就是你最大的筹码，下一个暴富神话就是你。"
    },
    "ERQSf": {
      name: "闪电借贷型",
      nickname: "快贷快手",
      icon: "⚡",
      color: "#d84a35",
      status: "额度就是底气，手机里常备三个借贷APP，用钱从不犹豫，还款干脆利落。习惯了用钱生钱，胆子大路子野，就是偶尔也会失眠担心还款日。",
      prediction: "很快就能抓住一个短平快的机会，资金滚动起来越转越快，债务清零就在眼前，明年就能全款买下你看中很久的东西。"
    },
    "ERLN": {
      name: "杠杆投资型",
      nickname: "资本玩家",
      icon: "📈",
      color: "#d84a35",
      status: "看准了就敢重仓加杠杆，相信大收益需要大投入。现在虽然负债，但持有的资产一直在涨，身边人佩服你的魄力，你也偶尔恐惧黑天鹅。",
      prediction: "你坚持持有的资产会超预期上涨，提前实现财富自由，不仅还清债务，还能留下被动收入躺平吃息。"
    },
    "ERLSf": {
      name: "稳中加杠杆型",
      nickname: "理性杠杆师",
      icon: "⚖️",
      color: "#d84a35",
      status: "虽然敢加杠杆，但每一步都算得清清楚楚，从不瞎梭哈。欠债但不欠糊涂账，每月还款计划做得明明白白，走的是稳扎稳打放大收益路线。",
      prediction: "时间站在你这边，复利会给你惊喜，债务逐年减少，资产逐年增加，五年后实现财务安全，十年后躺着收钱。"
    },
    "ESQN": {
      name: "风口攒钱型",
      nickname: "稳健追风者",
      icon: "🍃",
      color: "#699767",
      status: "看到风口也心动，但永远留足安全垫，只用闲钱试试水。就算借钱也不借超出能力范围的，懂得细水长流，不贪一夜暴富。",
      prediction: "每次尝试都给你积累经验，终有一次踩对节拍，收获超预期，不知不觉就还清债务，资产稳步增值。"
    },
    "ESQSf": {
      name: "踏实搞钱型",
      nickname: "本分财主",
      icon: "💰",
      color: "#699767",
      status: "不相信天上掉馅饼，只赚认知以内的钱。欠债就慢慢还，一分一分攒，日子虽然平淡，但每晚睡得香，从不瞎折腾。",
      prediction: "踏实人有天助，你的稳劲会吸引靠谱机会，不知不觉事业做起来，债务慢慢清完，晚年富足安稳。"
    },
    "ESLN": {
      name: "价值投资型",
      nickname: "价值猎手",
      icon: "🎯",
      color: "#699767",
      status: "风口来了不盲从，只选真正有价值的标的，用时间换空间。现在虽然被套，但你相信价格回归价值，耐心持有不动摇。",
      prediction: "市场会证明你的眼光，长期持有带来超额回报，债务清零后还能留给后代一笔可观资产。"
    },
    "ESLSf": {
      name: "稳步翻盘型",
      nickname: "复利魔法师",
      icon: "🔄",
      color: "#699767",
      status: "不追风口不羡慕暴富，坚持正道慢慢走，每月固定攒钱还债，相信复利的力量。现在慢是慢，但你心里不慌，知道方向对了就不怕路远。",
      prediction: "十年之后你会惊掉下巴，复利积累让你远超那些追风口的人，成为真正不露声色的富豪。"
    },
    "IRQN": {
      name: "潜伏抓风口型",
      nickname: "幕后猎手",
      icon: "🕵️",
      color: "#8a6bc5",
      status: "不爱社交不混圈子，但手机刷消息比谁都勤，默默关注各个风口，偷偷研究准备弹药。外人不知道你在干嘛，你在等一个致命一击的机会。",
      prediction: "当机会真来的时候你会果断出手，一击命中，一次就翻身，从此人生开挂。"
    },
    "IRQSf": {
      name: "闷声加杠杆型",
      nickname: "沉默庄家",
      icon: "🎲",
      color: "#8a6bc5",
      status: "平时话不多，心里门儿清，敢下重注但不告诉别人，亏了自己扛，赚了偷着乐。债务问题自己解决，从不跟身边人说。",
      prediction: "再过两年你的资产会让所有人大吃一惊，闷声发大财说的就是你。"
    },
    "IRLN": {
      name: "潜心布局型",
      nickname: "长期庄家",
      icon: "🎲",
      color: "#8a6bc5",
      status: "知道自己要什么，默默布局长期赛道，现在虽然苦，欠债压力大，但你看好赛道未来，不在乎一城一池得失。",
      prediction: "赛道风口来临时你已经占据最好位置，直接起飞，财富自由比别人来得更早更稳。"
    },
    "IRLSf": {
      name: "深耕正道型",
      nickname: "技术大拿",
      icon: "🔧",
      color: "#8a6bc5",
      status: "不投机不取巧，认准一门技术深耕，现在虽然赚得不多欠债，但你相信手艺不会骗人，技术到位了钱自然来。",
      prediction: "未来技术稀缺性会体现出来，你会成为行业里抢手的专家，身价暴涨，债务一扫而空。"
    },
    "ISQN": {
      name: "悄悄追风型",
      nickname: "暗盘玩家",
      icon: "🌙",
      color: "#3f7de0",
      status: "不爱社交但喜欢研究各种新机会，自己在家默默做功课，攒点小钱就想试试风口，失败了也没人知道，成功了再一鸣惊人。",
      prediction: "你的默默研究终会得到回报，某个小风口就让你赚得盆满钵满，还清债务轻松上岸。"
    },
    "ISQSf": {
      name: "闷声攒钱型",
      nickname: "隐形财主",
      icon: "💵",
      color: "#3f7de0",
      status: "不跟人比炫富，日子过得低调简朴，但是每月偷偷攒钱还债，心里有数。别人不知道你欠多少，也不知道你存多少，你就喜欢这种神秘感。",
      prediction: "不知不觉债务就还清了，突然某天大家发现你已经买了房买了车，深藏不漏说的就是你。"
    },
    "ISLN": {
      name: "长期潜伏型",
      nickname: "时间朋友",
      icon: "⌛",
      color: "#3f7de0",
      status: "内向不折腾，选好一条正道就一直走，时间给你积累，债务慢慢减少，技能越来越强。你不急，因为你知道暴富属于有耐心的人。",
      prediction: "属于你的机会会在你准备好的时候到来，一枪中标，直接财务自由，后半生安稳无忧。"
    },
    "ISLSf": {
      name: "内圣外王型",
      nickname: "隐性富豪",
      icon: "🏆",
      color: "#3f7de0",
      status: "向内积累，步步为营，不向外求机会，只修炼自己本事。现在虽然负债，但你底气在，知道自己值多少钱。",
      prediction: "厚积薄发，十年不鸣，一鸣惊人，当你出手的时候所有人都惊呆了，你才是真正的最大赢家。"
    }
  },

  calculateScores: function(answers: { score: number }[]) {
    const scores: Record<string, number> = { E: 0, I: 0, R: 0, S: 0, Q: 0, L: 0, N: 0, Sf: 0 };

    answers.forEach((answer, index) => {
      if (answer === null || answer === undefined) return;
      const question = bftiTestData.questions[index];
      const dimension = question.dimension;
      const score = answer.score;

      if (dimension === 'E') {
        scores.E += score;
        scores.I += (6 - score);
      } else if (dimension === 'I') {
        scores.I += score;
        scores.E += (6 - score);
      } else if (dimension === 'R') {
        scores.R += score;
        scores.S += (6 - score);
      } else if (dimension === 'S') {
        scores.S += score;
        scores.R += (6 - score);
      } else if (dimension === 'Q') {
        scores.Q += score;
        scores.L += (6 - score);
      } else if (dimension === 'L') {
        scores.L += score;
        scores.Q += (6 - score);
      } else if (dimension === 'N') {
        scores.N += score;
        scores.Sf += (6 - score);
      } else if (dimension === 'Sf') {
        scores.Sf += score;
        scores.N += (6 - score);
      }
    });

    const type =
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.R > scores.S ? 'R' : 'S') +
      (scores.Q > scores.L ? 'Q' : 'L') +
      (scores.N > scores.Sf ? 'N' : 'Sf');

    return { scores, type };
  }
};

export const typeOrder = ["E", "I", "R", "S", "Q", "L", "N", "Sf"];

export const typeLabels: Record<string, string> = {
  E: "向外搞钱",
  I: "向内搞钱",
  R: "敢加杠杆",
  S: "稳扎稳打",
  Q: "快进快出",
  L: "长期持有",
  N: "抓住风口",
  Sf: "稳走正道"
};

export const bftiTest = {
  id: "bfti",
  title: "BFTI暴富性格测试",
  eyebrow: "BFTI Fortune Test",
  description: "一个关于财富动机、风险偏好与行动模式的轻量探索测试，看看你是哪种暴富体质？",
  duration: "5-8分钟",
  questionCount: 30,
  questions: bftiTestData.questions,
  dimensions: bftiTestData.dimensions,
  profiles: bftiTestData.profiles,
  typeOrder,
  typeLabels,
  calculateScores: function(answers: { score: number }[]) {
    return bftiTestData.calculateScores(answers);
  }
};
