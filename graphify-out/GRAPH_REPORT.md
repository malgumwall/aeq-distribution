# Graph Report - aeq-distribution  (2026-06-15)

## Corpus Check
- 2 files · ~85,867 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 30 nodes · 28 edges · 3 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]

## God Nodes (most connected - your core abstractions)
1. `AEQ Distribution Landing Page` - 6 edges
2. `🌐 Deploy` - 3 edges
3. `🚀 Go live in 2 edits` - 2 edges
4. `🖥️ Preview locally` - 2 edges
5. `🎨 Customizing` - 2 edges
6. `📂 Structure` - 2 edges
7. `CONFIG` - 1 edges
8. `nav` - 1 edges
9. `bar` - 1 edges
10. `burger` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (3 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (15): bar, burger, cats, CONFIG, contact, el, form, io (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.2
Nodes (9): AEQ Distribution Landing Page, code:js (const CONFIG = {), code:bash (# Python), code:block3 (aeq-distribution/), 🎨 Customizing, 🚀 Go live in 2 edits, Notes, 🖥️ Preview locally (+1 more)

### Community 2 - "Community 2"
Cohesion: 0.67
Nodes (3): 🌐 Deploy, GitHub Pages, Netlify / Vercel

## Knowledge Gaps
- **21 isolated node(s):** `CONFIG`, `nav`, `bar`, `burger`, `mobile` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AEQ Distribution Landing Page` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `🌐 Deploy` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `CONFIG`, `nav`, `bar` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._