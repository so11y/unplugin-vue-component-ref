import { compileTemplate, parse, MagicString } from '@vue/compiler-sfc';
import { findProp } from '@vue/compiler-core';
import type { NodeTransform } from '@vue/compiler-core';
import { onVnodeBeforeMountRef } from './helper';

export const transform = (source: string, filename: string) => {
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
