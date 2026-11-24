// Self-check of the Atlas URL slugs and text formats. Usage: npm run atlas:check
import { slug, fmt, wow } from '../../src/lib/atlas/i18n.ts';
import assert from 'node:assert/strict';
assert.equal(slug("Prisión de Alcaz"), 'prision-de-alcaz');
assert.equal(slug("Krol'dok Stronghold"), 'kroldok-stronghold');
assert.equal(slug("Schwarzmaulfeste: Groß"), 'schwarzmaulfeste-gross');
assert.equal(slug("Тюрьма Алказ"), 'тюрьма-алказ');
assert.equal(slug("Крепость Йорк"), 'крепость-йорк');
assert.equal(slug("알카즈 감옥"), '알카즈-감옥');
assert.equal(slug("奥卡兹监狱"), '奥卡兹监狱');
assert.equal(fmt('%1 of %2', 'a', 3), 'a of 3');
assert.equal(wow('|cff00ff00Level|r %d (%s) 50%%', 5, 'x'), 'Level 5 (x) 50%');
console.log('ok');
