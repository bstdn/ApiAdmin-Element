export const listDataConfig = {
  headerFields: [
    {
      label: '参数名称',
      prop: 'field_name'
    },
    {
      label: '类型',
      prop: 'data_type'
    },
    {
      label: '字段状态',
      prop: 'is_must'
    },
    {
      label: '字段说明',
      prop: 'info',
      width: '320px'
    }
  ],
  requestFields: [
    {
      label: '字段名称',
      prop: 'field_name'
    },
    {
      label: '类型',
      prop: 'data_type',
      width: '100px'
    },
    {
      label: '字段属性',
      prop: 'is_must',
      width: '90px'
    },
    {
      label: '默认值',
      prop: 'default'
    },
    {
      label: '字段说明',
      prop: 'info',
      width: '320px'
    }
  ],
  responseFields: [
    {
      label: '字段名称',
      prop: 'show_name'
    },
    {
      label: '类型',
      prop: 'data_type'
    },
    {
      label: '字段说明',
      prop: 'info',
      width: '320px'
    }
  ]
}

export const errorDataConfig = {
  fields: [
    {
      label: '英文标识',
      prop: 'en_code'
    },
    {
      label: '错误码',
      prop: 'code'
    },
    {
      label: '中文说明',
      prop: 'chinese'
    }
  ]
}
