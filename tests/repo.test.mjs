// Checks on the repository itself: the marketplace, the plugin it hosts, Wavecheck's promises, links, and that no machine left a trace.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const text = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const json = (p) => JSON.parse(text(p));
// Tracked files plus new ones git does not ignore: what a commit would ship.
const all = execFileSync('git', ['ls-files', '-co', '--exclude-standard'], { cwd: root, encoding: 'utf8' }).split('\n').filter((f) => f && existsSync(join(root, f)));
const market = json('.claude-plugin/marketplace.json');
const local = market.plugins.filter((p) => typeof p.source === 'string');

// The few header shapes a skill uses: `key: value`, quotes, and a `>` block.
function frontmatter(body) {
  const head = /^---\n([\s\S]*?)\n---\n/.exec(body)?.[1] ?? '';
  const out = {};
  let key = null;
  for (const line of head.split('\n')) {
    const top = /^([\w-]+):\s*(.*)$/.exec(line);
    if (top) { key = top[1]; out[key] = top[2] === '>' ? '' : top[2].replace(/^"(.*)"$/, '$1'); }
    else if (key && line.trim()) out[key] += (out[key] ? ' ' : '') + line.trim();
  }
  return out;
}

test('the marketplace lists each plugin once, from our repositories or this one', () => {
  const names = market.plugins.map((p) => p.name);
  assert.deepEqual(names, [...new Set(names)], 'a plugin is listed twice');
  for (const p of market.plugins) {
    if (typeof p.source === 'string') assert.match(p.source, /^\.\/plugins\/[a-z-]+$/, `${p.name}: a local source stays under plugins/`);
    else {
      const { ref, sha, ...rest } = p.source;
      assert.deepEqual(rest, { source: 'github', repo: `makavli/${p.name}` }, `${p.name}: an unexpected source`);
      assert.match(ref ?? '', /^v\d+\.\d+\.\d+$/, `${p.name}: pin a release tag, never a branch`);
      assert.match(sha ?? '', /^[0-9a-f]{40}$/, `${p.name}: pin the tag's commit as a full sha`);
    }
    assert.ok(text('README.md').includes(`install ${p.name}@fewkit`), `the README does not install ${p.name}`);
    assert.ok(text('SECURITY.md').includes(typeof p.source === 'string' ? p.source : p.source.repo), `SECURITY.md does not name ${p.name}'s source`);
  }
});

test('each local plugin is one skill of text: no hooks, servers or scripts', () => {
  assert.ok(local.length > 0);
  for (const p of local) {
    const dir = p.source.slice(2);
    const plugin = json(`${dir}/.claude-plugin/plugin.json`);
    assert.equal(plugin.name, p.name);
    assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
    assert.deepEqual(readdirSync(join(root, dir, 'skills')), [p.name]);
    const skill = frontmatter(text(`${dir}/skills/${p.name}/SKILL.md`));
    assert.equal(skill.name, p.name);
    assert.ok(skill.description.length <= 400, `${p.name}: the description is ${skill.description.length} characters`);
    // A closed list: a manifest key, a header field or an extra file could bring hooks, servers or agents.
    assert.deepEqual(all.filter((f) => f.startsWith(`${dir}/`)).sort(), [`${dir}/.claude-plugin/plugin.json`, `${dir}/skills/${p.name}/SKILL.md`], `${p.name} ships more than one skill`);
    assert.deepEqual(Object.keys(plugin).filter((k) => !['name', 'version', 'description', 'author', 'homepage', 'repository', 'license', 'keywords'].includes(k)), [], `${p.name}: plugin.json has a key that loads something`);
    assert.deepEqual(Object.keys(skill).filter((k) => !['name', 'description', 'argument-hint', 'license'].includes(k)), [], `${p.name}: SKILL.md has a header field that loads something`);
  }
});

test('Wavecheck offers before it runs, has both runs, and sends only helpers that cannot write', () => {
  const page = text('plugins/wavecheck/skills/wavecheck/SKILL.md');
  const section = (name) => page.split(`\n## ${name}\n`)[1]?.split('\n## ')[0] ?? '';
  assert.match(frontmatter(page)['argument-hint'], /lite\|full/);
  assert.match(section('Offer'), /Never start a run without a yes/);
  assert.match(section('Offer'), /On Pro[^\n]*\*\*lite\*\*/, 'the offer must steer Pro plans to lite');
  assert.deepEqual(section('full').match(/^\d\. \*\*/gm), ['1. **', '2. **', '3. **', '4. **', '5. **', '6. **']);
  assert.equal(section('lite').match(/^\d\. \*\*/gm)?.length, 5);
  for (const line of page.split('\n')) {
    if (/`(worker|general-purpose)`/.test(line)) assert.match(line, /^\s*- Never/, `Wavecheck sends a helper that can write: ${line.trim().slice(0, 80)}`);
  }
  assert.match(page, /tools line of `scout` and `reviewer` may hold only Read, Grep and Glob/);
  assert.match(section('Helpers'), /~\/\.claude\/agents\/<name>\.md` and the `\.claude\/agents\/<name>\.md` of this folder and of every folder above it up to the repository root/, 'every scope is checked');
  assert.match(section('Helpers'), /`mcpServers`, `hooks`, `permissionMode`/, 'fields beyond tools are checked');
  assert.match(section('Offer'), /never from the target's/, 'the plan comes from the user, not the target');
  assert.match(page, /`find \. -type l`/, 'the target path is never typed into a double-quoted command');
  assert.match(page, /`gh pr diff <number> --repo <owner>\/<repo>` run from that folder/, 'a pull request is fetched one fixed way, outside the target');
  assert.match(page, /`cd -P -- '<path>'`[^\n]*`pwd -P`/, 'the target path is single-quoted, and a link on the way is caught');
  assert.ok(!/find "</.test(page));
});

test('relative links and images resolve', () => {
  for (const file of all.filter((f) => f.endsWith('.md'))) {
    const body = text(file).replace(/```[\s\S]*?```/g, '');
    const targets = [...body.matchAll(/\]\(([^)#\s]+)(#[^)]*)?\)/g), ...body.matchAll(/(?:src|srcset|href)="([^"#]+)(#[^"]*)?"/g)].map((m) => m[1]);
    for (const target of targets) {
      if (/^[a-z]+:/i.test(target)) continue;
      assert.ok(existsSync(join(root, dirname(file), target)), `${file} links to ${target}`);
    }
  }
});

test('no machine left a trace: no home folders, addresses, e-mails or keys', () => {
  const traces = /[A-Z]:[\\/]Users[\\/]|\/home\/[a-z]|\/Users\/[a-z]|AppData|[\w.+-]+@[\w-]+\.[a-z]{2,}|\b\d{1,3}(\.\d{1,3}){3}\b|gh[pos]_[A-Za-z0-9]{20,}|BEGIN [A-Z ]*PRIVATE KEY/;
  for (const file of all.filter((f) => !/\.gif$/.test(f) && f !== 'tests/repo.test.mjs')) { // this file holds the pattern itself
    for (const line of text(file).split('\n')) assert.ok(!traces.test(line), `${file}: ${line.trim().slice(0, 120)}`);
  }
});

test('the pictures are only pictures: no script or outside address in an SVG, no text block in a GIF', () => {
  for (const file of all.filter((f) => f.endsWith('.svg'))) {
    assert.ok(!/<script|\son[a-z]+\s*=|javascript:|<foreignObject|\bhref\s*=|url\(\s*['"]?(?!#)|@import/i.test(text(file)), `${file} holds active or outside content`);
  }
  for (const file of all.filter((f) => f.endsWith('.gif'))) {
    const b = readFileSync(join(root, file));
    const blocks = (i) => { while (b[i]) i += b[i] + 1; return i + 1; }; // skips data sub-blocks
    const table = (packed) => (packed & 0x80 ? 3 << ((packed & 7) + 1) : 0);
    let i = 13 + table(b[10]);
    const found = [];
    while (b[i] !== 0x3b) {
      assert.ok(i < b.length, `${file}: no trailer`);
      if (b[i] === 0x21) {
        found.push(b[i + 1]);
        if (b[i + 1] === 0xff) assert.equal(b.toString('latin1', i + 3, i + 14), 'NETSCAPE2.0', `${file}: an unknown application block`);
        i = blocks(i + 2);
      } else {
        assert.equal(b[i], 0x2c, `${file}: an unknown block at ${i}`);
        i = blocks(i + 11 + table(b[i + 9]));
      }
    }
    assert.ok(found.every((x) => x === 0xf9 || x === 0xff), `${file} holds a comment or text block`);
    assert.equal(i, b.length - 1, `${file} has bytes after its end`);
  }
});

test('only what a marketplace needs ships: text, the pictures, nothing over 1 MB', () => {
  for (const file of all) {
    assert.match(file, /\.(md|mjs|json|svg|gif)$|^(LICENSE|\.gitattributes)$/, `unexpected file type: ${file}`);
    assert.ok(statSync(join(root, file)).size < 1_000_000, `${file} is too large`);
  }
});
