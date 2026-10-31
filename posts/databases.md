---
title: Databases!
date: 2026-10-30
tags: databases, distributed systems
summary: How do they work?
draft: false
---

## A database in seven lines

Databases are quite important to any software but many people don't know how they work!

The simplest form of a database is (stolen from DDIA)...

```bash
db_set () {
    echo "$1:$2" >> db
}

db_get () {
    grep "^$1," db | sed -e "s/^$1,//" | tail -n 1
}
```

That's it. This covers exactly what a simple key-value store does in only 7 lines!

You can store a key-value pair with

```bash
user$ db_set key value
```

and retrieve it with

```bash
user$ db_get key
>> value
```

It's quite simple, `db_set k v` is appending the text `k,v` onto the end of a file and `db_get k` is searching the entire file for the last line (most recent) that starts with `k,` and returning the rest of that line which is `v`.

![Visualization of the simple key-value store](images/simple_kv.png)

It's simple, easy to use, and actually quite efficient! Appending to a file isn't that bad and many real production databases actually use this concept of appending to a log (ex: Cassandra with LSM Trees).

But as your data grows from tens to thousands to millions `db_get` becomes inefficient since it looks at every single record in the worst case.

These kinds of **tradeoffs** are very common in designing systems. In our case `db_set` became very efficient at the cost of `db_get`.

> If your application writes data 99.9% more times than it reads data then this tradeoff makes more sense.

Obviously we are still missing a lot of core features in our database.

- Crash recovery (if you lose that file, you lose your database)
- Queries (we can only do singe item lookups, what if we wanted a range of items?)
- Analytics (what if we wanted to process a large amount of data)
- Data size (As our database grows, it's unreasonable to expect it to fit on one machine)

This still helps us understand that a database has two main functions.

1. Storing the data somewhere
2. Getting back that stored data

We will be exploring these topics in future blogs.
