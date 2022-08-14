export const rules = {
  number: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^1(3|4|5|7|8)\d{9}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{6}$/,
      message: '验证码格式错误',
      trigger: 'blur'
    }
  ]
}
