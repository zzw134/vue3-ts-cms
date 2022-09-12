import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    },
    {
      field: 'createDate',
      type: 'datePicker',
      label: '创建时间',
      placeholder: '选择时间',
      otherOptions: {
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ]
  // labelWidth: 100,
  // itemLayout: { padding: '4px 20px' }
  // colLayout: { span: 6 }
}
