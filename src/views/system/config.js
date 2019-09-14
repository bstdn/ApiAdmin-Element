const menuDataConfig = {
  fields: [
    {
      label: '菜单名称',
      prop: 'showName'
    },
    {
      label: '排序',
      prop: 'sort',
      align: 'center',
      width: 80
    },
    {
      label: '菜单URL',
      prop: 'url',
      width: 200
    },
    {
      label: '状态',
      prop: 'hide',
      align: 'center',
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

const logDataConfig = {
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
      type: 'expand',
      prop: 'expand',
      width: 50
    },
    {
      label: '行为名称',
      prop: 'action_name',
      align: 'center'
    },
    {
      label: '用户ID',
      prop: 'uid',
      align: 'center',
      width: 120
    },
    {
      label: '用户昵称',
      prop: 'nickname',
      align: 'center',
      width: 100
    },
    {
      label: '操作URL',
      prop: 'url',
      align: 'center',
      width: 200
    },
    {
      label: '执行时间',
      prop: 'add_time',
      align: 'center',
      width: 160
    }
  ]
}

export { menuDataConfig, logDataConfig }
