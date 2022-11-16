import { App, VNodeProps, VNode } from 'vue';

const onVnodeBeforeMountRef_: VNodeProps['onVnodeBeforeMount'] = (
	VNode: VNode
) => {
	const { component } = VNode;
	if (component) {
		component.exposeProxy = new Proxy(
			{},
			{
				get(_, key: string) {
					if (component.exposed && component.exposed[key])
						return component.exposed[key];
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
