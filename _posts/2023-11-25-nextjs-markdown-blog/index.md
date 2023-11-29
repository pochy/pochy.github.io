---
title: Next.js で Markdown を使用したブログを作成
createdAt: 2023-11-30T00:00:45.855
updatedAt: 2023-11-30T00:00:46.388
description: Next.js で Markdown を使用したブログを作成を作成しました。
coverImage: /assets/blog/nextjs-markdown-blog.png
draft: true
tags:
  - next.js
  - markdown
categories:
  - develop
author:
  name: ""
  picture: ""
ogImage:
  url: /assets/blog/nextjs-markdown-blog.png
keywords:
  - Next.js
slug: 2023-11-25-nextjs-markdown-blog
---

# Next.js で Markdown を使用したブログを作成

こんにちは！これは私の新しいブログの最初の投稿です。

Next.js、TypeScript、そしていくつかの素晴らしいライブラリを使って Markdown を活用したブログを作成しました。

## 使用技術

このブログは執筆時点で Next.js 14.0.3 上に App Router を用いて構築しています。最初は Pages Router にしていましたが、学習も兼ねているので新しく登場した App Router に途中で切り替えました。

- **[Next.js](https://nextjs.org/)**: このプロジェクトの基盤となるフレームワークです。Next.js の App Router を活用して、ルーティングを簡単かつ効率的に管理しています。
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScriptのスーパーセットとして、型安全性と開発効率の向上をもたらします。

## デザインライブラリ

デザインに関しては、以下のライブラリを採用しています：

- **[Tailwind CSS](https://tailwindcss.com/)**: 効率的なスタイリングを可能にするユーティリティファーストのCSSフレームワークです。このフレームワークを使用することで、迅速にレスポンシブなデザインを実装できます。
- **[shadcn/ui](https://ui.shadcn.com/)**: 現代的なUIコンポーネントを提供し、簡単に美しいインターフェースを構築できます。
- **[Radix UI](https://www.radix-ui.com/)**: アクセシビリティに優れた低レベルのUIコンポーネントを提供します。このライブラリはカスタマイズが容易で、デザインシステムに簡単に統合できます。

## アイコン

- **[Radix Icons](https://www.radix-ui.com/icons)**
- **[Lucide | Lucide](https://lucide.dev/)**

## 使用ライブラリについて

このプロジェクトでは、以下のライブラリを使用しています：

- **[react-markdown](https://github.com/remarkjs/react-markdown)**: MarkdownをReactコンポーネントに変換します。これにより、記事の内容をMarkdownで簡単に記述し、動的にレンダリングできます。
- **[remark-gfm](https://github.com/remarkjs/remark-gfm)**: GitHub Flavored Markdownをサポートし、拡張機能やカスタムレンダリングを可能にします。
- **[remark-math](https://github.com/remarkjs/remark-math)** と **[rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex)**: 数学的表現をMarkdown内で簡単に記述し、方程式のレンダリングに役立ちます。
- **[remark-emoji](https://github.com/rhysd/remark-emoji)**: 文章に絵文字を簡単に追加できます。
- **[remark-toc](https://github.com/remarkjs/remark-toc)**: 記事に自動的に目次を生成します。
- **[rehype-raw](https://github.com/rehypejs/rehype-raw)** と **[rehype-sanitize](https://github.com/rehypejs/rehype-sanitize)**: 生のHTMLのレンダリングとサニタイズを行います。
- **[rehype-slug](https://github.com/rehypejs/rehype-slug)**: 見出しにスラッグ（URLフレンドリーな識別子）を付与します。
- **[mermaid](https://github.com/mermaid-js/mermaid)**: 複雑な図やフローチャートをMarkdownで記述できます。
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)**: フロントマターを解析し、メタデータを簡単に扱えます。
- **[clsx](https://github.com/lukeed/clsx)**: 条件付きでクラス名を結合し、より読みやすいコードを記述できます。
- **[feed](https://github.com/jpmonette/feed)**: RSSフィードを作成する。

### 図やフローチャート

- [Mermaid](https://mermaid.js.org/) を使用しています。

### シンタックスハイライト

- **[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)**: コードブロックにシンタックスハイライトを適用し、記事の読みやすさを向上させます。

## その他検討したライブラリなど

- [Contentlayer](https://contentlayer.dev/)
- [Markdown Editor for React.](https://uiwjs.github.io/react-md-editor/)
- [Nextra – Next.js Static Site Generator – Nextra](https://nextra.site/)
- [Docusaurus](https://docusaurus.io/)
- [Starlight](https://starlight.astro.build/ja/)

## 参考にしたサイト

- [Next.jsを利用した初めての本格的Markdownブログサイトの構築 | アールエフェクト](https://reffect.co.jp/react/nextjs-markdown-blog/)
- [女医が教える本当に気持ちのいい Markdown 変換処理【Next.js編】](https://zenn.dev/yoshiishunichi/articles/667120b3d0c9d2)
- [Next.js 13 app directory で記事投稿サイトを作ってみよう](https://zenn.dev/azukiazusa/articles/next-js-app-dir-tutorial)

## まとめ

このブログの作成は、Next.jsとこれらのライブラリを使って、技術的な知識を深める素晴らしい経験でした。デザインライブラリのRadix UI、Tailwind CSS、shadcn/uiの組み合わせは、見た目も機能も優れたインターフェースを提供します。

また、Markdownを活用することで、コンテンツ作成プロセスを大幅に効率化しました。