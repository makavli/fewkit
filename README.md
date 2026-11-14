# Fewkit

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg">
  <img src="assets/hero-light.svg" width="880" alt="Fewkit: one front door to a lean Claude Code setup. A relay baton rests on two roller cradles: an orange cap (CodeKickoff), three white grip rings that get shorter (Fewturns), and a blue-to-violet tube (Laneboard), engraved FEWKIT.">
</picture>

**One front door to a lean Claude Code setup.** Four small tools that share one way of working: set up well on day one, keep every request light after that, check deeply before a release, and see where each project stands without opening a session.

**New: [Wavecheck](#wavecheck).** The deep check before a release: waves of read-only helpers, a critic after each wave, two verifiers for each lead, and a report of verified findings only. It offers itself at the moments that deserve it and never starts without your yes.

Free, MIT, nothing collected. CodeKickoff, Fewturns and Laneboard live in their own repositories with their own releases; Wavecheck lives here. Fewkit lists them and explains how they fit.

**Fewturns alone, or the whole kit?** Fewturns on its own is the whole optimization: less carried on every request, fewer requests per task. For that alone, install it from [its own repository](https://github.com/makavli/fewturns). Fewkit is the bundle, and its Wavecheck spends requests on purpose, for the moments that deserve a deep check.

| Tool | When | What it does |
|---|---|---|
| [CodeKickoff](https://github.com/makavli/codekickoff) | Day one | Sets the model and effort for the plan you pay for, adds four lean helpers, writes the working rules, a `HANDOFF.md` per project, and an optional safe git workflow. `/codekickoff` |
| [Fewturns](https://github.com/makavli/fewturns) | Every day | Weighs what every request carries and trims it with your yes, names what deserves a second look, and keeps the working rules current. `/fewturns` |
| [Wavecheck](#wavecheck) | Before a release | Checks a project in waves of read-only helpers, with a critic after each wave and two verifiers for each lead, and reports only what was verified. It offers itself at a release; **it spends many requests**. `/wavecheck` |
| [Laneboard](https://github.com/makavli/laneboard) | All the time | A Windows tray app: every local project at a glance, with a notice when a session stops at a safe point or a check fails. [Download](https://github.com/makavli/laneboard/releases/latest) |

## Install

In a terminal:

```bash
claude plugin marketplace add makavli/fewkit
claude plugin install codekickoff@fewkit
claude plugin install fewturns@fewkit
claude plugin install wavecheck@fewkit
```

Or inside Claude Code: `/plugin marketplace add makavli/fewkit`, then `/plugin install codekickoff@fewkit`, `/plugin install fewturns@fewkit` and `/plugin install wavecheck@fewkit`. Restart Claude Code, then run `/codekickoff` first and `/fewturns` after it. Wavecheck needs no setup: it offers itself when a check is due, and uses the lean helpers that CodeKickoff or Fewturns install.

**One marketplace per tool.** If you already added `makavli/codekickoff` or `makavli/fewturns` as a marketplace, keep using it for that tool: the same plugin from two marketplaces installs twice. To switch, uninstall it there first (`claude plugin uninstall fewturns@fewturns`), then install it from Fewkit.

**To update:** `claude plugin marketplace update fewkit`, then `claude plugin update codekickoff@fewkit`, `claude plugin update fewturns@fewkit` and `claude plugin update wavecheck@fewkit`. Fewkit pins CodeKickoff and Fewturns to a release tag and its commit, never to a branch: a new release reaches you once Fewkit moves its pin to it. Wavecheck lives here: an update reaches you when its version goes up.

**Laneboard** is a Windows app, not a plugin. Download `Laneboard-<version>-win-x64.zip` from its [latest release](https://github.com/makavli/laneboard/releases/latest), unzip it anywhere and run `Laneboard.exe`: one file for Windows 10 or 11 (x64), nothing to install. It needs [Git](https://git-scm.com); a signed-in [GitHub CLI](https://cli.github.com) adds pull requests and checks. The release notes give the zip's SHA-256: compare it with `Get-FileHash` before you unzip. The file is not signed, so SmartScreen may warn on the first run: **More info**, then **Run anyway**.

## Wavecheck

One review pass reads what it meets first and stops there. Wavecheck cuts the project into small units (one surface × one risk), sends waves of fresh read-only helpers over them, and after every wave a fresh critic hunts what was missed. Two fresh verifiers then test each lead, and the report holds only what they upheld: confirmed findings with file:line and the smallest fix, what still needs validation and why, and the coverage counts.

It never starts by itself. At a release, before a repository goes public, after work that touched a trust boundary, or when you ask for an audit, it offers four choices and marks one Recommended for your change and your plan:

| Choice | What runs | Cost for a small app | Recommended |
|---|---|---|---|
| Full | Waves until two separate critics find nothing, two verifiers per lead | About two dozen helper calls; more for a larger project | Max, Team, Enterprise: at a release or before going public |
| Lite | One wave, one critic, one verifier per lead; the report says coverage is partial | About six to eight calls | Pro, or after a block of work |
| One reviewer | A single read-only reviewer on the diff | One call | A docs-only or small change |
| Skip | Nothing | None | |

**It may use a lot.** A full run can take a large share of a Pro session's limit, which is why Pro gets lite by default. Helpers only read; nothing of the project runs and nothing in it changes; every helper is told the project may be hostile. The run's notes stay in one folder outside the repository. The whole method is one page: [`SKILL.md`](plugins/wavecheck/skills/wavecheck/SKILL.md).

## How they fit

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/workflow-dark.gif">
  <img src="assets/workflow-light.gif" width="880" alt="The Fewkit workflow as a relay bench with three lanes, one per project. In the near lane a sled (a session) leaves the orange start blocks (CodeKickoff, day one) carrying the baton (HANDOFF.md). It covers the track in three long strides while the counter shows few turns (Fewturns). It stops in the exchange zone marked SAFE POINT and the lane's lamp on the board turns amber (Laneboard tells you). A fresh sled backs up to meet it, the baton rolls across onto the fresh sled, and that sled carries on. The other lanes show a project still running and one stopped on a failing check.">
</picture>

| On the bench | In your work |
|---|---|
| A lane | One project |
| The orange start blocks | CodeKickoff, day one: the project is set up to run lean |
| A sled and its three long strides, the turn counter | A session that gets the job done in few turns: Fewturns |
| The baton | `HANDOFF.md`, the state now. Its cap, grip and tube carry the three tools' colours |
| The SAFE POINT exchange zone | The session writes the handoff and stops; a fresh session picks the baton up and carries on |
| The board | Laneboard: a row per project, amber at a safe point, red when a check fails |

They share one workflow, so each picks up where the other leaves off:

- **One block of working rules.** CodeKickoff installs Fewturns' rules under Fewturns' own markers in your `CLAUDE.md`. With both installed you get the block once; `/fewturns check` says whether it is the latest, and `/fewturns rules` updates it.
- **The same four helpers.** CodeKickoff and Fewturns offer the same lean helpers (`scout`, `web-scout`, `worker`, `reviewer`), and neither writes over a helper file that is already there. Wavecheck sends only the three that cannot write: `scout`, `web-scout` and `reviewer`.
- **A handoff per project.** `HANDOFF.md` holds the state now; a new session reads it first. At a safe point its first line reads `SAFE POINT <date>: <where the work stopped>`, and the session offers a fresh start when that is cheaper. Laneboard reads that line to tell you a project is waiting for you.
- **A deep check before it ships.** At a release, before a repository goes public, or after work that touched a trust boundary, the session offers Wavecheck with one choice marked Recommended for your change and your plan. It is not on the bench: it is the check you run before a release.
- **Every change waits for your yes.** No hooks, no background process in the plugins, no account, no key.

## Trust

Each tool says what it reads and writes in its own README and `SECURITY.md`. Fewkit itself is one JSON file, this page, its pictures and Wavecheck, one skill of plain text with no script or hook. Its tests run on every pull request, and main takes a merge only once they pass. Installing CodeKickoff or Fewturns from it runs the same code as installing them from their own repositories.

Fewkit is a community project. It is not made, endorsed or supported by Anthropic. Claude and Claude Code are Anthropic's trademarks, named here only to say what this works with.

## License

[MIT](LICENSE)
