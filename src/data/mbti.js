const mbtiTestData = {
  title: "MBTI十六型人格测试",
  description: "权威的 93 题 MBTI 人格测试，帮助你了解自己的行为偏好、思维方式和人际互动模式",
  questions: [
    {
      id: 1,
      text: "当你要外出一整天，你会",
      options: [
        { text: "计划你要做什么和在什么时候做", dimension: "J" },
        { text: "说去就去", dimension: "P" }
      ]
    },
    {
      id: 2,
      text: "你认为自己是",
      options: [
        { text: "偏向于随性散漫的人", dimension: "P" },
        { text: "偏向于做事有条理的人", dimension: "J" }
      ]
    },
    {
      id: 3,
      text: "约会时，你",
      options: [
        { text: "准时到达", dimension: "J" },
        { text: "常常迟到", dimension: "P" }
      ]
    },
    {
      id: 4,
      text: "你做事比较偏向",
      options: [
        { text: "想到哪里做到哪里，随性发挥", dimension: "P" },
        { text: "事先有明确规划，按部就班", dimension: "J" }
      ]
    },
    {
      id: 5,
      text: "你比较能够接受哪一种情况",
      options: [
        { text: "提前安排好日程，每天按计划完成", dimension: "J" },
        { text: "让日子自然流过，不做刻意安排", dimension: "P" }
      ]
    },
    {
      id: 6,
      text: "当你有一份特殊的工作要完成，你会",
      options: [
        { text: "先列好清单，按顺序一步步完成", dimension: "J" },
        { text: "边做边想，想到什么做什么", dimension: "P" }
      ]
    },
    {
      id: 7,
      text: "你的生活习惯比较偏向",
      options: [
        { text: "每天差不多都是相同的节奏", dimension: "J" },
        { text: "每天节奏常有变化，看心情调整", dimension: "P" }
      ]
    },
    {
      id: 8,
      text: "你更倾向于",
      options: [
        { text: "把要做的事提前安排好", dimension: "J" },
        { text: "不提前安排，到时候再说", dimension: "P" }
      ]
    },
    {
      id: 9,
      text: "在社交场合中，你通常",
      options: [
        { text: "主动认识新朋友", dimension: "E" },
        { text: "静静等待别人来认识你", dimension: "I" }
      ]
    },
    {
      id: 10,
      text: "你认为自己是",
      options: [
        { text: "一个好相处的人", dimension: "E" },
        { text: "一个偏内向安静的人", dimension: "I" }
      ]
    },
    {
      id: 11,
      text: "你更喜欢",
      options: [
        { text: "热闹的场合，人越多越开心", dimension: "E" },
        { text: "安静的环境，和少数几个朋友相处", dimension: "I" }
      ]
    },
    {
      id: 12,
      text: "如果让你选择，你更愿意",
      options: [
        { text: "认识很多人，维持广泛的社交圈", dimension: "E" },
        { text: "和少数几个深交的朋友保持亲密关系", dimension: "I" }
      ]
    },
    {
      id: 13,
      text: "当你和一群人在一起的时候，你通常会",
      options: [
        { text: "主动加入大家的谈话", dimension: "E" },
        { text: "更倾向于听别人说，自己很少开口", dimension: "I" }
      ]
    },
    {
      id: 14,
      text: "当你要去一个陌生的场合认识新朋友，你会觉得",
      options: [
        { text: "兴奋，充满期待", dimension: "E" },
        { text: "有点累，感觉消耗精力", dimension: "I" }
      ]
    },
    {
      id: 15,
      text: "在聚会中，你一般",
      options: [
        { text: "从头到尾都保持活跃，主动聊天", dimension: "E" },
        { text: "刚开始比较兴奋，结束后感觉需要独处充电", dimension: "I" }
      ]
    },
    {
      id: 16,
      text: "你更倾向于",
      options: [
        { text: "和朋友们随时保持联系，经常聚会", dimension: "E" },
        { text: "不需要太多联系，各自安好", dimension: "I" }
      ]
    },
    {
      id: 17,
      text: "你平时更倾向于",
      options: [
        { text: "想到就说出来，边说边想", dimension: "E" },
        { text: "在心里想好，之后再找合适的机会说", dimension: "I" }
      ]
    },
    {
      id: 18,
      text: "当你独处了一整天，你会觉得",
      options: [
        { text: "感觉很舒服，充满能量", dimension: "I" },
        { text: "感觉无聊，想要出去找人玩", dimension: "E" }
      ]
    },
    {
      id: 19,
      text: "你更容易被哪种人吸引",
      options: [
        { text: "思想深刻，喜欢探讨抽象概念", dimension: "N" },
        { text: "务实肯干，注重具体实际", dimension: "S" }
      ]
    },
    {
      id: 20,
      text: "当你要完成一项任务，你会",
      options: [
        { text: "专注于完成任务本身，不太关注创新", dimension: "S" },
        { text: "想着有没有更好的创新方法", dimension: "N" }
      ]
    },
    {
      id: 21,
      text: "你更相信",
      options: [
        { text: "确定的知识，看得见摸得着的经验", dimension: "S" },
        { text: "灵感和第六感觉", dimension: "N" }
      ]
    },
    {
      id: 22,
      text: "当你读一篇文章，你更喜欢",
      options: [
        { text: "作者开门见山，直接说出观点和结论", dimension: "S" },
        { text: "作者用隐喻和象征，启发你自己去感悟", dimension: "N" }
      ]
    },
    {
      id: 23,
      text: "你认为哪种更糟糕",
      options: [
        { text: "想入非非，脱离实际", dimension: "S" },
        { text: "墨守成规，枯燥乏味", dimension: "N" }
      ]
    },
    {
      id: 24,
      text: "你更倾向于",
      options: [
        { text: "按已有的成熟方法做事", dimension: "S" },
        { text: "想新方法，接受挑战", dimension: "N" }
      ]
    },
    {
      id: 25,
      text: "你更喜欢谈论",
      options: [
        { text: "已经发生的事实", dimension: "S" },
        { text: "未来可能发生的可能性", dimension: "N" }
      ]
    },
    {
      id: 26,
      text: "你觉得哪个更吸引人",
      options: [
        { text: "清晰可见的细节", dimension: "S" },
        { text: "整体的蓝图和远景", dimension: "N" }
      ]
    },
    {
      id: 27,
      text: "当你要做决定时，你主要依据",
      options: [
        { text: "客观数据和逻辑分析", dimension: "T" },
        { text: "考虑这个决定对人的影响", dimension: "F" }
      ]
    },
    {
      id: 28,
      text: "当你处理一件事，你更看重",
      options: [
        { text: "事情本身的对错和原则", dimension: "T" },
        { text: "相关人的感受和关系和谐", dimension: "F" }
      ]
    },
    {
      id: 29,
      text: "当你和人争论，你认为",
      options: [
        { text: "坚持真理，哪怕伤了感情", dimension: "T" },
        { text: "尽量保全对方的感受，求同存异", dimension: "F" }
      ]
    },
    {
      id: 30,
      text: "你觉得自己比较偏向",
      options: [
        { text: "头脑冷静，就事论事", dimension: "T" },
        { text: "心软共情，容易理解别人", dimension: "F" }
      ]
    },
    {
      id: 31,
      text: "当朋友跟你说他遇到的问题，你会",
      options: [
        { text: "帮他分析问题，给出解决方案", dimension: "T" },
        { text: "先共情，让他感觉到被理解", dimension: "F" }
      ]
    },
    {
      id: 32,
      text: "你认为一个好的领导者应该首先",
      options: [
        { text: "公正分明，赏罚有据", dimension: "T" },
        { text: "关怀下属，培养良好氛围", dimension: "F" }
      ]
    },
    {
      id: 33,
      text: "你做决定的方式更偏向",
      options: [
        { text: "逻辑和公平优先，人情其次", dimension: "T" },
        { text: "和谐和关系优先，兼顾原则", dimension: "F" }
      ]
    },
    {
      id: 34,
      text: "如果你的一个朋友犯了错误，你会",
      options: [
        { text: "直接指出来，帮助他改正", dimension: "T" },
        { text: "顾及他的感受，委婉表达", dimension: "F" }
      ]
    },
    {
      id: 35,
      text: "你更佩服哪种人",
      options: [
        { text: "永远情绪平稳，理性处事", dimension: "T" },
        { text: "情感丰富，容易共情别人", dimension: "F" }
      ]
    },
    {
      id: 36,
      text: "总体来说，你做判断的时候",
      options: [
        { text: "更偏重于规则和客观事实", dimension: "T" },
        { text: "更偏重于情境和人的感受", dimension: "F" }
      ]
    },
    {
      id: 37,
      text: "当你回家开门，你会",
      options: [
        { text: "轻轻打开门，准备进去", dimension: "S" },
        { text: "先用力敲敲门，告诉里面的人你回来了", dimension: "N" }
      ]
    },
    {
      id: 38,
      text: "你觉得对大多数人来说",
      options: [
        { text: "踏实努力比天赋更重要", dimension: "S" },
        { text: "天赋和灵感比努力更重要", dimension: "N" }
      ]
    },
    {
      id: 39,
      text: "你更容易发现",
      options: [
        { text: "系统运行中不合理的地方", dimension: "T" },
        { text: "系统运行中让人不舒服的地方", dimension: "F" }
      ]
    },
    {
      id: 40,
      text: "你希望你的未来是",
      options: [
        { text: "可预见的，有明确方向", dimension: "J" },
        { text: "充满变化，充满可能性", dimension: "P" }
      ]
    },
    {
      id: 41,
      text: "当你在房间里，你会把东西",
      options: [
        { text: "都收拾整理好，放在该放的位置", dimension: "J" },
        { text: "随意摆放，用的时候再找", dimension: "P" }
      ]
    },
    {
      id: 42,
      text: "你认为规则和制度",
      options: [
        { text: "大多数情况下规则是必要的，应该遵守", dimension: "J" },
        { text: "规则常常束缚人，需要灵活变通", dimension: "P" }
      ]
    },
    {
      id: 43,
      text: "你觉得找工作，哪点更重要",
      options: [
        { text: "稳定的待遇和明确的发展路径", dimension: "J" },
        { text: "充满变化和挑战，能学到新东西", dimension: "P" }
      ]
    },
    {
      id: 44,
      text: "你的衣柜和书架",
      options: [
        { text: "整理得井井有条分类清晰", dimension: "J" },
        { text: "东西都在但整理得不算整齐", dimension: "P" }
      ]
    },
    {
      id: 45,
      text: "做决策的时候，你更倾向于",
      options: [
        { text: "早早拍板做决定", dimension: "J" },
        { text: "收集更多信息，推迟决定", dimension: "P" }
      ]
    },
    {
      id: 46,
      text: "你觉得 deadlines（截止日期）",
      options: [
        { text: "帮助你准时完成任务", dimension: "J" },
        { text: "给你带来压力，让人不舒服", dimension: "P" }
      ]
    },
    {
      id: 47,
      text: "你出门旅行之前，你会",
      options: [
        { text: "提前规划好行程和住宿", dimension: "J" },
        { text: "到了目的地再慢慢安排", dimension: "P" }
      ]
    },
    {
      id: 48,
      text: "如果你参加一个聚会，说好结束时间是 11 点，你会",
      options: [
        { text: "准时在 11 点结束离开", dimension: "J" },
        { text: "常常会晚一点走，不急着结束", dimension: "P" }
      ]
    },
    {
      id: 49,
      text: "你觉得自己是一个",
      options: [
        { text: "随性的人", dimension: "P" },
        { text: "有计划的人", dimension: "J" }
      ]
    },
    {
      id: 50,
      text: "你更喜欢",
      options: [
        { text: "知道清楚的任务目标，按要求完成", dimension: "J" },
        { text: "在过程中摸索出最好的方式", dimension: "P" }
      ]
    },
    {
      id: 51,
      text: "当你必须要赞美一个人，你会",
      options: [
        { text: "基于事实，夸奖他具体做得好的地方", dimension: "S" },
        { text: "基于感受，真诚热情地表达赞美", dimension: "N" }
      ]
    },
    {
      id: 52,
      text: "当你读到一篇报道，你更关注",
      options: [
        { text: "报道中具体的数据和事实", dimension: "S" },
        { text: "报道背后揭示的可能性和意义", dimension: "N" }
      ]
    },
    {
      id: 53,
      text: "你觉得哪个更让你满意",
      options: [
        { text: "做好了一件实实在在的事", dimension: "S" },
        { text: "想出了一个创新的好点子", dimension: "N" }
      ]
    },
    {
      id: 54,
      text: "当你听一个演讲者演讲，你更看重",
      options: [
        { text: "演讲的事实和数据是否准确", dimension: "S" },
        { text: "演讲者提出的观点和启发", dimension: "N" }
      ]
    },
    {
      id: 55,
      text: "你认识新朋友时，你会",
      options: [
        { text: "主动自我介绍，找话题聊天", dimension: "E" },
        { text: "等对方先开口，再慢慢熟悉", dimension: "I" }
      ]
    },
    {
      id: 56,
      text: "如果要你在大众面前演讲，你会觉得",
      options: [
        { text: "很兴奋，很享受这个过程", dimension: "E" },
        { text: "有点紧张，希望快点结束", dimension: "I" }
      ]
    },
    {
      id: 57,
      text: "当你要做一个重要的决定时，你通常",
      options: [
        { text: "先找相关的人讨论一下，再做决定", dimension: "E" },
        { text: "自己一个人思考，权衡后做决定", dimension: "I" }
      ]
    },
    {
      id: 58,
      text: "如果一天都没什么社交活动，你会",
      options: [
        { text: "感觉很充电，很满足", dimension: "I" },
        { text: "感觉很无聊，有点闷", dimension: "E" }
      ]
    },
    {
      id: 59,
      text: "在团体活动中，你通常",
      options: [
        { text: "积极参与，发表意见", dimension: "E" },
        { text: "更多是听别人说", dimension: "I" }
      ]
    },
    {
      id: 60,
      text: "你更愿意把自己的想法",
      options: [
        { text: "说出来和大家一起讨论", dimension: "E" },
        { text: "放在心里，等合适的时候再说", dimension: "I" }
      ]
    },
    {
      id: 61,
      text: "你如果要旅行，你更喜欢",
      options: [
        { text: "提前做好详细的行程规划", dimension: "J" },
        { text: "说走就走，到了再看", dimension: "P" }
      ]
    },
    {
      id: 62,
      text: "当你接受了一个新任务，你会",
      options: [
        { text: "马上开始规划和安排", dimension: "J" },
        { text: "先放一放，临近 deadline 再说", dimension: "P" }
      ]
    },
    {
      id: 63,
      text: "你更喜欢工作环境是",
      options: [
        { text: "有明确的职责和流程", dimension: "J" },
        { text: "弹性灵活，可以随时调整", dimension: "P" }
      ]
    },
    {
      id: 64,
      text: "你对待作业和工作的态度是",
      options: [
        { text: "早早完成，心里踏实", dimension: "J" },
        { text: "拖到最后， deadline 才有效率", dimension: "P" }
      ]
    },
    {
      id: 65,
      text: "你买东西的时候，更看重",
      options: [
        { text: "实用够用，满足需求就行", dimension: "S" },
        { text: "设计好看，要有独特风格", dimension: "N" }
      ]
    },
    {
      id: 66,
      text: "当你看一本书，你更喜欢",
      options: [
        { text: "按照作者思路一步步读", dimension: "S" },
        { text: "边读边联想，跳着读也没关系", dimension: "N" }
      ]
    },
    {
      id: 67,
      text: "如果要你解决一个难题，你会",
      options: [
        { text: "一步步收集信息，逐步解决", dimension: "S" },
        { text: "先 brainstorm 找灵感，再验证", dimension: "N" }
      ]
    },
    {
      id: 68,
      text: "你觉得自己更偏向",
      options: [
        { text: "关注当下，脚踏实地", dimension: "S" },
        { text: "关注未来，相信可能性", dimension: "N" }
      ]
    },
    {
      id: 69,
      text: "如果朋友做错了事，你会",
      options: [
        { text: "直接告诉他问题出在哪", dimension: "T" },
        { text: "先照顾他的感受，再慢慢说", dimension: "F" }
      ]
    },
    {
      id: 70,
      text: "当你和别人意见不同，你会",
      options: [
        { text: "坚持自己的观点，用道理说服对方", dimension: "T" },
        { text: "尽量避免冲突，求同存异", dimension: "F" }
      ]
    },
    {
      id: 71,
      text: "你觉得一个团队最重要的是",
      options: [
        { text: "目标明确，流程清晰", dimension: "T" },
        { text: "氛围和谐，大家开心", dimension: "F" }
      ]
    },
    {
      id: 72,
      text: "当你要批评别人，你更倾向于",
      options: [
        { text: "直接指出问题，对事不对人", dimension: "T" },
        { text: "委婉表达，尽量照顾对方感受", dimension: "F" }
      ]
    },
    {
      id: 73,
      text: "你觉得自己更像是",
      options: [
        { text: "头脑冷静，理性思考", dimension: "T" },
        { text: "心肠柔软，容易共情", dimension: "F" }
      ]
    },
    {
      id: 74,
      text: "在谈判中，你会",
      options: [
        { text: "坚持原则，争取最好结果", dimension: "T" },
        { text: "照顾对方情绪，寻求共赢", dimension: "F" }
      ]
    },
    {
      id: 75,
      text: "你做了一个决定之后，通常会",
      options: [
        { text: "相信自己的判断，不怎么后悔", dimension: "T" },
        { text: "会想是不是哪里不对，有点纠结", dimension: "F" }
      ]
    },
    {
      id: 76,
      text: "如果要你选择一份工作，你更看重",
      options: [
        { text: "薪资待遇和发展前景清晰", dimension: "T" },
        { text: "工作氛围好，同事好相处", dimension: "F" }
      ]
    },
    {
      id: 77,
      text: "当你和朋友聊天，你更关心",
      options: [
        { text: "对方说的事情有没有逻辑", dimension: "T" },
        { text: "对方说这件事的时候感受如何", dimension: "F" }
      ]
    },
    {
      id: 78,
      text: "你觉得创新主要来自",
      options: [
        { text: "对现有方法的不断改进", dimension: "S" },
        { text: "跳出框架的全新想法", dimension: "N" }
      ]
    },
    {
      id: 79,
      text: "你更喜欢谈论",
      options: [
        { text: "产品如何改进，现有技术提升", dimension: "S" },
        { text: "未来产品会是什么样子，概念创新", dimension: "N" }
      ]
    },
    {
      id: 80,
      text: "如果让你举办一个派对，你会",
      options: [
        { text: "提前很久就开始计划安排", dimension: "J" },
        { text: "临近了再准备，随性一点", dimension: "P" }
      ]
    },
    {
      id: 81,
      text: "你完成任务的习惯是",
      options: [
        { text: "一步一步按计划完成", dimension: "J" },
        { text: "想到什么做什么，最后赶工", dimension: "P" }
      ]
    },
    {
      id: 82,
      text: "当你看一份报告，你更注意",
      options: [
        { text: "细节是否准确，数据是否正确", dimension: "S" },
        { text: "整体结论是否有启发性", dimension: "N" }
      ]
    },
    {
      id: 83,
      text: "你倾向于",
      options: [
        { text: "把该做的事情做完再玩", dimension: "J" },
        { text: "边玩边做，想到哪做到哪", dimension: "P" }
      ]
    },
    {
      id: 84,
      text: "你更信任",
      options: [
        { text: " accumulated experience（积累的经验）", dimension: "S" },
        { text: "instant inspiration（瞬间的灵感）", dimension: "N" }
      ]
    },
    {
      id: 85,
      text: "如果你不认同一个观点，你会",
      options: [
        { text: "直接指出来，理性讨论", dimension: "T" },
        { text: "避免正面冲突，心里保留意见", dimension: "F" }
      ]
    },
    {
      id: 86,
      text: "你觉得哪个更有价值",
      options: [
        { text: "能够生产出好产品的能力", dimension: "T" },
        { text: "能够让团队凝聚的能力", dimension: "F" }
      ]
    },
    {
      id: 87,
      text: "当你做一个选择，你更看重",
      options: [
        { text: "客观结果是否最优", dimension: "T" },
        { text: "相关各方是否都满意", dimension: "F" }
      ]
    },
    {
      id: 88,
      text: "你更愿意和什么样的人共事",
      options: [
        { text: "能力强，效率高，不讲情面", dimension: "T" },
        { text: "情商高，会照顾人，能力一般", dimension: "F" }
      ]
    },
    {
      id: 89,
      text: "你周末要去哪里玩，你会",
      options: [
        { text: "提前想好去哪里，怎么去", dimension: "J" },
        { text: "周末到了再说，看心情决定", dimension: "P" }
      ]
    },
    {
      id: 90,
      text: "你觉得自己更偏向",
      options: [
        { text: "喜欢把事情都安排好", dimension: "J" },
        { text: "喜欢事情自然发展", dimension: "P" }
      ]
    },
    {
      id: 91,
      text: "当你看别人完成一件作品，你会",
      options: [
        { text: "找出里面的问题和不足", dimension: "T" },
        { text: "先赞美做得好的地方，再慢慢说问题", dimension: "F" }
      ]
    },
    {
      id: 92,
      text: "如果你有一个想法，你会",
      options: [
        { text: "马上说出来和大家讨论", dimension: "E" },
        { text: "自己先想清楚，再和别人说", dimension: "I" }
      ]
    },
    {
      id: 93,
      text: "你更喜欢工作方式是",
      options: [
        { text: "专注一件事，一口气做完", dimension: "J" },
        { text: "可以同时做几件事，轮流做", dimension: "P" }
      ]
    }
  ],
  dimensions: [
    { key: "E", name: "外向", opposite: "I", oppositeName: "内向" },
    { key: "I", name: "内向", opposite: "E", oppositeName: "外向" },
    { key: "S", name: "实感", opposite: "N", oppositeName: "直觉" },
    { key: "N", name: "直觉", opposite: "S", oppositeName: "实感" },
    { key: "T", name: "理智", opposite: "F", oppositeName: "情感" },
    { key: "F", name: "情感", opposite: "T", oppositeName: "理智" },
    { key: "J", name: "判断", opposite: "P", oppositeName: "感知" },
    { key: "P", name: "感知", opposite: "J", oppositeName: "判断" }
  ],
  profiles: {
    "ISTJ": {
      name: "ISTJ-物流师型",
      nickname: "物流师型",
      icon: "📋",
      color: "#2d5f3a",
      summary: "安静、严肃，通过全面性和可靠性获得成功。实际，有责任感。决定有逻辑性，并一步步地朝着目标前进，不易分心。",
      strengths: "重视传统和忠诚，做事认真可靠，注重细节和事实。",
      roles: "首席信息系统执行官、天文学家、数据库管理、会计、房地产经纪人、侦探、行政管理、信用分析师。"
    },
    "ISFJ": {
      name: "ISFJ-守卫者型",
      nickname: "守卫者型",
      icon: "🛡️",
      color: "#4a7f56",
      summary: "安静、友好、有责任感和良知。坚定地致力于完成他们的义务。全面、勤勉、精确，忠诚、体贴。",
      strengths: "留心和记得他们重视的人的小细节，关心他人的感受，努力把工作和家庭环境营造得有序而温馨。",
      roles: "内科医生、营养师、图书/档案管理员、室内装潢设计师、客户服务专员、记账员、特殊教育教师、酒店管理。"
    },
    "INFJ": {
      name: "INFJ-提倡者型",
      nickname: "提倡者型",
      icon: "💡",
      color: "#5a4b8a",
      summary: "寻求思想、关系、物质等之间的意义和联系。希望了解什么能够激励人，对人有很强的洞察力。有责任心，坚持自己的价值观。",
      strengths: "对于怎样更好的服务大众有清晰的远景，在对于目标的实现过程中有计划而且果断坚定。",
      roles: "特殊教育教师、建筑设计师、培训经理/培训师、职业策划咨询顾问、心理咨询师、网站编辑、作家、仲裁人。"
    },
    "INTJ": {
      name: "INTJ-建筑师型",
      nickname: "建筑师型",
      icon: "🏗️",
      color: "#4a3b7a",
      summary: "在实现自己的想法和达成自己的目标时有创新的想法和非凡的动力。能很快洞察到外界事物间的规律并形成长期的远景计划。",
      strengths: "一旦决定做一件事就会开始规划并直到完成为止，多疑、独立，对于自己和他人能力和表现的要求都非常高。",
      roles: "首席财政执行官、知识产权律师、设计工程师、精神分析师、心脏病专家、媒体策划、网络管理员、建筑师。"
    },
    "ISTP": {
      name: "ISTP-鉴赏家型",
      nickname: "鉴赏家型",
      icon: "🔧",
      color: "#3d7c54",
      summary: "灵活、忍耐力强，是个安静的观察者直到有问题发生，就会马上行动，找到实用的解决方法。",
      strengths: "分析事物运作的原理，能从大量的信息中很快的找到关键的症结所在，对于原因和结果感兴趣，用逻辑的方式处理问题，重视效率。",
      roles: "信息服务业经理、计算机程序员、警官、软件开发员、律师助理、消防员、私人侦探、药剂师。"
    },
    "ISFP": {
      name: "ISFP-探险家型",
      nickname: "探险家型",
      icon: "🗺️",
      color: "#5da166",
      summary: "安静、友好、敏感、和善。享受当前，喜欢有自己的空间，喜欢能按照自己的时间表工作。",
      strengths: "对于自己的价值观和自己觉得重要的人非常忠诚，有责任心，不喜欢争论和冲突，不会将自己的观念和价值观强加到别人身上。",
      roles: "室内装潢设计师、按摩师、客户服务专员、服装设计师、厨师、护士、牙医、旅游管理。"
    },
    "INFP": {
      name: "INFP-调停者型",
      nickname: "调停者型",
      icon: "🕊️",
      color: "#6a5ba8",
      summary: "理想主义，对于自己的价值观和自己觉得重要的人非常忠诚。希望外部的生活和自己内心的价值观是统一的。",
      strengths: "好奇心重，很快能看到事情的可能性，能成为实现想法的催化剂，寻求理解别人和帮助他们实现潜能。",
      roles: "心理学家、人力资源管理、翻译、大学教师（人文学科）、社会工作者、图书管理员、服装设计师、编辑/网站设计师。"
    },
    "INTP": {
      name: "INTP-逻辑学家型",
      nickname: "逻辑学家型",
      icon: "🧠",
      color: "#5a4b9a",
      summary: "对于自己感兴趣的任何事物都寻求找到合理的解释。喜欢理论性的和抽象的事物，热衷于思考而非社交活动。",
      strengths: "安静、内向、灵活、适应力强，对于自己感兴趣的领域有超凡的集中精力深度解决问题的能力，多疑，有时会有点挑剔，喜欢分析。",
      roles: "软件设计师、风险投资家、法律仲裁人、金融分析师、大学教师（经济学）、音乐家、知识产权律师、网站设计师。"
    },
    "ESTP": {
      name: "ESTP-企业家型",
      nickname: "企业家型",
      icon: "💼",
      color: "#c86a35",
      summary: "灵活、忍耐力强，实际，注重结果。觉得理论和抽象的解释非常无趣，喜欢积极地采取行动解决问题。",
      strengths: "注重当前，自然不做作，享受和他人在一起的时刻，喜欢物质享受和时尚，学习新事物最有效的方式是通过亲身感受和练习。",
      roles: "企业家、股票经纪人、保险经纪人、土木工程师、旅游管理、职业运动员/教练、电子游戏开发员、房产开发商。"
    },
    "ESFP": {
      name: "ESFP-表演者型",
      nickname: "表演者型",
      icon: "🎭",
      color: "#d87a45",
      summary: "外向、友好、接受力强。热爱生活、人类和物质上的享受。喜欢和别人一起将事情做成功。",
      strengths: "在工作中讲究常识和实用性，并使工作显得有趣，灵活、自然不做作，对于新的任何事物都能很快地适应，学习新事物最有效的方式是和他人一起尝试。",
      roles: "幼教老师、公关专员、职业策划咨询师、旅游管理/导游、促销员、演员、海洋生物学家、销售。"
    },
    "ENFP": {
      name: "ENFP-竞选者型",
      nickname: "竞选者型",
      icon: "📣",
      color: "#6b8cd5",
      summary: "热情洋溢、富有想象力。认为人生有很多的可能性。能很快地将事情和信息联系起来，然后很自信地根据自己的判断解决问题。",
      strengths: "总是需要得到别人的认可，也总是准备着给与他人赏识和帮助，灵活、自然不做作，有很强的即兴发挥的能力，言语流畅。",
      roles: "广告客户管理、管理咨询顾问、演员、平面设计师、艺术指导、公司团队培训师、心理学家、人力资源管理。"
    },
    "ENTP": {
      name: "ENTP-辩论家型",
      nickname: "辩论家型",
      icon: "⚔️",
      color: "#5b7cd5",
      summary: "反应快、睿智，有激励别人的能力，警觉性强、直言不讳。在解决新的、具有挑战性的问题时机智而有策略。",
      strengths: "善于找出理论上的可能性，然后再用战略的眼光分析，善于理解别人，不喜欢例行公事，很少会用相同的方法做相同的事情。",
      roles: "企业家、投资银行家、广告创意总监、市场管理咨询顾问、文案、广播/电视主持人、演员、大学校长。"
    },
    "ESTJ": {
      name: "ESTJ-总经理型",
      nickname: "总经理型",
      icon: "👔",
      color: "#8b4513",
      summary: "实际、现实主义，果断，一旦下决心就会马上行动。善于将项目和人组织起来将事情完成，并尽可能用最有效率的方法得到结果。",
      strengths: "注重日常细节，有一套非常清晰的逻辑标准，有系统性地遵循，并希望他人也同样遵循，在实施计划时强而有力。",
      roles: "公司首席执行官、军官、预算分析师、药剂师、房地产经纪人、保险经纪人、教师（贸易/工商类）、物业管理。"
    },
    "ESFJ": {
      name: "ESFJ-执政官型",
      nickname: "执政官型",
      icon: "👑",
      color: "#9b5523",
      summary: "热心肠、有责任心、合作。希望周边的环境温馨而和谐，并为此果断地执行。喜欢和他人一起精确并及时地完成任务。",
      strengths: "事无巨细都会保持忠诚，能体察到他人在日常生活中的所需并竭尽全力帮助，希望自己和自己的所为能受到他人的认可和赏识。",
      roles: "房地产经纪人、零售商、护士、理货员/采购、按摩师、运动教练、饮食业管理、旅游管理。"
    },
    "ENFJ": {
      name: "ENFJ-主人公型",
      nickname: "主人公型",
      icon: "🎯",
      color: "#4a9f95",
      summary: "热情、为他人着想、易感应、有责任心。非常注重他人的感情、需求和动机，善于发现他人的潜能，并希望能帮助他们实现。",
      strengths: "能成为个人或群体成长和进步的催化剂，忠诚，对于赞扬和批评都会积极地回应，友善、好社交，在团体中能很好地帮助他人，并有鼓舞他人的领导能力。",
      roles: "广告客户管理、杂志编辑、公司培训师、电视制片人、市场专员、作家、社会工作者、人力资源管理。"
    },
    "ENTJ": {
      name: "ENTJ-指挥官型",
      nickname: "指挥官型",
      icon: "⚖️",
      color: "#3a8f85",
      summary: "坦诚、果断，有天生的领导能力。能很快看到公司/组织程序和政策中的不合理性和低效能性，发展并实施有效和全面的系统来解决问题。",
      strengths: "善于做长期的计划和目标的设定，通常见多识广，博览群书，喜欢拓广自己的知识面并将此分享给他人，在陈述自己的想法时非常强而有力。",
      roles: "公司首席执行官、管理咨询顾问、政治家、房产开发商、教育咨询顾问、投资顾问、法官。"
    }
  },
  calculateScores: function(answers) {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    answers.forEach((answer, index) => {
      if (answer === null || answer === undefined) return;
      const question = mbtiTestData.questions[index];
      const dimension = answer.dimension;
      scores[dimension] += 1;
    });
    
    const type = 
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.S > scores.N ? 'S' : 'N') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P');
    
    return { scores, type };
  }
};

export const typeOrder = ["E", "I", "S", "N", "T", "F", "J", "P"];

export const typeLabels = {
  E: "外向",
  I: "内向",
  S: "实感",
  N: "直觉",
  T: "理智",
  F: "情感",
  J: "判断",
  P: "感知"
};

export const mbtiTest = {
  id: "mbti",
  title: "MBTI十六型人格测试",
  eyebrow: "MBTI Personality Test",
  description: "93 题标准版本，从四个维度解读你的人格类型和行为偏好，了解自己的思维方式和人际互动模式。",
  duration: "15-20分钟",
  questionCount: mbtiTestData.questions.length,
  questions: mbtiTestData.questions,
  dimensions: mbtiTestData.dimensions,
  profiles: mbtiTestData.profiles,
  typeOrder,
  typeLabels,
  calculateScores: function(answers) {
    return mbtiTestData.calculateScores(answers);
  }
};
