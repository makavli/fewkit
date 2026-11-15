# Wavecheck

A deep check in waves before a release, for Claude Code. Wavecheck cuts a project into small units (one surface × one risk) and sends waves of fresh read-only helpers over them. After every wave a fresh critic looks for what was missed, two fresh verifiers then test each lead, and the report holds only verified findings.

It never starts by itself. At a release, before a repository goes public, after work that touched a trust boundary, or when asked, it offers four choices (full, lite, one reviewer, skip) and marks one Recommended for the change and the plan. Helpers only read. The run folder stays outside the repository, on the user's machine.

One skill of text: no script, no hook, no server, nothing collected. Part of [Fewkit](https://github.com/makavli/fewkit):

```bash
claude plugin marketplace add makavli/fewkit
claude plugin install wavecheck@fewkit
```

MIT.
