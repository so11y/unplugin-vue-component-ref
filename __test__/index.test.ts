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
    <div ref='xx'>5</div>
  </template>
  <script >
  import {defineComponent} from "vue"
  export default defineComponent({})
  </script>`,
		'setup'
	);
	expect(result).toMatchSnapshot();
});