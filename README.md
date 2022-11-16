<div align="center">
  <h2>unplugin-vue-ref</h2>
  <p>用于获取setup组件ref全部导出</p>
</div>

---

### 使用方式


``` ts
//client

import {createApp} from "vue"
import App from "./app"
import {unpluginVueRef} from "unplugin-vue-ref"

createApp(App).use(unpluginVueRef)

```


``` ts
//vite


import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vitePlugin } from "unplugin-vue-ref";

//vitePlugin
interface Options {
	include?: FilterPattern;
	exclude?: FilterPattern;
}

export default defineConfig({
  plugins: [
    vue(),
    vitePlugin() // Options
  ],
});


```