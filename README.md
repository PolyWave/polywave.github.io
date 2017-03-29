PolyWave Website
===============

# Dependencies

- [Jekyll](https://jekyllrb.com/)
- Node
- Bower (`npm install --global bower`)
- Gulp (`npm install --global gulp-cli`)
- `gem install scss_lint`

## Installation

```
jekyll new . --force
npm install
bower install
gulp // lint the code
bundle exec jekyll serve // serve site locally
```

# CSS

Le projet utilise [SASS](http://sass-lang.com/guide) comme préprocesseur CSS.

On utilise le framework [BASE](http://getbase.org/) pour apporter quelques
éléments de bases (grid, etc.). Il est directement incorporé au css final par
SASS.

