module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: {
          version: '3.8', // 你的core-js版本号前两位
          proposals: true,
        },
      },
    ],
    '@babel/preset-react',
  ],
}
