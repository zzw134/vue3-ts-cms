<template>
  <div class="base-echart">
    <div ref="divRef" :style="{ width, height }"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  defineProps,
  withDefaults,
  onBeforeUnmount,
  watchEffect
} from 'vue'
import * as echart from 'echarts'
import useEcharts from '../hooks/useEcharts'

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: echart.EChartsOption
  }>(),
  {
    width: '100%',
    height: '340px'
  }
)

const divRef = ref<HTMLElement>()
let listenerFn: () => void
onMounted(() => {
  const { setOptions, updateSize } = useEcharts(divRef.value!)
  listenerFn = updateSize
  watchEffect(() => {
    setOptions(props.options)
  })
  window.addEventListener('resize', listenerFn)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', listenerFn)
})
</script>

<style scoped></style>
