import { pdpTest } from "./pdp.js";

export const tests = [
    {
        id: "pdp",
        path: "/pdp",
        title: "PDP性格测试",
        icon: "🧭",
        status: "live",
        cardClass: "pdp-card",
        description: "通过 30 道题了解你的行为风格：老虎、孔雀、考拉、猫头鹰、变色龙。",
        tags: ["性格识别", "5-8分钟", "30题"],
        data: pdpTest
    },
    {
        id: "bfti",
        path: "/bfti",
        title: "BFTI暴富TI测试",
        icon: "💸",
        status: "coming-soon",
        cardClass: "bfti-card",
        description: "暴富TI测试筹备中。未来会帮你看看自己的暴富人格、财富直觉和搞钱姿势。",
        tags: ["财富人格", "娱乐测试", "预留"]
    },
    {
        id: "more",
        path: null,
        title: "更多测试",
        icon: "✨",
        status: "placeholder",
        cardClass: "placeholder-card",
        description: "这里会继续放新的测试：关系模式、职场风格、消费人格、灵感雷达等。",
        tags: ["待定", "可扩展"]
    }
];

export function getLiveTest(id) {
    return tests.find((test) => test.id === id && test.status === "live")?.data;
}
