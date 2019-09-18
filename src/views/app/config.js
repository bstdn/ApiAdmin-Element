const groupDataConfig = {
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
      width: '120px',
      clearable: true
    },
    {
      type: 'select',
      value: 'type',
      placeholder: '请选择类别',
      path: [
        { value: '1', label: '应用组标识' },
        { value: '2', label: '应用组名称' }
      ],
      width: '120px',
      clearable: true
    },
    {
      type: 'input',
      value: 'keywords'
    }
  ],
  fields: [
    {
      label: '应用组名称',
      prop: 'name',
      align: 'center'
    },
    {
      label: '应用组描述',
      prop: 'description',
      align: 'center'
    },
    {
      label: '应用组标识',
      prop: 'hash',
      align: 'center',
      width: 130
    },
    {
      label: '状态',
      prop: 'status',
      align: 'center',
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

export { groupDataConfig }
