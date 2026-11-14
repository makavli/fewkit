# Security

## What is in scope

Fewkit is one marketplace file, `.claude-plugin/marketplace.json`, its README, and one plugin of its own: Wavecheck, in `plugins/wavecheck/`. The marketplace file tells Claude Code where to install three plugins from: `makavli/codekickoff` and `makavli/fewturns` on GitHub, each pinned to a release tag (`ref`) and its commit (`sha`), and `plugins/wavecheck` in this repository. Wavecheck is one skill, text that Claude reads: no script, no hook, no server. Its tests run in `.github/workflows/`, with a token that can only read, except the job that opens and closes an issue while the checks are red; a fork's pull request gets no issue.

A security problem here is anything that could make installing from Fewkit fetch something other than those three sources: a source that points elsewhere or follows a branch instead of a release tag and its commit, a plugin the README does not name, or an install step in the README that does more than it says. In the workflows, it is anything that could let a pull request run with more than a read-only token. In Wavecheck, it is anything in its text that could lead the agent to change the target, run its code, send a helper that can write, or carry data from the target to the web.

A problem in another tool's own files belongs to that tool: report it to [CodeKickoff](https://github.com/makavli/codekickoff/security) or [Fewturns](https://github.com/makavli/fewturns/security).

## Supported versions

The latest version is supported. It is always the tip of `main`.

## Reporting a problem

Please do not open a public issue. Report it privately through GitHub's [private vulnerability reporting](https://github.com/makavli/fewkit/security/advisories/new) for this repository, with what you found, how to reproduce it and what it could let someone do.

## Installing safely

Add Fewkit only as `makavli/fewkit`. Its marketplace file lists exactly three sources, `makavli/codekickoff`, `makavli/fewturns` and `./plugins/wavecheck`; a copy that lists anything else is not this project.
