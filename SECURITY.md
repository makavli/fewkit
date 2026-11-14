# Security

## What is in scope

Fewkit is one JSON file, `.claude-plugin/marketplace.json`, and its README. The file tells Claude Code where to install two plugins from: `makavli/codekickoff` and `makavli/fewturns` on GitHub. Fewkit ships no code of its own.

A security problem here is anything that could make installing from Fewkit fetch something other than those two repositories: a source that points elsewhere, a plugin the README does not name, or an install step in the README that does more than it says.

A problem in a tool's own files belongs to that tool: report it to [CodeKickoff](https://github.com/makavli/codekickoff/security) or [Fewturns](https://github.com/makavli/fewturns/security).

## Supported versions

The latest version is supported. It is always the tip of `main`.

## Reporting a problem

Please do not open a public issue. Report it privately through GitHub's [private vulnerability reporting](https://github.com/makavli/fewkit/security/advisories/new) for this repository, with what you found, how to reproduce it and what it could let someone do.

## Installing safely

Add Fewkit only as `makavli/fewkit`. Its marketplace file lists exactly two sources, `makavli/codekickoff` and `makavli/fewturns`; a copy that lists anything else is not this project.
