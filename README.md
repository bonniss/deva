# Bonniss Blog

[nauda.dev](https://nauda.dev) - my personal blog powered by [Hugo](https://gohugo.io/getting-started/quick-start/)

## Getting started

```zsh
# download all themes, use one of these
git submodule update --init --recursive
git submodule update --remote

# or download a single theme
git submodule update --init --remote themes/digitalgarden

# start the server with `draft` enabled
hugo server -D

# build static pages
# Output will be in `./public/` directory by default (`-d`/`--destination` flag to change it, or set `publishdir` in the config file)
hugo -D
```

## FAQ

### How to install new theme

```bash
# clone as simple folder
cd themes
git clone https://github.com/apvarun/digital-garden-hugo-theme.git

# clone as a submodule
git submodule add https://github.com/apvarun/digital-garden-hugo-theme.git themes/digitalgarden
```

### How to change highlight.js style

[Download styles here](https://github.com/highlightjs/highlight.js/tree/main/src/styles), and copy to `assets/css/extended`.

### Ideas

- Dùng biểu thức toán học trong Hugo: Katex và Papermod
- Dùng petite-vue và alpine.js trong Hugo: xung đột templating delimiter
- Tích hợp codemirror
- Learn golang
  - [Official docs]()
  - https://github.com/SimonWaldherr/golang-examples
  - https://github.com/Alikhll/golang-developer-roadmap
  - https://www.youtube.com/watch?v=1MXIGYrMk80
