---
title: Hugo pipeline expo
description: Hugo pipeline expo
draft: true
date: 2021-07-15 22:32:08
categories:
  - Lập trình
tags:
  - cms
  - ssg
  - jamstack
  - hugo
---

Resources:

- [Introduce to Hugo pipelines](https://gohugo.io/hugo-pipes/introduction/)
- [Page resources](https://gohugo.io/content-management/page-resources/)
- [Hugo directory structure](https://gohugo.io/getting-started/directory-structure/)
- [Hugo mountint options](https://gohugo.io/hugo-modules/configuration/#module-config-mounts)

## `assets` vs `static`

`assets`: Stores all the files which need be processed by Hugo Pipes. Only the files whose `.Permalink` or `.RelPermalink` are used will be published to the public directory.

> Note: assets directory is not created by default.

`static`: Stores all the static content: images, CSS, JavaScript, etc. When Hugo builds your site, all assets inside your static directory are copied over as-is. A good example of using the static folder is for verifying site ownership on Google Search Console, where you want Hugo to copy over a complete HTML file without modifying its content.

> From Hugo 0.31 you can have multiple static directories.
