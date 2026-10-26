module.exports = function (api) {
  api.cache(true);
  return {
    // The worklets plugin is added below, with Bundle Mode.
    presets: [['babel-preset-expo', { worklets: false, reanimated: false }]],
    plugins: [
      [
        'react-native-worklets/plugin',
        {
          bundleMode: true,
          strictGlobal: true,
          // Meant for this app's own src/ folder, but it also matches
          // node_modules/react-native-reanimated/src/... and crashes it.
          importForwarding: { relativePaths: ['src'] },
        },
      ],
    ],
  };
};
