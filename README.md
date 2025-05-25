# vue3-time-duration
UI widget for setting time duration. This is a component for vue 3

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
    <!-- INPUTS -->
    <vue3-time-duration v-model="duration" />
  </div>
</template>

<script lang="ts">
  import "vue3-time-duration/dist/vue3-time-duration.css";
  import Vue3TimeDuration from "vue3-time-duration";
  import { IVue3TimeDuration } from "vue3-time-duration/types/IVue3TimeDuration";

  export default defineComponent({
    name: "FormLogin",
    components: { Vue3TimeDuration },
    
    data() {
      return {
        // Phone
        duration: {
          start: "10:00", 
          end: "10:05"
        } as IVue3TimeDuration,
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
  import { IVue3TimeDuration } from "vue3-time-duration/types/IVue3TimeDuration";
  
  const duration: IVue3TimeDuration = reactive({ start: "10:00", end: "10:05" });
</script>

<template>
  <div>
    <!-- INPUTS -->
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
}
```

## License
Copyright (c) 2025 Egor Lentarev.
Released under the [MIT License](https://github.com/lentarev/vue3-time-duration/blob/master/LICENSE).