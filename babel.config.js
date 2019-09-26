module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
        'styled-jsx/babel',
        // TODO: Start using optional-chaining once typescript 3.7 is released.
        // '@babel/plugin-proposal-optional-chaining',
    ],
    env: {
      production: {
        // plugins: ['react-native-paper/babel'],
      },
    },
  };
};
