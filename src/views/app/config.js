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
        { value: '1', label: '启用' },
        { value: '0', label: '禁用' }
      ],
      width: '120px'
    },
    {
      type: 'select',
      value: 'type',
      placeholder: '请选择类别',
      path: [
        { value: 1, label: '应用组标识' },
        { value: 2, label: '应用组名称' }
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
      label: '应用组名称',
      prop: 'name'
    },
    {
      label: '应用组描述',
      prop: 'description'
    },
    {
      label: '应用组标识',
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
    id: 0
  },
  dialogFormRules: {
    name: [
      { required: true, message: '应用组名称不能为空', trigger: 'blur' }
    ]
  },
  dialogFields: [
    {
      label: '组名称',
      prop: 'name',
      placeholder: '请输入应用组名称'
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
      placeholder: '请输入应用组描述'
    }
  ]
}

export const appDataConfig = {
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
        { value: 1, label: 'AppId' },
        { value: 2, label: '应用名称' }
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
      label: '应用名称',
      prop: 'app_name',
      minWidth: 130
    },
    {
      label: 'AppId',
      prop: 'app_id',
      width: 120
    },
    {
      label: 'AppSecret',
      prop: 'app_secret',
      width: 300
    },
    {
      label: '应用说明',
      prop: 'app_info',
      width: 160
    },
    {
      label: '状态',
      prop: 'app_status',
      width: 200
    }
  ],
  dialogForm: {
    app_name: '',
    app_id: '',
    app_secret: '',
    app_info: '',
    app_api: {},
    app_group: 'default',
    id: 0
  },
  dialogFormRules: {
    app_name: [
      { required: true, message: '应用名称不能为空', trigger: 'blur' }
    ]
  },
  dialogFields: [
    {
      label: '应用名称',
      prop: 'app_name',
      placeholder: '请输入应用名称'
    },
    {
      label: 'AppId',
      prop: 'app_id',
      disabled: true,
      tag: '系统自动生成，不允许修改',
      tagType: 'danger',
      style: 'width: 50%;'
    },
    {
      label: 'AppSecret',
      prop: 'app_secret'
    },
    {
      label: '接口分组',
      prop: 'group_hash',
      type: 'select',
      source: 'menu',
      clearable: false
    },
    {
      label: '应用描述',
      prop: 'app_info',
      type: 'textarea'
    },
    {
      label: '接口访问',
      prop: 'app_api'
    }
  ]
}
