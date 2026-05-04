import test from "node:test";
import assert from "node:assert/strict";

import { calculateScores } from "./wuxing.js";

test("calculateScores returns structured report analysis for wuxing result page", () => {
  const result = calculateScores({
    year: 1994,
    month: 11,
    day: 18,
    hour: 9,
    minute: 0,
    gender: "female"
  });

  assert.ok(result.bazi);
  assert.ok(result.scores);
  assert.ok(result.yongShen);
  assert.ok(Array.isArray(result.dayun));
  assert.ok(result.analysis);

  assert.equal(typeof result.analysis.summaryTitle, "string");
  assert.equal(typeof result.analysis.fullSummary, "string");
  assert.equal(typeof result.analysis.summaryText, "string");
  assert.equal(typeof result.analysis.distributionText, "string");
  assert.equal(typeof result.analysis.dayMasterTraits.title, "string");
  assert.equal(typeof result.analysis.dayMasterTraits.text, "string");
  assert.equal(typeof result.analysis.energyPattern.title, "string");
  assert.equal(typeof result.analysis.energyPattern.text, "string");
  assert.equal(typeof result.analysis.workStyle.title, "string");
  assert.equal(typeof result.analysis.workStyle.text, "string");
  assert.equal(typeof result.analysis.supportingElement.label, "string");
  assert.ok(Array.isArray(result.analysis.supportingElement.recommendations));
  assert.equal(result.analysis.supportingElement.recommendations.length, 4);
  assert.ok(Array.isArray(result.analysis.lifeGuidance));
  assert.equal(result.analysis.lifeGuidance.length, 3);
  assert.equal(typeof result.analysis.dayunSummary, "string");
});

test("calculateScores keeps guidance anchored to strongest and weakest elements", () => {
  const result = calculateScores({
    year: 1988,
    month: 4,
    day: 3,
    hour: 19,
    minute: 0,
    gender: "male"
  });

  assert.equal(result.analysis.supportingElement.key, result.yongShen.xiYong[0]);
  assert.equal(result.analysis.cautionElement.key, result.yongShen.strongest);
  assert.match(result.analysis.summaryText, new RegExp(result.analysis.supportingElement.label));
  assert.match(result.analysis.fullSummary, new RegExp(result.analysis.supportingElement.label));
});
