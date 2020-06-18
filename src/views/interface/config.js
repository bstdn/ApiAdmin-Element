export const groupDataConfig = {
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
        { value: 1, label: '接口组标识' },
        { value: 2, label: '接口组名称' }
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
      label: '接口组名称',
      prop: 'name'
    },
    {
      label: '接口组描述',
      prop: 'description'
    },
    {
      label: '接口组热度',
      prop: 'hot',
      width: 120
    },
    {
      label: '接口组标识',
      prop: 'hash',
      width: 130
    },
    {
      label: '状态',
      prop: 'status',
      width: 200
    }
  ],
  dialogForm: {
    description: '',
    name: '',
    hash: '',
    image: '',
    id: 0
  },
  dialogFormRules: {
    name: [
      { required: true, message: '接口组名称不能为空', trigger: 'blur' }
    ]
  },
  dialogFields: [
    {
      label: '组名称',
      prop: 'name',
      placeholder: '请输入接口组名称'
    },
    {
      label: '组头像',
      prop: 'image'
    },
    {
      label: '组标识',
      prop: 'hash',
      disabled: true,
      tag: '系统自动生成，不允许修改',
      tagType: 'danger',
      style: 'width: 50%;'
    },
    {
      label: '组描述',
      prop: 'description',
      type: 'textarea',
      placeholder: '请输入接口组描述'
    }
  ]
}

export const listDataConfig = {
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
        { value: 1, label: '接口标识' },
        { value: 2, label: '接口名称' },
        { value: 3, label: '真实类库' }
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
      label: '接口名称',
      prop: 'info',
      minWidth: 190
    },
    {
      label: '真实类库',
      prop: 'api_class',
      width: 260
    },
    {
      label: '接口映射',
      prop: 'hash',
      width: 130
    },
    {
      label: '请求方式',
      prop: 'method',
      width: 90
    },
    {
      label: '状态',
      prop: 'status',
      width: 200
    }
  ],
  dialogForm: {
    api_class: '',
    info: '',
    group_hash: 'default',
    method: 2,
    hash: '',
    access_token: 0,
    is_test: 0,
    id: 0
  },
  dialogFormRules: {
    info: [
      { required: true, message: '接口名称不能为空', trigger: 'blur' }
    ],
    api_class: [
      { required: true, message: '真实类库不能为空', trigger: 'blur' }
    ]
  },
  dialogFields: [
    {
      label: '接口名称',
      prop: 'info',
      placeholder: '请输入接口名称'
    },
    {
      label: '真实类库',
      prop: 'api_class',
      placeholder: '请输入真实类库'
    },
    {
      label: '接口分组',
      prop: 'group_hash',
      type: 'select',
      source: 'menu',
      clearable: false
    },
    {
      label: '请求方式',
      prop: 'method',
      type: 'select',
      path: [
        { value: 0, label: '不限' },
        { value: 1, label: 'POST' },
        { value: 2, label: 'GET' }
      ],
      clearable: false
    },
    {
      label: '接口映射',
      prop: 'hash',
      disabled: true,
      tag: '系统自动生成，不允许修改',
      tagType: 'danger',
      style: 'width: 50%;'
    },
    {
      label: '组描述',
      prop: 'description',
      type: 'textarea',
      placeholder: '请输入接口组描述'
    },
    {
      label: 'AccessToken',
      prop: 'access_token',
      type: 'select',
      path: [
        { value: 0, label: '简易认证' },
        { value: 1, label: '复杂认证' }
      ],
      clearable: false,
      tooltip: true,
      tooltipContent: '<p>新版本的全部接口都必须在Header中传递access-token字段，所以AccessToken必须要验证。</p><p>简易认证：在请求这类接口时候，请直接在header中传递AppSecret即可，终身有效。</p><p>复杂认证：在请求这类接口时候，先请求getAccessToken接口获取可用的AccessToken，记住这里的AccessToken默认只有2小时的有效期。</p>',
      style: 'width: 90%;'
    }
  ]
}

export const requestDataConfig = {
  fields: [
    {
      label: '字段名称',
      prop: 'show_name',
      align: 'left',
      width: 200
    },
    {
      label: '数据类型',
      prop: 'data_type',
      width: 100
    },
    {
      label: '是否必须',
      prop: 'is_must',
      width: 90
    },
    {
      label: '默认值',
      prop: 'default',
      width: 160
    },
    {
      label: '字段说明',
      align: 'left',
      prop: 'info'
    }
  ],
  dialogForm: {
    hash: '',
    field_name: '',
    data_type: '2',
    defaults: '',
    range: '',
    is_must: 1,
    info: '',
    type: 0,
    id: 0
  },
  dialogFormRules: {
    field_name: [
      { required: true, message: '字段名称不能为空', trigger: 'blur' }
    ]
  },
  dialogFields: [
    {
      label: '字段名称',
      prop: 'field_name',
      placeholder: '请输入字段名称'
    },
    {
      label: '数据类型',
      prop: 'data_type',
      type: 'select',
      source: 'menu',
      clearable: false
    },
    {
      label: '是否必填',
      prop: 'is_must',
      type: 'radio',
      path: [
        { label: 0, description: '不必填' },
        { label: 1, description: '必填' }
      ]
    },
    {
      label: '默认值',
      prop: 'defaults'
    },
    {
      label: '规则细节',
      prop: 'range',
      type: 'textarea',
      placeholder: '请输入符合要求的JSON字符串'
    },
    {
      label: '字段说明',
      prop: 'info',
      type: 'textarea',
      placeholder: '请输入字段描述'
    }
  ]
}

export const responseDataConfig = {
  fields: [
    {
      label: '字段名称',
      prop: 'show_name',
      align: 'left',
      width: 200
    },
    {
      label: '数据类型',
      prop: 'data_type',
      width: 100
    },
    {
      label: '是否必须',
      prop: 'is_must',
      width: 90
    },
    {
      label: '默认值',
      prop: 'default',
      width: 160
    },
    {
      label: '字段说明',
      align: 'left',
      prop: 'info'
    }
  ],
  dialogForm: {
    hash: '',
    field_name: '',
    data_type: '2',
    defaults: '',
    range: '',
    is_must: 1,
    info: '',
    type: 1,
    id: 0
  },
  dialogFormRules: {
    field_name: [
      { required: true, message: '字段名称不能为空', trigger: 'blur' }
    ]
  },
  dialogFields: [
    {
      label: '字段名称',
      prop: 'field_name',
      placeholder: '请输入字段名称',
      disabled: true
    },
    {
      label: '数据类型',
      prop: 'data_type',
      type: 'select',
      source: 'menu',
      clearable: false
    },
    {
      label: '是否必填',
      prop: 'is_must',
      type: 'radio',
      path: [
        { label: 0, description: '不必填' },
        { label: 1, description: '必填' }
      ]
    },
    {
      label: '默认值',
      prop: 'defaults'
    },
    {
      label: '规则细节',
      prop: 'range',
      type: 'textarea',
      placeholder: '请输入符合要求的JSON字符串'
    },
    {
      label: '字段说明',
      prop: 'info',
      type: 'textarea',
      placeholder: '请输入字段描述'
    }
  ],
  uploadForm: {
    hash: '',
    jsonStr: '',
    type: 1
  },
  uploadFormRules: {
    jsonStr: [
      { required: true, message: '数据模板不能为空', trigger: 'blur' }
    ]
  },
  uploadFields: [
    {
      label: '数据模板',
      prop: 'jsonStr',
      type: 'textarea',
      placeholder: '请务必包含code,msg,data全部返回数据'
    }
  ]
}
