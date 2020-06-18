export const menuDataConfig = {
  fields: [
    {
      label: '菜单名称',
      prop: 'showName',
      align: 'left'
    },
    {
      label: '排序',
      prop: 'sort',
      width: 80
    },
    {
      label: '菜单URL',
      prop: 'url',
      align: 'left',
      width: 250
    },
    {
      label: '状态',
      prop: 'hide',
      width: 200
    }
  ],
  dialogForm: {
    name: '',
    fid: 0,
    url: '',
    sort: 0,
    id: 0
  },
  dialogFormRules: {
    name: [
      { required: true, message: '菜单名称不能为空', trigger: 'blur' }
    ]
  },
  dialogFields: [
    {
      label: '菜单名称',
      prop: 'name',
      placeholder: '请输入菜单名称'
    },
    {
      label: '父级菜单',
      prop: 'fid',
      type: 'select',
      source: 'menu',
      clearable: false,
      placeholder: '父级菜单'
    },
    {
      label: '菜单URL',
      prop: 'url',
      prepend: 'admin/',
      placeholder: '请输入菜单URL'
    },
    {
      label: '菜单排序',
      prop: 'sort',
      type: 'inputNumber',
      min: 0,
      controlsPosition: 'right',
      tag: '数字越小越靠前',
      tagType: 'danger'
    }
  ]
}

export const logDataConfig = {
  filterForm: {
    type: undefined,
    keywords: undefined
  },
  filterConfig: [
    {
      type: 'select',
      value: 'type',
      placeholder: '请选择类别',
      path: [
        { value: '1', label: '操作URL' },
        { value: '2', label: '用户昵称' },
        { value: '3', label: '用户ID' }
      ],
      width: '120px'
    },
    {
      type: 'input',
      value: 'keywords'
    }
  ],
  fields: [
    {
      type: 'expand',
      prop: 'expand',
      width: 50
    },
    {
      label: '行为名称',
      prop: 'action_name'
    },
    {
      label: '用户ID',
      prop: 'uid',
      width: 120
    },
    {
      label: '用户昵称',
      prop: 'nickname',
      width: 100
    },
    {
      label: '操作URL',
      prop: 'url',
      width: 200
    },
    {
      label: '执行时间',
      prop: 'add_time',
      width: 160
    }
  ]
}

export const userDataConfig = {
  filterForm: {
    status: undefined,
    type: undefined,
    keywords: undefined
  },
  filterConfig: [
    {
      type: 'select',
      value: 'status',
      placeholder: '请选择状态',
      path: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ],
      width: '120px'
    },
    {
      type: 'select',
      value: 'type',
      placeholder: '请选择类别',
      path: [
        { value: 1, label: '用户账号' },
        { value: 2, label: '用户昵称' }
      ],
      width: '120px'
    },
    {
      type: 'input',
      value: 'keywords'
    }
  ],
  fields: [
    {
      label: '用户账号',
      prop: 'username',
      minWidth: 120
    },
    {
      label: '用户昵称',
      prop: 'nickname',
      width: 120
    },
    {
      label: '登录次数',
      prop: 'login_times',
      width: 90
    },
    {
      label: '最后登录时间',
      prop: 'last_login_time',
      width: 160
    },
    {
      label: '最后登录IP',
      prop: 'last_login_ip',
      width: 160
    },
    {
      label: '状态',
      prop: 'status',
      width: 200
    }
  ],
  dialogForm: {
    username: '',
    nickname: '',
    password: '',
    group_id: [],
    id: 0
  },
  dialogFormRules: {
    username: [
      { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    nickname: [
      { required: true, message: '用户昵称不能为空', trigger: 'blur' }
    ]
  },
  dialogFields: [
    {
      label: '用户账号',
      prop: 'username',
      placeholder: '请输入用户账号'
    },
    {
      label: '用户昵称',
      prop: 'nickname',
      placeholder: '请输入用户昵称'
    },
    {
      label: '用户密码',
      prop: 'password',
      type: 'password',
      placeholder: '请输入用户密码'
    },
    {
      label: '权限组',
      prop: 'group_id'
    }
  ]
}

export const authDataConfig = {
  filterForm: {
    status: undefined,
    keywords: undefined
  },
  filterConfig: [
    {
      type: 'select',
      value: 'status',
      placeholder: '请选择状态',
      path: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ],
      width: '120px'
    },
    {
      type: 'input',
      value: 'keywords',
      placeholder: '请输入组名称'
    }
  ],
  fields: [
    {
      label: '组名称',
      prop: 'name',
      minWidth: 100
    },
    {
      label: '描述',
      prop: 'description'
    },
    {
      label: '成员授权',
      prop: 'member_list',
      width: 116
    },
    {
      label: '状态',
      prop: 'status',
      width: 200
    }
  ],
  userFields: [
    {
      label: '用户账号',
      prop: 'username'
    },
    {
      label: '用户昵称',
      prop: 'nickname',
      width: 90
    },
    {
      label: '登录次数',
      prop: 'login_times',
      width: 90
    },
    {
      label: '最后登录时间',
      prop: 'last_login_time',
      width: 160
    },
    {
      label: '最后登录IP',
      prop: 'last_login_ip',
      width: 160
    },
    {
      label: '状态',
      prop: 'status',
      width: 100
    }
  ],
  dialogForm: {
    name: '',
    description: '',
    rules: [],
    id: 0
  },
  dialogFormRules: {
    name: [
      { required: true, message: '组名称不能为空', trigger: 'blur' }
    ]
  },
  dialogFields: [
    {
      label: '组名称',
      prop: 'name',
      placeholder: '请输入权限组名称'
    },
    {
      label: '组描述',
      prop: 'description',
      type: 'textarea',
      placeholder: '请输入权限组描述'
    },
    {
      label: '组授权',
      prop: 'rules'
    }
  ]
}
