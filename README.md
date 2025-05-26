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
    <vue3-time-duration :init-start="start" :init-end="end" v-on:duration="onHandleDuration" />
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
        start: "",
        end: ""
      }
    },
    
    mounted() {
      this.start = "10:00"
      this.end = "10:05";
    },
    
    methods() {
      onHandleDuration(val: { start: string; end: string }) {
        this.start = val.start;
        this.end = val.end;
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

  const start: Ref<string | undefined> = ref("");
  const end: Ref<string | undefined> = ref("");

  /**
   * Hook onMounted
   */
  onMounted(() => {
    start.value = "10:00";
    end.value = "10:05";
  });

  const onHandleDuration = (val: { start: string; end: string }) => {
    start.value = val.start;
    end.value = val.end;
  };
</script>

<template>
  <div>
    <vue3-time-duration :init-start="start" :init-end="end" v-on:duration="onHandleDuration" />
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