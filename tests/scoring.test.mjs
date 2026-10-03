import assert from 'node:assert/strict';import { valueScore, trendingScore } from '../lib/scoring.mjs';
assert.equal(valueScore({overall:90,coding:90,agentic:90,reasoning:90,input:1,output:1,speed:80}),71);
assert.ok(trendingScore({stars:1000,momentum:80,trust:'Official'})>trendingScore({stars:0,momentum:20,trust:'Warning'}));
console.log('scoring tests passed');
