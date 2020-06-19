<template>
  <el-table
    v-loading="listLoading"
    v-bind="$attrs"
    :data="dataSource"
    :row-key="rowKey"
    highlight-current-row
    border
  >
    <slot name="prepend" />
    <el-table-column v-if="type" type="index" width="50" align="center" />
    <el-table-column
      v-for="item in dataConfig"
      :key="item.prop"
      v-bind="item"
      :align="item.align || 'center'"
    >
      <template slot-scope="scope">
        <slot :scope="scope" :name="item.prop">
          {{ scope.row[item.prop] }}
        </slot>
      </template>
    </el-table-column>
    <slot name="append" />
    <el-table-column
      v-if="btnWidth"
      :width="btnWidth"
      :label="commonTitle('actions')"
      :fixed="btnFixed"
      align="center"
    >
      <template slot-scope="scope">
        <el-button v-if="edit" size="mini" type="primary" @click.native="$emit('handleEdit', scope.row)">{{ commonTitle('edit') }}</el-button>
        <slot :scope="scope" name="moreButton" />
        <el-button v-if="del" size="mini" type="danger" @click.native="handleDel(scope.$index, scope.row)">{{ commonTitle('delete') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { commonTitle } from '@/utils/i18n'

export default {
  name: 'DataTable',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    rowKey: {
      type: String,
      default: ''
    },
    dataConfig: {
      type: Array,
      required: true
    },
    listLoading: {
      type: Boolean,
      default: false
    },
    btnWidth: {
      type: Number,
      default: 0
    },
    btnFixed: {
      type: [String, Boolean],
      default: false
    },
    type: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: false
    },
    del: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleDel(index, row) {
      this.$confirm(this.commonTitle('deleteTips'), this.commonTitle('tips'), {
        type: 'warning'
      }).then(() => {
        this.$emit('handleDel', index, row)
      }).catch(() => {})
    },
    commonTitle
  }
}
</script>
