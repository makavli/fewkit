# Fewkit

**One front door to a lean Claude Code setup.** Three small tools that share one way of working: set up well on day one, keep every request light after that, and see where each project stands without opening a session.

Free, MIT, nothing collected. Each tool lives in its own repository with its own releases; Fewkit only lists them and explains how they fit.

| Tool | When | What it does |
|---|---|---|
| [CodeKickoff](https://github.com/makavli/codekickoff) | Day one | Sets the model and effort for the plan you pay for, adds four lean helpers, writes the working rules, a `HANDOFF.md` per project, and an optional safe git workflow. `/codekickoff` |
| [Fewturns](https://github.com/makavli/fewturns) | Every day | Weighs what every request carries and trims it with your yes, names what deserves a second look, and keeps the working rules current. `/fewturns` |
| Laneboard (coming) | All the time | A Windows tray app: every local project at a glance, with a notice when a session stops at a safe point or a check fails. |

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

## How they fit

They share one workflow, so each picks up where the other leaves off:

- **One block of working rules.** CodeKickoff installs Fewturns' rules under Fewturns' own markers in your `CLAUDE.md`. With both installed you get the block once; `/fewturns check` says whether it is the latest, and `/fewturns rules` updates it.
- **The same four helpers.** Both offer the same lean helpers (`scout`, `web-scout`, `worker`, `reviewer`), and neither writes over a helper file that is already there.
- **A handoff per project.** `HANDOFF.md` holds the state now; a new session reads it first. At a safe point its first line reads `SAFE POINT <date>: <where the work stopped>`, and the session offers a fresh start when that is cheaper. Laneboard reads that line to tell you a project is waiting for you.
- **Every change waits for your yes.** No hooks, no background process in the plugins, no account, no key.

## Trust

Each tool says what it reads and writes in its own README and `SECURITY.md`. Fewkit itself is one JSON file and this page: installing from it runs the same code as installing each tool from its own repository.

Fewkit is a community project. It is not made, endorsed or supported by Anthropic. Claude and Claude Code are Anthropic's trademarks, named here only to say what this works with.

## License

[MIT](LICENSE)
