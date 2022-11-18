import { App, VNodeProps, VNode } from 'vue';
const hasOwn = (val: Record<string, any>, key:string) =>
	Object.prototype.hasOwnProperty.call(val, key);
const onVnodeBeforeMountRef_: VNodeProps['onVnodeBeforeMount'] = (
	VNode: VNode
) => {
	const { component } = VNode;
	if (component) {
		component.exposeProxy = new Proxy(
			{},
			{
				get(_, key: string) {
					if (component.exposed && hasOwn(component.exposed, key))
						return component.exposed[key];
					//@ts-ignore
					if (hasOwn(component.setupState, key))return component.setupState[key];
					//@ts-ignore
					return component.proxy[key];
				}
			}
		);
	}
};

export default (app: App) => {
	app.config.globalProperties.onVnodeBeforeMountRef_ = onVnodeBeforeMountRef_;
};
