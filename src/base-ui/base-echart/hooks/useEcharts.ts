import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el)
  function setOptions(options: echarts.EChartsOption) {
    echartsInstance.setOption(options)
  }
  function updateSize() {
    echartsInstance.resize()
  }
  return { echartsInstance, setOptions, updateSize }
}
