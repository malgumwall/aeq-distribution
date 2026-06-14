# Graph Report - aeq-distribution  (2026-06-14)

## Corpus Check
- 2 files · ~2,424 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 20 nodes · 18 edges · 5 communities (3 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]

## God Nodes (most connected - your core abstractions)
1. `AEQ Distribution — Landing Page` - 6 edges
2. `🌐 Deploy` - 3 edges
3. `🚀 Go live in 2 edits` - 2 edges
4. `🖥️ Preview locally` - 2 edges
5. `🎨 Customizing` - 2 edges
6. `📂 Structure` - 2 edges
7. `CONFIG` - 1 edges
8. `nav` - 1 edges
9. `burger` - 1 edges
10. `mobile` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (5 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.29
Nodes (6): burger, CONFIG, mobile, nav, open, yr

### Community 1 - "Community 1"
Cohesion: 0.33
Nodes (5): AEQ Distribution — Landing Page, code:block3 (aeq-distribution/), 🎨 Customizing, Notes, 📂 Structure

### Community 2 - "Community 2"
Cohesion: 0.67
Nodes (3): 🌐 Deploy, GitHub Pages, Netlify / Vercel

## Knowledge Gaps
- **12 isolated node(s):** `CONFIG`, `nav`, `burger`, `mobile`, `open` (+7 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AEQ Distribution — Landing Page` connect `Community 1` to `Community 2`, `Community 3`, `Community 4`?**
  _High betweenness centrality (0.345) - this node is a cross-community bridge._
- **Why does `🌐 Deploy` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `🚀 Go live in 2 edits` connect `Community 4` to `Community 1`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `CONFIG`, `nav`, `burger` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._