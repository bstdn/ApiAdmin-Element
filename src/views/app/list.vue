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
      <template slot="app_status" slot-scope="{scope}">
        <el-switch
          v-model="scope.row.app_status"
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
      :menu-path="menuOptions"
      label-width="90px"
      @formClose="formClose"
      @formSubmit="dialogFormSubmit"
    >
      <template slot="app_secret">
        <el-input v-model="dialogForm.app_secret" disabled clearable>
          <el-button slot="append" :loading="refreshLoading" icon="el-icon-refresh-right" @click="refreshAppSecret" />
        </el-input>
      </template>
      <template slot="app_api">
        <div class="api-box">
          <div v-for="(apiArr, groupId) in groupList" :key="groupId" class="api-group">
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom: 6px;margin-bottom: 6px;">
              <el-checkbox
                :indeterminate="checkAllIndeterminate[groupId]"
                :value="checkAllStatus[groupId]"
                @change="handleCheckAll(groupId)"
              >
                {{ groupInfo[groupId] }}
              </el-checkbox>
            </div>
            <el-checkbox-group v-model="dialogForm.app_api[groupId]" @change="checkAllGroupChange(groupId)">
              <el-checkbox v-for="(api, apiKey) in apiArr" :key="apiKey" :label="api.hash">{{ api.info }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
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
import { getList, changeStatus, add, edit, del, getAppInfo, refreshAppSecretApi } from '@/api/app'
import { getAll } from '@/api/app-group'
import { appDataConfig } from './config'

export default {
  name: 'AppList',
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
      filterForm: appDataConfig.filterForm,
      filterConfig: appDataConfig.filterConfig,
      dataConfig: appDataConfig.fields,
      dialogForm: Object.assign({}, appDataConfig.dialogForm),
      dialogFormRules: appDataConfig.dialogFormRules,
      dialogConfig: appDataConfig.dialogFields,
      refreshLoading: false,
      appGroup: [],
      groupInfo: {},
      groupList: {},
      checkAllStatus: {},
      checkAllIndeterminate: {}
    }
  },
  computed: {
    menuOptions() {
      const result = []
      this.appGroup.map(v => result.push({ value: v.id, label: v.name }))
      return result
    }
  },
  mounted() {
    this.getList()
    getAll().then(response => {
      this.appGroup = response.data.list
    })
  },
  methods: {
    handleFilter() {
      this.pagination.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      const params = {
        page: this.pagination.page,
        size: this.pagination.size,
        status: this.filterForm.status,
        type: this.filterForm.type,
        keywords: this.filterForm.keywords
      }
      getList(params).then(response => {
        this.list = response.data.list
        this.total = response.data.count
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleSwitchChange(row) {
      changeStatus(row.app_status, row.id).then(response => {
        this.$message.success(response.msg)
      })
    },
    handleAdd() {
      this.dialogForm = Object.assign({}, appDataConfig.dialogForm)
      getAppInfo().then(response => {
        const res = response.data
        this.dialogForm.app_id = res.app_id
        this.dialogForm.app_secret = res.app_secret
        this.groupInfo = res.groupInfo
        this.groupList = res.apiList
        for (const index in this.groupInfo) {
          this.$set(this.checkAllStatus, index, false)
          this.$set(this.checkAllIndeterminate, index, false)
          this.$set(this.dialogForm.app_api, index, [])
        }
      })
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.dialogForm.id = row.id
      this.dialogForm.app_name = row.app_name
      this.dialogForm.app_info = row.app_info
      this.dialogForm.app_id = row.app_id
      this.dialogForm.app_secret = row.app_secret
      this.dialogForm.app_group = row.app_group
      getAppInfo(row.id).then(response => {
        const res = response.data
        this.groupInfo = res.groupInfo
        this.groupList = res.apiList
        for (const index in this.groupInfo) {
          if (res.app_detail === null || typeof (res.app_detail[index]) === 'undefined') {
            this.$set(this.checkAllStatus, index, false)
            this.$set(this.checkAllIndeterminate, index, false)
            this.$set(this.dialogForm.app_api, index, [])
          } else {
            const hasLength = res.app_detail[index].length
            if (hasLength === 0) {
              this.$set(this.checkAllStatus, index, false)
              this.$set(this.checkAllIndeterminate, index, false)
              this.$set(this.dialogForm.app_api, index, [])
            } else if (this.groupList[index].length === hasLength) {
              this.$set(this.checkAllStatus, index, true)
              this.$set(this.checkAllIndeterminate, index, false)
              this.$set(this.dialogForm.app_api, index, res.app_detail[index])
            } else {
              this.$set(this.checkAllStatus, index, false)
              this.$set(this.checkAllIndeterminate, index, true)
              this.$set(this.dialogForm.app_api, index, res.app_detail[index])
            }
          }
        }
      })
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
    refreshAppSecret() {
      this.refreshLoading = true
      refreshAppSecretApi().then(response => {
        this.dialogForm.app_secret = response.data.app_secret
        this.refreshLoading = false
      }).catch(() => {
        this.refreshLoading = false
      })
    },
    handleCheckAll(groupId) {
      if (this.checkAllStatus[groupId]) {
        this.checkAllStatus[groupId] = false
      } else {
        this.checkAllStatus[groupId] = !this.checkAllStatus[groupId]
      }
      this.checkAllIndeterminate[groupId] = false

      if (this.checkAllStatus[groupId]) {
        this.groupList[groupId].forEach(item => {
          this.dialogForm.app_api[groupId].push(item.hash)
        })
      } else {
        this.dialogForm.app_api[groupId] = []
      }
    },
    checkAllGroupChange(groupId) {
      if (this.dialogForm.app_api[groupId].length === this.groupList[groupId].length) {
        this.checkAllIndeterminate[groupId] = false
        this.checkAllStatus[groupId] = true
      } else if (this.dialogForm.app_api[groupId].length > 0) {
        this.checkAllIndeterminate[groupId] = true
        this.checkAllStatus[groupId] = false
      } else {
        this.checkAllIndeterminate[groupId] = false
        this.checkAllStatus[groupId] = false
      }
    },
    commonTitle
  }
}
</script>

<style scoped>
  .api-box {
    max-height: 300px;
    overflow: auto;
  }
  .api-group {
    margin-top: 10px;
    border: 1px solid #dddee1;
    border-radius: 5px;
    padding: 10px;
  }
</style>
