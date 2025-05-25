# vue3-time-duration
UI Widget to set a time duration. This is a component for vue 3

## Getting started
### Install the component:
```angular2html
npm install --save vue3-time-duration
```

### Use the component directly:

#### Options API
```html
<template>
  <div>
    <vue3-time-duration v-model="duration" />
  </div>
</template>

<script lang="ts">
  import "vue3-time-duration/dist/vue3-time-duration.css";
  import Vue3TimeDuration from "vue3-time-duration";

  export default defineComponent({
    name: "FormLogin",
    components: { Vue3TimeDuration },
    
    data() {
      return {
        duration: {
          start: "10:00", 
          end: "10:05"
        }
      }
    }
  });
</script>
```

#### Composition API
```html
<script setup lang="ts">
  import "vue3-time-duration/dist/vue3-time-duration.css";
  import Vue3TimeDuration from "vue3-time-duration";
  
  const duration = ref({ start: "10:00", end: "10:05" });
</script>

<template>
  <div>
    <vue3-time-duration v-model="duration" />
  </div>
</template>
```

#### If you want to customize the component styles. For example:
```css
/* style.css file */

.vue3-time-duration {
	--bg-element: #ffffff;
	--bg-selected: #f3f3f3;
	--color-font: #333;
	--color-border: rgb(223, 230, 238);
	--size-font: 14px;
}
```

## License
Copyright (c) 2025 Egor Lentarev.
Released under the [MIT License](https://github.com/lentarev/vue3-time-duration/blob/master/LICENSE).