import { pdpTest } from "./pdp.js";
import { bftiTest } from "./bfti.js";
import { mbtiTest } from "./mbti.js";
import { wuxingTest } from "./wuxing.js";

export const tests = [
    {
        id: "bfti",
        path: "/bfti",
        title: "BFTI暴富性格测试",
        icon: "BFTI",
        status: "live",
        badge: "大家都在玩",
        cardClass: "bfti-card",
        description: "一个关于财富动机、风险偏好与行动模式的轻量探索测试，看看你是哪种暴富体质？",
        tags: ["财富人格", "5-8分钟", "30题"],
        data: bftiTest
    },
    {
        id: "wuxing",
        path: "/wuxing",
        title: "五行能量测试",
        icon: "五行",
        status: "live",
        badge: "限时免费",
        cardClass: "wuxing-card",
        description: "输入出生时间，测算你的八字格局与五行能量分布，找到五行喜用方向。",
        tags: ["八字命理", "1分钟", "出生日期"],
        data: wuxingTest
    },
    {
        id: "pdp",
        path: "/pdp",
        title: "PDP领导力性格测试",
        icon: "PDP",
        status: "live",
        badge: "10928 人测过",
        cardClass: "pdp-card",
        description: "从五种行为风格理解你的表达方式、决策习惯与协作倾向。",
        tags: ["行为风格", "5-8分钟", "30题"],
        data: pdpTest
    },
    {
        id: "mbti",
        path: "/mbti",
        title: "MBTI十六型人格",
        icon: "MBTI",
        status: "live",
        badge: "热门",
        cardClass: "mbti-card",
        description: "93 题标准版本，从四个维度解读你的人格类型和行为偏好。",
        tags: ["人格类型", "15-20分钟", "93题"],
        data: mbtiTest
    },
    {
        id: "more",
        path: null,
        title: "更多测试",
        icon: "NEXT",
        status: "placeholder",
        cardClass: "placeholder-card",
        description: "后续会逐步加入关系模式、职场风格、消费人格与更多自我探索主题。",
        tags: ["后续计划", "可扩展"]
    }
];

export function getLiveTest(id) {
    return tests.find((test) => test.id === id && test.status === "live")?.data;
}
