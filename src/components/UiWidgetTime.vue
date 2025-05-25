<script setup lang="ts">
import IconXMark from '@/components/icons/IconXMark.vue'
import {
  computed,
  type ComputedRef,
  type Ref,
  ref,
  useTemplateRef,
  watch,
  type WritableComputedRef,
} from 'vue'

const props = defineProps({
  timeListId: { type: Number, default: 0 },
  timeList: { type: Array<{ id: number; time: string }>, default: [] },
})

const emit = defineEmits(['selectedId'])

// Refs
const timeListFiltered: Ref<Array<{ id: number; time: string }>> = ref([])
const isShowDropdown = ref(false)
const selectedIdx = ref(0)
const time: Ref<string | undefined> = ref(undefined)
const inputRef = ref()
const isReset = ref(false)
// const refItemList = useTemplateRef<Array<HTMLDivElement>>('refItemList')
const rIndex = ref(0)

// Computed properties
const items: ComputedRef<Array<{ id: number; time: string }>> = computed(() => {
  return timeListFiltered.value.length > 0 ? timeListFiltered.value : props.timeList
})

const idx: ComputedRef<number> = computed(() => {
  return props.timeListId
})

const cTime: WritableComputedRef<string | undefined> = computed({
  get() {
    return time.value === undefined
      ? props.timeList.find((n) => n.id === idx.value)?.time
      : time.value
  },

  set(val: string | undefined) {
    time.value = val
  },
})

watch(idx, (val) => {
  selectedIdx.value = val
  cTime.value = props.timeList.find((n) => n.id === val)?.time
})

/**
 * Select item
 * @param id
 */
const onSelectItem = (id: number) => {
  selectedIdx.value = id
  cTime.value = items.value.find((n) => n.id === selectedIdx.value)?.time
  isShowDropdown.value = false

  emit('selectedId', selectedIdx.value)
}

/**
 * Dropdown
 */
const onShowDropdown = () => {
  isShowDropdown.value = true

  /*
  setTimeout(() => {
    const elm = refItemList.value

    if (elm !== null) {
      rIndex.value = items.value.findIndex((n) => Number(n.id) === selectedIdx.value)
      elm[rIndex.value]?.scrollIntoView()
    }
  }, 250)

   */
}

/**
 * Focus out
 */
const onFocusOut = () => {
  setTimeout(() => {
    if (!isReset.value) {
      cTime.value = items.value.find((n) => n.id === selectedIdx.value)?.time

      emit('selectedId', items.value.find((n) => n.id === selectedIdx.value)?.id)
      isShowDropdown.value = false
    }
  }, 200)

  isReset.value = false
}

/**
 * Reset
 */
const onReset = () => {
  selectedIdx.value = 0
  timeListFiltered.value = []
  cTime.value = ''
  inputRef.value.focus()
  isReset.value = true
  isShowDropdown.value = true
}

const onInput = () => {
  timeListFiltered.value = props.timeList.filter((el) => el.time.startsWith(time.value as string))
}
</script>

<template>
  <div class="ui-widget-time">
    <!-- INPUT -->
    <div class="ui-widget-time__w">
      <input
        ref="inputRef"
        v-model="cTime"
        type="text"
        class="ui-widget-time__w-input"
        @click="onShowDropdown"
        @focusout="onFocusOut"
        @input="onInput"
      />
      <IconXMark class="ui-widget-time__w-icon" @click="onReset" />
    </div>

    <!-- DROPDOWN -->
    <div v-if="isShowDropdown" class="ui-widget-time__dropdown">
      <div v-for="(item, index) in items" :key="index">
        <!--  ref="refItemList" -->
        <div
          :class="{
            'ui-widget-time__dropdown-item': true,
            'ui-widget-time__dropdown-item_selected': rIndex === index,
          }"
          @click="onSelectItem(item.id)"
        >
          {{ item.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-widget-time {
  position: relative;

  &__w {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 8px 8px 8px 2px;
    background-color: var(--bg-element);
    height: 24px;
  }

  &__w-input {
    background-color: var(--bg-element);
    border: 1px solid var(--bg-element);
    color: var(--color-font);
    font-size: 16px;
    margin-left: 3px;
    width: 100%;
  }

  &__w-input:focus {
    outline-color: var(--bg-element);
    outline-style: solid;
  }

  &__w-icon {
    cursor: pointer;
  }

  // DROPDOWN
  &__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    max-height: 150px;
    margin: 4px;
    padding: 6px;
    background: #ffffff;
    z-index: 1;
    border: 1px solid #f5f5f5;
    border-radius: 6px;
    box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.04);
    overflow-y: auto;
  }

  &__dropdown-item {
    padding: 6px 4px;
    cursor: pointer;
  }

  &__dropdown-item_selected {
    background: var(--bg-selected);
    border-radius: 6px;
  }
}
</style>
