export const rules = {
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '账号必须是5~10个字母或者数字',
      trigger: 'blur'
    }
  ],
  pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{6,}$/,
      message: '密码必须是6位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}
