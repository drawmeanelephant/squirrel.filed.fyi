---
title: "Boris + CookLang: Recipe Workflow"
parent: dev/index
tags: [dev, boris, cooklang, recipes, zig]
status: published
summary: How to write, build, and scale CookLang recipes with boris — the good parts and the constraints.
---

# Boris + CookLang: Recipe Workflow

Boris has a CookLang mode. You write `.cook` files, it renders them to
HTML with structured ingredient lists, cookware sections, and ordered
method steps. There's also a `recipe-scale` command that derives scaled
views without rewriting the source. It works. It also has a few sharp
edges worth knowing about before you start filing your grandmother's
recipes.

## What is CookLang

[CookLang](https://cooklang.org/) is a plain-text format for recipes.
Ingredients, cookware, and timers get marked up inline with light syntax;
the rest is just English. A recipe reads like a recipe, not like a
config file.

```cooklang
Pour @olive oil{2%tbsp} into a #pot{} and heat over ~{5%minutes}.
Add @onion{1}(finely chopped) and cook until translucent.
```

The `@` marks ingredients, `{}` holds quantities and units, `#` marks
cookware, `~{}` marks timers. Everything else is prose. The CookLang
[spec](https://cooklang.org/docs/spec/) is short and worth reading.

## The constraint: `.cook`-only trees

Boris's CookLang mode (`--cooklang`) requires a content tree with
**only** `.cook` files. You cannot mix `.cook` and `.md` in the same
input directory. This is the single biggest thing to understand about the
workflow.

```sh
# This fails — mixed extensions
boris build --input content --cooklang
# error: ECOOKLANG: content root mixes Cooklang and non-Cooklang page extensions

# This works — cook-only tree
boris build --input recipes --cooklang --theme lab
```

The reason: boris's markdown adapter and CookLang adapter parse frontmatter
and body differently. Mixing them in one tree would require boris to
detect the format per-file and route accordingly, which it doesn't do yet.
So recipes live in their own directory.

## Recommended directory structure

```
content/           your main site (markdown)
recipes/           your CookLang recipes (standalone)
```

Both are separate boris input trees. The main build processes `content/`,
the recipe build processes `recipes/`. They produce separate `dist/`
output that can be merged or served independently.

## Writing a recipe

A `.cook` file has YAML frontmatter (boris's standard frontmatter keys)
followed by CookLang body:

```cooklang
---
title: Dolly Parton's Coleslaw
tags: [recipes, coleslaw, southern, potluck]
status: draft
summary: Pickle juice adds a special tang.
---

> Pickle juice adds a special tang to Dolly's delicious coleslaw.
> Preparation time: 10 to 12 minutes. Serves 10 to 12.

Chop @cabbage{1%medium head} and place in a large #bowl{}.

Finely chop @onion{1%medium} and add to the bowl.

Sprinkle @sugar{2%tsp}, @black pepper{0.25%tsp}, and @salt{1%tsp}
over the vegetables.

Pour @sweet pickle juice{0.25%cup} and @white vinegar{0.25%cup}
over the mixture.

Add @mayonnaise{1%cup}.

Toss everything together until well combined.

Refrigerate until ready to serve.
```

### Frontmatter rules

Boris frontmatter accepts **exactly eight keys**: `id`, `title`,
`parent`, `tags`, `status`, `summary`, `published_at`, `relations`.
Anything else fails with `EFRONTMATTER`.

CookLang-style metadata like `servings` (with `serves`/`yield` aliases)
is the one exception — boris recognizes it for scaling purposes. Other
CookLang metadata keys (`prep time`, `source`, `author`, etc.) do **not**
go in the frontmatter. Put them in the recipe body as a blockquote or
leave them out.

### CookLang syntax quick reference

| Syntax | Meaning | Example |
|---|---|---|
| `@ingredient` | Ingredient (single word, no braces needed) | `@salt` |
| `@ingredient{name}` | Ingredient (multi-word, braces delimit end) | `@ground black pepper{}` |
| `@ingredient{qty}` | Ingredient with quantity | `@potato{2}` |
| `@ingredient{qty%unit}` | Ingredient with quantity and unit | `@bacon strips{1%kg}` |
| `@ingredient{qty}(prep)` | Ingredient with preparation note | `@onion{1}(finely chopped)` |
| `#cookware` | Cookware (single word) | `#pot` |
| `#cookware{name}` | Cookware (multi-word) | `#baking sheet{}` |
| `~{qty%unit}` | Timer | `~{25%minutes}` |
| `~name{qty%unit}` | Named timer | `~eggs{3%minutes}` |
| `== Section ==` | Section heading | `== Dough ==` |
| `> note` | Note (rendered as blockquote) | `> Don't burn the roux!` |
| `-- comment` | Inline comment (not rendered) | `-- TODO fix this` |

## Building recipes

### Validate

```sh
boris validate --input recipes --cooklang --theme lab
```

Exits 0 if the content tree is valid. This is the zero-write preflight —
run it before declaring anything done.

### Build HTML

```sh
boris build --input recipes --cooklang --theme lab
```

Renders all `.cook` files to HTML using the lab theme. Output lands in
`dist/` alongside your main site output. The rendered page has:

- An **Ingredients** section (parsed from `@` markers, grouped as a list)
- A **Cookware** section (parsed from `#` markers)
- A **Method** section (ordered list of paragraphs, timers rendered inline)

`--cooklang` composes with `--html-dir`, `--target`, `--layout-rule`,
`--incremental`, `--watch`, `--jobs`, and IR/RAG modes. It's a whole-tree
adapter, not a mutually exclusive build mode.

```sh
# Build with explicit output directory
boris build --input recipes --cooklang --html-dir dist/recipes --theme lab

# Build with multi-target
boris build --input recipes --cooklang --target recipes=dist/recipes --theme lab

# Watch mode with serve
boris build --input recipes --cooklang --theme lab --watch --serve
```

### Scale a recipe

```sh
# Scale by factor (double the recipe)
boris recipe-scale --input recipes --id dolly-parton-coleslaw --factor 2 --cooklang

# Scale to a target serving count
boris recipe-scale --input recipes --id dolly-parton-coleslaw --servings 6 --cooklang
```

Both output JSON to stdout with scaled ingredient quantities. The `--id`
is the filename without extension. The `--cooklang` flag is required for
`.cook` input trees. `--factor` and `--servings` are exclusive.

The JSON is a `boris-recipe-scale` envelope:

```json
{
  "format": "boris-recipe-scale",
  "schemaVersion": "0.2.0",
  "compiler": "boris/0.8.1+cooklang",
  "factor": { "num": 2, "den": 1 },
  "page": "dolly-parton-coleslaw",
  "ingredients": [
    {
      "name": "cabbage",
      "quantity": {
        "amount": { "class": "scalable", "original": "1", "scaled": "2" },
        "unit": "medium head"
      },
      "preparation": "",
      "recipeRef": null
    },
    {
      "name": "mayonnaise",
      "quantity": {
        "amount": { "class": "scalable", "original": "1", "scaled": "2" },
        "unit": "cup"
      },
      "preparation": "",
      "recipeRef": null
    }
  ],
  "cookware": [
    { "name": "bowl", "quantity": { "amount": { "class": "empty", "original": "", "scaled": "" }, "unit": "" } }
  ],
  "timers": []
}
```

Key details:
- `factor` is `{num, den}` — a rational number, not a float
- Each amount has a `class`: `scalable` (quantity changes with factor) or
  `fixed` (stays constant — e.g. "1 can" doesn't become "2 cans" when
  scaling by 2)
- Timers are **never scaled** and carry `"scaling": "locked"`
- `recipe-scale` is read-only — it never rewrites `.cook` files or
  `graph.json`

## Integrating with the main site

Since boris can't mix `.cook` and `.md` in one tree, recipes live outside
`content/`. But you still want them in the site's nav, search, and
sitemap. The approach: write both.

1. **`recipes/my-recipe.cook`** — the CookLang source, with structured
   ingredients and scaling support.

2. **`content/log/YYYY-MM-DD-my-recipe.md`** — a standard markdown log
   entry with the recipe written as plain markdown (ingredients as a
   bullet list, directions as a paragraph). Include a note at the bottom
   referencing the `.cook` file for scaling.

The markdown entry gives you nav, search, sitemap, RSS, and the full
site graph. The `.cook` file gives you machine-readable ingredients and
scaling. They're two views of the same recipe.

### Cross-linking

In the markdown entry, reference the `.cook` file:

```markdown
> A CookLang version of this recipe lives at
> `recipes/my-recipe.cook` for scaling and ingredient parsing.
```

In the `.cook` file, reference the log entry via frontmatter:

```yaml
---
title: My Recipe
tags: [recipes]
status: draft
summary: One sentence about the recipe.
parent: log/YYYY-MM
---
```

Note: `parent` in a `.cook` file won't create a graph edge to a `.md`
page — boris's graph is per-tree. The cross-reference is a documentation
convention, not a graph link.

## Gotchas

1. **`.cook` and `.md` cannot share a content tree.** The `--cooklang`
   adapter is a whole-tree mode. You need a separate input directory for
   recipes. This is the primary architectural constraint.

2. **`--servings` needs servings metadata** in the `.cook` file to
   calculate the scaling factor. If the file doesn't have it, the factor
   defaults to 1 (no scaling). Use `--factor` directly if you want
   reliable scaling without depending on frontmatter.

3. **Frontmatter is boris's eight keys, not CookLang's metadata keys.**
   `servings` (with `serves`/`yield` aliases) is the one recognized
   exception. `prep time`, `source`, `author`, `description`, etc. will
   fail with `EFRONTMATTER`. Put those in the recipe body.

4. **No graph edges across trees.** A `.cook` file with `parent: log/2026-08`
   won't create a real parent edge in boris's page graph because the log
   pages live in a different content tree. Cross-references between `.cook`
   and `.md` trees are documentation conventions only.

5. **Scaling is quantity-only.** Timers and cookware quantities are
   locked — `recipe-scale` only scales ingredient amounts. A 25-minute
   timer stays 25 minutes when you double the recipe.

## Full build command reference

```sh
# Validate recipes
boris validate --input recipes --cooklang --theme lab

# Build recipe HTML
boris build --input recipes --cooklang --theme lab

# Build with explicit output directory
boris build --input recipes --cooklang --html-dir dist/recipes --theme lab

# Scale by factor
boris recipe-scale --input recipes --id <page-id> --factor <n> --cooklang

# Scale to serving count
boris recipe-scale --input recipes --id <page-id> --servings <n> --cooklang

# Main site build (separate, processes content/)
boris build --input content --html-dir dist --theme lab --sitemap \
  --site-url https://example.com/ \
  --layout-rule default id:index lab/layouts/trunk.html
```

## Verdict

The CookLang support works. Ingredients parse correctly, scaling produces
accurate JSON with proper `scalable`/`fixed` classification, and the
rendered HTML has proper sections. The main limitation is the
separate-tree constraint — you can't drop a `.cook` file into `content/`
and expect it to Just Work. The dual `.md` + `.cook` approach is a
workaround, not a feature, but it gives you the best of both worlds: site
integration from markdown, machine-readable recipes from CookLang. If
boris ever adds per-file format detection, this whole document gets
shorter. Until then, this is the workflow.
