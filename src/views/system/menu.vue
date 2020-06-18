<template>
  <div class="app-container">
    <filter-bar
      :add="true"
      :refresh="true"
      @handleAdd="handleAdd"
      @handleRefresh="getList"
    />

    <data-table
      :data-source="list"
      :data-config="dataConfig"
      :btn-width="160"
      :type="true"
      :edit="true"
      :del="true"
      :list-loading="listLoading"
      @handleEdit="handleEdit"
      @handleDel="handleDel"
    >
      <template #hide="{scope}">
        <el-switch
          v-model="scope.row.hide"
          :active-value="1"
          :inactive-value="0"
          active-text="隐藏"
          inactive-text="显示"
          @change="handleSwitchChange(scope.row)"
        />
      </template>
    </data-table>

    <data-form
      :data-form="dialogForm"
      :data-form-rules="dialogFormRules"
      :form-visible.sync="dialogFormVisible"
      :form-config="dialogConfig"
      :submit-loading="dialogSubmitLoading"
      :title="dialogStatus==='add' ? commonTitle('add') : commonTitle('edit')"
      :menu-path="menuOptions"
      label-width="80px"
      @formClose="formClose"
      @formSubmit="dialogFormSubmit"
    />

    <el-tooltip placement="top" content="Top">
      <back-to-top />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import FilterBar from '@/components/FilterBar'
import DataTable from '@/components/DataTable'
import DataForm from '@/components/DataForm'
import mixin from '@/utils/mixin'
import { commonTitle } from '@/utils/i18n'
import { getList, changeStatus, add, edit, del } from '@/api/menu'
import { menuDataConfig } from './config'

export default {
  name: 'SystemMenu',
  components: {
    BackToTop,
    FilterBar,
    DataTable,
    DataForm
  },
  mixins: [mixin],
  data() {
    return {
      dataConfig: menuDataConfig.fields,
      dialogForm: Object.assign({}, menuDataConfig.dialogForm),
      dialogFormRules: menuDataConfig.dialogFormRules,
      dialogConfig: menuDataConfig.dialogFields
    }
  },
  computed: {
    menuOptions() {
      const result = [{ value: 0, label: '顶级菜单' }]
      this.list.map(v => result.push({ value: v.id, label: v.showName }))
      return result
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.list
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleSwitchChange(row) {
      changeStatus(row.hide, row.id).then(response => {
        this.$message.success(response.msg)
      })
    },
    handleAdd() {
      this.dialogForm = Object.assign({}, menuDataConfig.dialogForm)
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.dialogForm.id = row.id
      this.dialogForm.name = row.name
      this.dialogForm.fid = row.fid
      this.dialogForm.url = row.url.slice(6)
      this.dialogForm.sort = row.sort
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    dialogFormSubmit(params) {
      this.dialogSubmitLoading = true
      if (this.dialogStatus === 'add') {
        add(params).then(response => {
          this.dialogFormVisible = false
          this.dialogSubmitLoading = false
          this.$message.success(response.msg)
          this.getList()
        }).catch(() => {
          this.dialogSubmitLoading = false
        })
      } else {
        edit(params).then(response => {
          this.dialogFormVisible = false
          this.dialogSubmitLoading = false
          this.$message.success(response.msg)
          this.getList()
        }).catch(() => {
          this.dialogSubmitLoading = false
        })
      }
    },
    handleDel(index, row) {
      del(row.id).then(response => {
        this.list.splice(index, 1)
        this.$message.success(response.msg)
      })
    },
    commonTitle
  }
}
</script>
