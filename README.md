<div align="center">
  <h2>unplugin-vue-component-ref</h2>
  <p>用于获取setup组件ref全部导出</p>
</div>

---

### 使用方式


``` ts
//client

import {createApp} from "vue"
import App from "./app"
import {unpluginVueRef} from "unplugin-vue-component-ref"

createApp(App).use(unpluginVueRef)

```

### vite

``` ts
import { vitePlugin } from "unplugin-vue-component-ref";

interface Options {
	include?: FilterPattern;
	exclude?: FilterPattern;
}

export default defineConfig({
  plugins: [
    vitePlugin({ /* options */ }) //
  ],
});

```


### vue.config.js

``` js
const { webpackPlugin } = require("unplugin-vue-component-ref") ;

interface Options {
	include?: FilterPattern;
	exclude?: FilterPattern;
}

module.exports = {
  configureWebpack: {
    plugins: [
      webpackPlugin({ /* options */ }),
    ],
  },
};

```