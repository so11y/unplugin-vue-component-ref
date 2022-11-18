import { transform } from '../src/index';
import { test, expect } from 'vitest';

test('setup ref', () => {
	const result = transform(
		`<template>
     <div ref='xx'>5</div>
    </template>
  <script setup>
  let a= 10;
  </script>`,
		'setup'
	);
	expect(result).toMatchSnapshot();
});

test('defineComponent ref', () => {
	const result = transform(
		`<template>
    <div ref='aa'>5</div>
  </template>
  <script >
  import {defineComponent} from "vue"
  export default defineComponent({})
  </script>`,
		'setup'
	);
	expect(result).toMatchSnapshot();
});

test('multiple ref', () => {
	const result = transform(
		`<template>
    <div ref='div1' >
      <div ref="div2">
          <Home ref="home"class="test"></Home>
      </div>
    </div>
  </template>
  <script >
  import {defineComponent} from "vue"
  export default defineComponent({})
  </script>`,
		'setup'
	);
	expect(result).toMatchSnapshot();
});



test('multiple ref', () => {
	const result = transform(
		`<script  setup lang="ts">
    import { ref ,onMounted,getCurrentInstance} from "vue";
    import PPP from "./page/ppp.vue"
    import QQQ from "./page/qqq.vue"
    const {proxy} = getCurrentInstance();
    const ppp = ref("");
    const qqq = ref("");

    onMounted(()=>{
      console.log(proxy.onVnodeBeforeMountRef_);
      console.log("ppp",ppp.value.a);
      console.log("qqq->a1",ppp.value.a1);
      console.log("qqq->a3",ppp.value.a3);
    })
    </script>

    <template>
      <div>
        <h1>🎇playground</h1>
        <PPP ref="ppp"></PPP>
        <QQQ ref="qqq"></QQQ>
      </div>
    </template>`,
		'setup'
	);
	expect(result).toMatchSnapshot();
});

