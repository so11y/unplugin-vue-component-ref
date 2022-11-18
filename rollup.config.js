const path = require('node:path');
const typeScriptPlugin = require('rollup-plugin-typescript2');
const pkg = require(path.resolve(__dirname, `./package.json`));

const banner = `/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author.name}
* @license MIT
*/`;

const defineBuild = (options) => {
	return {
		input: options.input,
		plugins:options.plugins,
		output: {
			banner,
			file: options.file,
			format: options.format
		}
	};
};

module.exports = [
	defineBuild({
		input: './node_/index.ts',
		file: './node/index.js',
		format: 'cjs',
		plugins:[
			typeScriptPlugin({
				check: false,
				tsconfig: path.resolve(__dirname, './tsconfig.json')
			})
		]
	}),
	defineBuild({
		input: './client_/index.ts',
		file: './client/index.js',
		format: 'cjs',
		plugins:[
			typeScriptPlugin({
				check: false,
				tsconfig: path.resolve(__dirname, './tsconfig.client.json')
			})
		]
	})
];
