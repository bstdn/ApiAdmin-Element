export const profileDataConfig = {
  formFields: [
    {
      label: '用户账号',
      prop: 'username',
      disabled: true
    },
    {
      label: '用户昵称',
      prop: 'nickname'
    },
    {
      label: '用户头像',
      prop: 'head_img'
    },
    {
      label: '原密码',
      prop: 'oldPassword',
      type: 'password',
      placeholder: '请输入现在使用的密码，如需修改密码则必填'
    },
    {
      label: '新密码',
      prop: 'password',
      type: 'password',
      placeholder: '请输入新密码，至少6位字符'
    }
  ],
  postForm: {
    nickname: '',
    head_img: '',
    oldPassword: '',
    password: ''
  },
  rules: {
    nickname: [
      { required: true, message: '请输入用户昵称', trigger: 'blur' }
    ],
    password: [
      { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
      { max: 32, message: '最多输入32个字符', trigger: 'blur' }
    ]
  }
}
