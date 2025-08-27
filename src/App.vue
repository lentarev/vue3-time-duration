<script setup lang="ts">
import UiWidgetTime from '@/components/UiWidgetTime.vue'
import { computed, type ComputedRef, onMounted, type Ref, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    initStart?: string | undefined
    initEnd?: string | undefined
  }>(),
  {
    initStart: () => {
      return '00:00'
    },

    initEnd: () => {
      return '00:05'
    },
  },
)

const emit = defineEmits(['duration'])

const totalIds = ref(0)

const timeList: Ref<Array<{ id: number; time: string }>> = ref([])

const leftId = ref()
const rightId = ref()

const start: Ref<string | undefined> = ref()
const end: Ref<string | undefined> = ref()

const cInitStart = computed(() => {
  leftId!.value = getIdByTime(props.initStart)
  start!.value = timeList.value.find((n) => n.id === leftId.value)?.time

  return props.initStart
})

const cInitEnd = computed(() => {
  rightId!.value = getIdByTime(props.initEnd)
  end!.value = timeList.value.find((n) => n.id === rightId.value)?.time

  return props.initEnd
})

/**
 * Hook onMounted
 */
onMounted(() => {
  createTimeList()

  totalIds.value = timeList.value.length - 1
})

const selectedTime: ComputedRef<{ start: string | undefined; end: string | undefined }> = computed(
  () => {
    emit('duration', { start: start.value, end: end.value })
    return { start: start.value, end: end.value }
  },
)

const getIdByTime = (time: string): number | undefined => {
  return timeList.value.find((n) => n.time === time)?.id
}

/**
 * Create a list with an interval of 5 minutes. (00:00 - 23:45)
 */
const createTimeList = () => {
  let hour = -1
  let h = ''
  let min = 0
  let m = ''

  for (let idx = 0; idx < 288; idx++) {
    if (min >= 60) {
      min = 0
    }
    if (idx % 12 === 0) {
      hour += 1
    }
    h = hour.toString().length === 1 ? '0' + hour.toString() : hour.toString()
    m = min.toString().length === 1 ? '0' + min.toString() : min.toString()
    timeList.value.push({ id: idx, time: h + ':' + m })
    min += 5
  }
}

const onHandleLeftSelectedId = (val: number) => {
  leftId.value = val
  rightId.value = val >= rightId.value ? val + 1 : rightId.value

  if (rightId.value > totalIds.value) {
    rightId.value = 0
  }

  start.value = timeList.value.find((n) => n.id === leftId.value)?.time
  end.value = timeList.value.find((n) => n.id === rightId.value)?.time
}

const onHandleRightSelectedId = (val: number) => {
  rightId.value = val
  leftId.value = val <= leftId.value ? val - 1 : leftId.value

  if (leftId.value < 0) {
    leftId.value = totalIds.value
  }

  start.value = timeList.value.find((n) => n.id === leftId.value)?.time
  end.value = timeList.value.find((n) => n.id === rightId.value)?.time
}
</script>

<template>
  <div class="vue3-time-duration">
    <div v-show="false">
      {{ selectedTime }}
      {{ cInitStart }}
      {{ cInitEnd }}
    </div>

    <div class="vue3-time-duration__t">
      <UiWidgetTime
        class="vue3-time-duration__t-left"
        :time-list="timeList"
        :time-list-id="leftId"
        v-on:selected-id="onHandleLeftSelectedId"
      />

      <UiWidgetTime
        class="vue3-time-duration__t-right"
        :time-list="timeList"
        :time-list-id="rightId"
        v-on:selected-id="onHandleRightSelectedId"
      />
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.vue3-time-duration {
  --bg-element: #ffffff;
  --bg-selected: #f3f3f3;
  --color-border: rgb(223, 230, 238);
  --color-font: #333;
  --size-font: 14px;

  &__t {
    display: flex;
    align-items: center;
  }

  &__t-left {
    margin-right: 6px;
  }

  &__t-right {
    margin-left: 6px;
  }
}
</style>
