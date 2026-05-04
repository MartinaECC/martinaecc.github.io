const questions = [
    {
        text: "面对一个新目标时，你通常会怎么做？",
        options: [
            { text: "直接拆目标、定期限，马上推动执行", type: "tiger" },
            { text: "先和大家交流想法，调动团队热情", type: "peacock" },
            { text: "确认节奏是否合理，稳妥推进", type: "koala" },
            { text: "先收集信息，分析风险和细节", type: "owl" }
        ]
    },
    {
        text: "在团队讨论中，你更像是哪种角色？",
        options: [
            { text: "提出方向并推动大家做决定", type: "tiger" },
            { text: "活跃气氛，让讨论更有感染力", type: "peacock" },
            { text: "倾听每个人的意见，减少冲突", type: "koala" },
            { text: "检查逻辑漏洞，补充依据", type: "owl" }
        ]
    },
    {
        text: "别人临时改变计划时，你的第一反应是？",
        options: [
            { text: "判断是否影响结果，必要时快速调整", type: "tiger" },
            { text: "用轻松方式接受变化，重新带动气氛", type: "peacock" },
            { text: "希望大家慢慢适应，不要太突然", type: "koala" },
            { text: "想知道改变的原因和具体影响", type: "owl" }
        ]
    },
    {
        text: "你最看重工作中的哪一点？",
        options: [
            { text: "效率、结果和可衡量的产出", type: "tiger" },
            { text: "认可、创意和人与人的连接", type: "peacock" },
            { text: "稳定、信任和良好的协作关系", type: "koala" },
            { text: "准确、专业和清晰的规则", type: "owl" }
        ]
    },
    {
        text: "你更容易被哪类任务吸引？",
        options: [
            { text: "有挑战、有竞争、能快速见成果", type: "tiger" },
            { text: "需要表达、展示或影响他人", type: "peacock" },
            { text: "需要长期维护、支持他人", type: "koala" },
            { text: "需要研究、整理、优化细节", type: "owl" }
        ]
    },
    {
        text: "当团队出现分歧时，你倾向于？",
        options: [
            { text: "尽快拍板，不让事情停滞", type: "tiger" },
            { text: "用沟通让大家重新积极起来", type: "peacock" },
            { text: "协调双方情绪，寻求共识", type: "koala" },
            { text: "回到事实和标准，理清对错", type: "owl" }
        ]
    },
    {
        text: "你的朋友通常会如何评价你？",
        options: [
            { text: "果断、有主见、行动快", type: "tiger" },
            { text: "热情、外向、有感染力", type: "peacock" },
            { text: "可靠、温和、好相处", type: "koala" },
            { text: "认真、理性、讲原则", type: "owl" }
        ]
    },
    {
        text: "遇到压力时，你更可能表现为？",
        options: [
            { text: "变得更强势，希望快速解决", type: "tiger" },
            { text: "找人聊聊，释放情绪", type: "peacock" },
            { text: "先忍耐，尽量不打扰别人", type: "koala" },
            { text: "反复确认细节，避免出错", type: "owl" }
        ]
    },
    {
        text: "你做决定时通常依赖什么？",
        options: [
            { text: "目标收益和执行速度", type: "tiger" },
            { text: "直觉、兴趣和他人的反馈", type: "peacock" },
            { text: "是否让关系更稳定、大家更舒服", type: "koala" },
            { text: "数据、证据和完整分析", type: "owl" }
        ]
    },
    {
        text: "你更喜欢哪种沟通方式？",
        options: [
            { text: "直接说重点，明确下一步", type: "tiger" },
            { text: "开放聊天，轻松有趣", type: "peacock" },
            { text: "耐心倾听，慢慢沟通", type: "koala" },
            { text: "条理清楚，有事实支撑", type: "owl" }
        ]
    },
    {
        text: "如果要组织一次活动，你会先关注？",
        options: [
            { text: "目标、负责人、时间节点", type: "tiger" },
            { text: "主题是否吸引人，氛围是否热烈", type: "peacock" },
            { text: "参与者是否舒服，安排是否周到", type: "koala" },
            { text: "流程、预算、清单是否完整", type: "owl" }
        ]
    },
    {
        text: "你对规则的态度更接近？",
        options: [
            { text: "规则服务目标，必要时可以突破", type: "tiger" },
            { text: "规则别太死板，要保留发挥空间", type: "peacock" },
            { text: "遵守规则能让大家更安心", type: "koala" },
            { text: "规则越清晰越好，减少错误", type: "owl" }
        ]
    },
    {
        text: "别人向你求助时，你通常会？",
        options: [
            { text: "快速给出解决方案", type: "tiger" },
            { text: "鼓励对方，帮他恢复信心", type: "peacock" },
            { text: "耐心陪伴，给对方安全感", type: "koala" },
            { text: "分析问题根源，给出步骤", type: "owl" }
        ]
    },
    {
        text: "你更不喜欢哪种情况？",
        options: [
            { text: "拖延、低效、没有结果", type: "tiger" },
            { text: "气氛沉闷、没人互动", type: "peacock" },
            { text: "冲突激烈、关系紧张", type: "koala" },
            { text: "信息混乱、标准模糊", type: "owl" }
        ]
    },
    {
        text: "你认为优秀的领导应该是？",
        options: [
            { text: "有魄力，能带队拿结果", type: "tiger" },
            { text: "有魅力，能激发团队热情", type: "peacock" },
            { text: "有耐心，能照顾团队感受", type: "koala" },
            { text: "有专业度，决策严谨可靠", type: "owl" }
        ]
    },
    {
        text: "你进入新环境时更常见的状态是？",
        options: [
            { text: "观察关键人物和规则，快速找到突破口", type: "tiger" },
            { text: "主动认识人，很快融入圈子", type: "peacock" },
            { text: "先安静适应，等熟悉后再投入", type: "koala" },
            { text: "了解流程和信息，确认该怎么做", type: "owl" }
        ]
    },
    {
        text: "你对失败的看法更接近？",
        options: [
            { text: "失败是赢之前的成本，继续冲", type: "tiger" },
            { text: "别太沉重，换个方式再来", type: "peacock" },
            { text: "需要时间消化，再慢慢恢复", type: "koala" },
            { text: "复盘原因，避免重复犯错", type: "owl" }
        ]
    },
    {
        text: "别人给你反馈时，你最希望？",
        options: [
            { text: "直接告诉我哪里要改", type: "tiger" },
            { text: "先肯定亮点，再提出建议", type: "peacock" },
            { text: "语气温和，别让我太有压力", type: "koala" },
            { text: "具体、客观、有依据", type: "owl" }
        ]
    },
    {
        text: "你的时间管理风格更像？",
        options: [
            { text: "抓重点，优先完成关键目标", type: "tiger" },
            { text: "弹性安排，灵感来了效率最高", type: "peacock" },
            { text: "节奏稳定，不喜欢被催促", type: "koala" },
            { text: "清单明确，按计划逐项完成", type: "owl" }
        ]
    },
    {
        text: "你更容易欣赏哪种人？",
        options: [
            { text: "敢决策、敢承担、能赢", type: "tiger" },
            { text: "会表达、有趣、有影响力", type: "peacock" },
            { text: "真诚、稳定、值得信任", type: "koala" },
            { text: "专业、严谨、做事靠谱", type: "owl" }
        ]
    },
    {
        text: "当没有明确指令时，你会？",
        options: [
            { text: "自己判断方向，先做起来", type: "tiger" },
            { text: "找人讨论，激发更多想法", type: "peacock" },
            { text: "等信息更明确，避免给别人添麻烦", type: "koala" },
            { text: "先确认边界和标准，再开始", type: "owl" }
        ]
    },
    {
        text: "你在人际关系中的优势通常是？",
        options: [
            { text: "敢说真话，推动事情前进", type: "tiger" },
            { text: "让人开心，容易建立连接", type: "peacock" },
            { text: "让人放松，愿意被信任", type: "koala" },
            { text: "给人可靠、专业的感觉", type: "owl" }
        ]
    },
    {
        text: "你处理复杂问题时更关注？",
        options: [
            { text: "关键矛盾和决策点", type: "tiger" },
            { text: "能否用更有创意的方式解决", type: "peacock" },
            { text: "对相关人的影响和接受度", type: "koala" },
            { text: "结构、逻辑、数据和细节", type: "owl" }
        ]
    },
    {
        text: "你最希望别人如何与你协作？",
        options: [
            { text: "目标明确，别绕弯", type: "tiger" },
            { text: "积极互动，别太冷淡", type: "peacock" },
            { text: "稳定尊重，别突然施压", type: "koala" },
            { text: "信息完整，别随意变动", type: "owl" }
        ]
    },
    {
        text: "当你想说服别人时，会更倾向于？",
        options: [
            { text: "强调结果和必要性", type: "tiger" },
            { text: "用故事、情绪和愿景打动人", type: "peacock" },
            { text: "让对方感到被理解和支持", type: "koala" },
            { text: "提供证据、逻辑和案例", type: "owl" }
        ]
    },
    {
        text: "你觉得自己最明显的短板可能是？",
        options: [
            { text: "有时太急，容易忽略感受", type: "tiger" },
            { text: "有时太兴奋，容易忽略细节", type: "peacock" },
            { text: "有时太退让，不够主动表达", type: "koala" },
            { text: "有时太谨慎，决策速度偏慢", type: "owl" }
        ]
    },
    {
        text: "你更喜欢的工作环境是？",
        options: [
            { text: "高效率、高挑战、权责清晰", type: "tiger" },
            { text: "开放、有活力、允许创新表达", type: "peacock" },
            { text: "稳定、互助、关系融洽", type: "koala" },
            { text: "专业、规范、有清晰流程", type: "owl" }
        ]
    },
    {
        text: "当你获得成功时，最有成就感的是？",
        options: [
            { text: "目标达成，证明自己能赢", type: "tiger" },
            { text: "被大家看见、认可和喜欢", type: "peacock" },
            { text: "帮助团队稳定前进", type: "koala" },
            { text: "把事情做得精确、漂亮、无差错", type: "owl" }
        ]
    },
    {
        text: "如果必须快速学习新技能，你会？",
        options: [
            { text: "先掌握能立刻产生效果的部分", type: "tiger" },
            { text: "找有趣的入口，边交流边学习", type: "peacock" },
            { text: "按稳定节奏练习，不急于求成", type: "koala" },
            { text: "系统学习原理，再逐步实践", type: "owl" }
        ]
    },
    {
        text: "综合来看，你更希望别人记住你的哪一面？",
        options: [
            { text: "强大、果断、能带来结果", type: "tiger" },
            { text: "热情、有趣、充满感染力", type: "peacock" },
            { text: "温暖、可靠、值得依靠", type: "koala" },
            { text: "理性、专业、值得信赖", type: "owl" }
        ]
    }
];

const typeProfiles = {
    tiger: {
        name: "老虎型",
        icon: "🐯",
        color: "#d84a35",
        tagline: "目标导向的行动派",
        summary: "你倾向于直接、果断、追求效率和结果。面对挑战时，你通常愿意站出来承担责任，并推动事情快速前进。",
        strengths: "决策快、执行强、抗压能力好，适合带领团队突破难题。",
        roles: "管理者、创业者、销售负责人、项目推进者、谈判角色。",
        advice: "沟通时适当放慢节奏，多确认他人的感受和理解度，会让你的影响力更稳定。"
    },
    peacock: {
        name: "孔雀型",
        icon: "🦚",
        color: "#3f7de0",
        tagline: "热情外放的表达者",
        summary: "你重视互动、认可和创造力，擅长用热情感染他人。你通常能让环境变得更轻松，也容易成为团队中的气氛发动机。",
        strengths: "表达力强、社交敏锐、创意丰富，适合影响他人和建立连接。",
        roles: "市场、公关、培训、主持、内容创作、客户关系。",
        advice: "把灵感落到清单和截止时间上，同时补足细节管理，会让你的想法更容易变成成果。"
    },
    koala: {
        name: "考拉型",
        icon: "🐨",
        color: "#699767",
        tagline: "稳定可靠的支持者",
        summary: "你温和、耐心、重视关系稳定，擅长倾听和支持他人。你通常不喜欢冲突，更愿意用持续可靠的方式推进事情。",
        strengths: "稳定、包容、协作性强，能给团队带来安全感和持续性。",
        roles: "运营支持、客户服务、人力资源、项目协调、团队关怀。",
        advice: "遇到关键问题时更主动表达立场，适度拒绝不合理请求，能保护你的能量和边界。"
    },
    owl: {
        name: "猫头鹰型",
        icon: "🦉",
        color: "#8a6bc5",
        tagline: "严谨理性的分析者",
        summary: "你看重准确性、逻辑和规则，做事前倾向于充分了解信息。你通常能发现别人忽略的细节，并提供可靠判断。",
        strengths: "分析深入、标准清晰、质量意识强，适合处理复杂且要求精确的任务。",
        roles: "数据分析、财务、法务、研发、质量管理、策略研究。",
        advice: "在信息不完全时也练习阶段性决策，避免过度追求完美影响推进速度。"
    },
    chameleon: {
        name: "变色龙型",
        icon: "🦎",
        color: "#d09b2f",
        tagline: "灵活平衡的整合者",
        summary: "你的行为风格较均衡，能根据不同场景调整表达方式。你通常擅长观察环境、整合观点，并在不同类型的人之间建立桥梁。",
        strengths: "适应性强、视角全面、协调能力好，适合跨团队和复杂环境。",
        roles: "项目经理、产品经理、顾问、组织协调、综合管理。",
        advice: "保持灵活的同时，也要明确自己的核心原则和优先级，避免过度迎合环境。"
    }
};
