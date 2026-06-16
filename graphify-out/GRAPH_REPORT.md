# Graph Report - aeq-distribution  (2026-06-15)

## Corpus Check
- 2 files · ~51,897 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 35 nodes · 33 edges · 6 communities (3 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]

## God Nodes (most connected - your core abstractions)
1. `AEQ Distribution Landing Page` - 6 edges
2. `🌐 Deploy` - 3 edges
3. `🚀 Go live in 2 edits` - 2 edges
4. `🖥️ Preview locally` - 2 edges
5. `🎨 Customizing` - 2 edges
6. `📂 Structure` - 2 edges
7. `CONFIG` - 1 edges
8. `themeToggle` - 1 edges
9. `meta` - 1 edges
10. `nav` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (6 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (20): bar, burger, cats, CONFIG, contact, el, form, io (+12 more)

### Community 1 - "Community 1"
Cohesion: 0.5
Nodes (3): AEQ Distribution Landing Page, code:js (const CONFIG = {), 🚀 Go live in 2 edits

### Community 2 - "Community 2"
Cohesion: 0.67
Nodes (3): 🌐 Deploy, GitHub Pages, Netlify / Vercel

## Knowledge Gaps
- **26 isolated node(s):** `CONFIG`, `themeToggle`, `meta`, `nav`, `bar` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AEQ Distribution Landing Page` connect `Community 1` to `Community 2`, `Community 3`, `Community 4`, `Community 5`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `🌐 Deploy` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `CONFIG`, `themeToggle`, `meta` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._