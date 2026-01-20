/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  turbopack: {
    rules: {
      // Markdown を文字列として読み込む例
      '*.md': {
        loaders: [
          {
            loader: 'raw-loader',
            options: {},
          }
        ],
        // `as` を指定して読み込まれるモジュールの拡張子を変えたい場合
        as: '*.js',
      },
      '*.markdown': {
        loaders: [
          {
            loader: 'raw-loader',
            options: {},
          }
        ],
        as: '*.js',
      },
    },
  },
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.markdown": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
};

module.exports = nextConfig;
