---
title: Why I keep coming back to write-ahead logs
date: 2026-09-28
tags: databases, storage
summary: A tiny idea that quietly holds up half the systems I use.
---

Almost every durable system I find interesting has the same trick hiding inside it: write down what you're about to do _before_ you do it.

## The core idea

Append the intent to a log, flush it, then apply the change. If the machine dies halfway, replay the log on restart.

```
append(entry)
fsync()
apply(entry)
```

![The write path: client, log, then table](images/sample-diagram.svg)

> Durability is mostly a question of what order you do things in.

That's the whole post. Replace it with your own writing.
