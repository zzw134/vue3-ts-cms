type ItemType = 'input' | 'password' | 'select' | 'datePicker'

export interface IFormType {
  field: string
  type: ItemType
  label: string
  placeholder?: string
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: object
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormType[]
  labelWidth?: string | number
  colLayout?: object
  itemLayout?: object
}
