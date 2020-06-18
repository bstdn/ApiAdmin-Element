<template>
  <div class="app-container">
    <filter-bar
      :add="true"
      :refresh="true"
      :filter-form="filterForm"
      :filter-config="filterConfig"
      @handleAdd="handleAdd"
      @handleFilter="handleFilter"
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
      <template #login_times="{scope}">
        {{ scope.row.userData === null ? '' : scope.row.userData.login_times }}
      </template>
      <template #last_login_time="{scope}">
        {{ scope.row.userData === null ? '' : scope.row.userData.last_login_time }}
      </template>
      <template #last_login_ip="{scope}">
        {{ scope.row.userData === null ? '' : scope.row.userData.last_login_ip }}
      </template>
      <template #status="{scope}">
        <el-switch
          v-model="scope.row.status"
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="禁用"
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
      label-width="80px"
      @formClose="formClose"
      @formSubmit="dialogFormSubmit"
    >
      <template #group_id>
        <el-checkbox-group v-model="dialogForm.group_id">
          <el-checkbox v-for="group in groupList" :key="group.id" :label="group.id + ''">{{ group.name }}</el-checkbox>
        </el-checkbox-group>
      </template>
    </data-form>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="pagination.page"
      :limit.sync="pagination.size"
      @pagination="getList"
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
import Pagination from '@/components/Pagination'
import mixin from '@/utils/mixin'
import { commonTitle } from '@/utils/i18n'
import { getGroups } from '@/api/auth'
import { getList, changeStatus, add, edit, del } from '@/api/user'
import { userDataConfig } from './config'

export default {
  name: 'SystemUser',
  components: {
    BackToTop,
    FilterBar,
    DataTable,
    DataForm,
    Pagination
  },
  mixins: [mixin],
  data() {
    return {
      filterForm: userDataConfig.filterForm,
      filterConfig: userDataConfig.filterConfig,
      dataConfig: userDataConfig.fields,
      dialogForm: Object.assign({}, userDataConfig.dialogForm),
      dialogFormRules: this.realDialogFormRules(),
      dialogConfig: userDataConfig.dialogFields,
      groupList: []
    }
  },
  mounted() {
    this.getList()
    this.getGroups()
  },
  methods: {
    handleFilter() {
      this.pagination.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      const params = {
        ...this.pagination,
        ...this.filterForm
      }
      getList(params).then(response => {
        this.list = response.data.list
        this.total = response.data.count
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getGroups() {
      getGroups().then(response => {
        this.groupList = response.data.list
      })
    },
    realDialogFormRules() {
      const rules = {
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: (role, value, callback) => {
              if (this.dialogForm.id === 0 && value === '') {
                callback(new Error('用户密码不能为空'))
              }
              callback()
            }
          }
        ]
      }
      return Object.assign({}, userDataConfig.dialogFormRules, rules)
    },
    handleSwitchChange(row) {
      changeStatus(row.status, row.id).then(response => {
        this.$message.success(response.msg)
      })
    },
    handleAdd() {
      this.dialogForm = Object.assign({}, userDataConfig.dialogForm)
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.dialogForm.id = row.id
      this.dialogForm.username = row.username
      this.dialogForm.nickname = row.nickname
      this.dialogForm.password = ''
      this.dialogForm.group_id = row.group_id
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
