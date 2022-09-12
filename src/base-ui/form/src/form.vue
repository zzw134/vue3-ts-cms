<template>
  <div class="zw-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemLayout"
              v-if="!item.isHidden"
            >
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                v-bind="item.otherOptions"
                :model-value="modelValue[item.field]"
                @update:modelValue="handleValueChange($event, item.field)"
              ></el-input>
              <el-select
                v-else-if="item.type === 'select'"
                style="width: 100%"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                :model-value="modelValue[item.field]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </template>
              </el-select>
              <el-date-picker
                v-else-if="item.type === 'datePicker'"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                :model-value="modelValue[item.field]"
                @update:modelValue="handleValueChange($event, item.field)"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
    <div class="header"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormType } from '@/base-ui/form'

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormType[]>,
      default: () => []
    },
    labelWidth: {
      disabled: [String, Number],
      default: 100
    },
    itemLayout: {
      type: Object,
      default: () => {
        return {
          padding: '4px 20px'
        }
      }
    },
    colLayout: {
      type: Object,
      default: () => {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    },
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue }) // 浅拷贝，使之遵循vue的单向数据流

    // watch(
    //   formData,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )

    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less"></style>
