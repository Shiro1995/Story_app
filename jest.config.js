module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-native-tab-view' +     // 👈 THÊM DÒNG NÀY
      '|react-native-gesture-handler' +
      '|@react-navigation' +
      ')/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
