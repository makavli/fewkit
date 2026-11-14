# Fewkit

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg">
  <img src="assets/hero-light.svg" width="880" alt="Fewkit: one front door to a lean Claude Code setup. A relay baton rests on two roller cradles: an orange cap (CodeKickoff), three white grip rings that get shorter (Fewturns), and a blue-to-violet tube (Laneboard), engraved FEWKIT.">
</picture>

**One front door to a lean Claude Code setup.** Three small tools that share one way of working: set up well on day one, keep every request light after that, and see where each project stands without opening a session.

Free, MIT, nothing collected. Each tool lives in its own repository with its own releases; Fewkit only lists them and explains how they fit.

| Tool | When | What it does |
|---|---|---|
| [CodeKickoff](https://github.com/makavli/codekickoff) | Day one | Sets the model and effort for the plan you pay for, adds four lean helpers, writes the working rules, a `HANDOFF.md` per project, and an optional safe git workflow. `/codekickoff` |
| [Fewturns](https://github.com/makavli/fewturns) | Every day | Weighs what every request carries and trims it with your yes, names what deserves a second look, and keeps the working rules current. `/fewturns` |
| [Laneboard](https://github.com/makavli/laneboard) | All the time | A Windows tray app: every local project at a glance, with a notice when a session stops at a safe point or a check fails. [Download](https://github.com/makavli/laneboard/releases/latest) |

## Install

In a terminal:

```bash
claude plugin marketplace add makavli/fewkit
claude plugin install codekickoff@fewkit
claude plugin install fewturns@fewkit
```

Or inside Claude Code: `/plugin marketplace add makavli/fewkit`, then `/plugin install codekickoff@fewkit` and `/plugin install fewturns@fewkit`. Restart Claude Code, then run `/codekickoff` first and `/fewturns` after it.

**One marketplace per tool.** If you already added `makavli/codekickoff` or `makavli/fewturns` as a marketplace, keep using it for that tool: the same plugin from two marketplaces installs twice. To switch, uninstall it there first (`claude plugin uninstall fewturns@fewturns`), then install it from Fewkit.

**To update:** `claude plugin marketplace update fewkit`, then `claude plugin update codekickoff@fewkit` and `claude plugin update fewturns@fewkit`. Fewkit always lists each tool's latest release.

**Laneboard** is a Windows app, not a plugin. Download `Laneboard-<version>-win-x64.zip` from its [latest release](https://github.com/makavli/laneboard/releases/latest), unzip it anywhere and run `Laneboard.exe`: one file for Windows 10 or 11 (x64), nothing to install. It needs [Git](https://git-scm.com); a signed-in [GitHub CLI](https://cli.github.com) adds pull requests and checks. The release notes give the zip's SHA-256: compare it with `Get-FileHash` before you unzip. The file is not signed, so SmartScreen may warn on the first run: **More info**, then **Run anyway**.

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
- **The same four helpers.** Both offer the same lean helpers (`scout`, `web-scout`, `worker`, `reviewer`), and neither writes over a helper file that is already there.
- **A handoff per project.** `HANDOFF.md` holds the state now; a new session reads it first. At a safe point its first line reads `SAFE POINT <date>: <where the work stopped>`, and the session offers a fresh start when that is cheaper. Laneboard reads that line to tell you a project is waiting for you.
- **Every change waits for your yes.** No hooks, no background process in the plugins, no account, no key.

## Trust

Each tool says what it reads and writes in its own README and `SECURITY.md`. Fewkit itself is one JSON file, this page and its pictures: installing from it runs the same code as installing each tool from its own repository.

Fewkit is a community project. It is not made, endorsed or supported by Anthropic. Claude and Claude Code are Anthropic's trademarks, named here only to say what this works with.

## License

[MIT](LICENSE)
