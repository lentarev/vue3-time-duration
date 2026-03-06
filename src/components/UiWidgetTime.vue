<script setup lang="ts">
import IconXMark from '@/components/icons/IconXMark.vue'
import {
  computed,
  type ComputedRef,
  onMounted,
  onUnmounted,
  type Ref,
  ref,
  watch,
  type WritableComputedRef,
} from 'vue'

const props = defineProps({
  timeListId: { type: Number, default: 0 },
  timeList: { type: Array<{ id: number; time: string }>, default: [] },
  isError: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false },
})

const emit = defineEmits(['selectedId'])

// Refs
const timeListFiltered: Ref<Array<{ id: number; time: string }>> = ref([])
const isShowDropdown = ref(false)
const selectedIdx = ref(0)
const time: Ref<string | undefined> = ref(undefined)
const inputRef = ref()
const isReset = ref(false)

const refItemList = ref()
const rIndex = ref(0)

const scrollY = ref(0)
const scrollLocked = ref(false)

const dropdownRef = ref<HTMLElement | null>(null)

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

const lockScroll = () => {
  if (scrollLocked.value) return

  scrollY.value = window.scrollY
  scrollLocked.value = true

  // Фиксируем позицию страницы
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY.value}px`
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
  if (!scrollLocked.value) return

  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  document.body.style.overflow = ''

  // Возвращаем на место
  window.scrollTo(0, scrollY.value)
  scrollLocked.value = false
}

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

  lockScroll()

  setTimeout(() => {
    const elm = refItemList.value

    if (elm !== null) {
      rIndex.value = items.value.findIndex((n) => Number(n.id) === selectedIdx.value)
      elm[rIndex.value]?.scrollIntoView()
    }
  }, 250)
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

      unlockScroll()
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

  lockScroll()

  onShowDropdown()
}

const onInput = () => {
  timeListFiltered.value = props.timeList.filter((el) => el.time.startsWith(time.value as string))
}

const preventScroll = (e: Event) => {
  if (!scrollLocked.value) return

  const target = e.target as HTMLElement

  const isInsideDropdown = target?.closest('.ui-widget-time__dropdown')

  if (isInsideDropdown) {
    const el = isInsideDropdown as HTMLElement
    const isScrollable = el.scrollHeight > el.clientHeight

    if (isScrollable) {
      return
    }
  }

  e.preventDefault()
}

onMounted(() => {
  document.addEventListener('wheel', preventScroll, { passive: false })
  document.addEventListener('touchmove', preventScroll, { passive: false })
})

onUnmounted(() => {
  unlockScroll() //
  document.removeEventListener('wheel', preventScroll)
  document.removeEventListener('touchmove', preventScroll)
})
</script>

<template>
  <div class="ui-widget-time">
    <!-- INPUT -->
    <div :class="{ 'ui-widget-time__w': true, 'ui-widget-time__w_error': props.isError }">
      <input
        ref="inputRef"
        v-model="cTime"
        type="text"
        :class="{ 'ui-widget-time__w-input': true, 'ui-widget-time__w-input_error': props.isError }"
        @click="onShowDropdown"
        @focus="lockScroll"
        @focusout="onFocusOut"
        @input="onInput"
        :readonly="true"
        tabindex="-1"
      />
      <IconXMark class="ui-widget-time__w-icon" @click="onReset" />
    </div>

    <!-- DROPDOWN -->
    <div v-if="isShowDropdown" class="ui-widget-time__dropdown">
      <div v-for="(item, index) in items" :key="index">
        <div
          ref="refItemList"
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
  &__w_error {
    border: 1px solid var(--color-border-error);
    background-color: var(--bg-element-error);
  }

  &__w-input {
    background-color: var(--bg-element);
    border: 1px solid var(--bg-element);
    color: var(--color-font);
    font-size: var(--size-font);
    margin-left: 3px;
    width: 100%;
  }

  &__w-input_error {
    background-color: var(--bg-element-error);
    border: 1px solid var(--bg-element-error);
  }

  &__w-input:focus {
    outline: 0 solid transparent;
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
    font-size: var(--size-font);
  }

  &__dropdown-item_selected {
    background: var(--bg-selected);
    border-radius: 6px;
  }
}
</style>
