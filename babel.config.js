module.exports = function(api) {
  api.cache(true);
  return {
		presets: ['babel-preset-expo'],
		plugins: [
			// optional, only if you ever use process.env
			'transform-inline-environment-variables',
			'@babel/plugin-proposal-export-namespace-from',
			// NOTE: this is only necessary if you are using reanimated for animations
			'react-native-reanimated/plugin',
		],
  }
};

