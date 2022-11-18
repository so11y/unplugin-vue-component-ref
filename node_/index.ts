import { compileTemplate, parse, MagicString } from '@vue/compiler-sfc';
import { findProp } from '@vue/compiler-core';
import { onVnodeBeforeMountRef } from './helper';
import { createUnplugin } from 'unplugin';
import { createFilter } from '@rollup/pluginutils';
import type { Plugin } from 'vite';
import type { NodeTransform } from '@vue/compiler-core';
import type { FilterPattern } from '@rollup/pluginutils';

export interface Options {
	include?: FilterPattern;
	exclude?: FilterPattern;
}

const transform = (source: string, filename: string) => {
	const { descriptor } = parse(source);
	if (descriptor.template) {
		const { loc: templateLocStart } = descriptor.template;
		const magicString = new MagicString(source);
		const onRefNode: NodeTransform = (node) => {
			if (node.type === 1 /** NodeTypes.ELEMENT */) {
				const ref = findProp(node, 'ref');
				if (ref && ref.type === 6 /**  NodeTypes.ATTRIBUTE */) {
					const { loc } = ref;
					magicString.appendLeft(
						loc.end.offset + templateLocStart.start.offset,
						onVnodeBeforeMountRef
					);
				}
			}
		};
		compileTemplate({
			filename,
			source: descriptor.template.content,
			id: filename,
			compilerOptions: {
				nodeTransforms: [onRefNode]
			}
		});
		return magicString.toString();
	}
};

function resolveOption(options: Options): Options {
	return {
		include: options.include || [/\.vue$/],
		exclude: options.exclude || undefined
	};
}
export const unplugin = createUnplugin((userOptions: Options = {}) => {
	const options = resolveOption(userOptions);
	const filter = createFilter(options.include, options.exclude);
	return {
		name: 'unplugin-vue-component-ref',
		enforce: 'pre',
		transformInclude(id) {
			return filter(id);
		},
		transform(code, id) {
			if (filter(id)) transform(code, id);
			return null;
		}
	};
});

export const vitePlugin: (options?: Options) => Plugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
