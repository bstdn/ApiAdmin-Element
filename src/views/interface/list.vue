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
    >
      <template slot="moreButton">
        <el-button :loading="refreshLoading" type="warning" icon="el-icon-refresh-right" @click="refreshRoute">刷新路由</el-button>
      </template>
    </filter-bar>

    <data-table
      :data-source="list"
      :data-config="dataConfig"
      :btn-width="350"
      :type="true"
      :edit="true"
      :del="true"
      :list-loading="listLoading"
      @handleEdit="handleEdit"
      @handleDel="handleDel"
    >
      <template slot="method" slot-scope="{scope}">
        <el-tag :type="scope.row.method | methodTag">{{ scope.row.method | methodFilter }}</el-tag>
      </template>
      <template slot="status" slot-scope="{scope}">
        <el-switch
          v-model="scope.row.status"
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="禁用"
          @change="handleSwitchChange(scope.row)"
        />
      </template>
      <template slot="moreButton" slot-scope="{scope}">
        <el-button size="mini" type="info" @click.native="handleRequest(scope.row)">请求参数</el-button>
        <el-button size="mini" type="warning" @click.native="handleResponse(scope.row)">返回参数</el-button>
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
      label-width="130px"
      @formClose="formClose"
      @formSubmit="dialogFormSubmit"
    />

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
import { getHash } from '@/api'
import { getList, changeStatus, add, edit, del, refresh } from '@/api/interface'
import { getAll } from '@/api/interface-group'
import { listDataConfig } from './config'

export default {
  name: 'InterfaceList',
  components: {
    BackToTop,
    FilterBar,
    DataTable,
    DataForm,
    Pagination
  },
  filters: {
    methodTag(method) {
      const methodMap = {
        0: 'warning',
        1: 'success',
        2: 'primary'
      }
      return methodMap[method]
    },
    methodFilter(method) {
      const methodMap = {
        0: '不限',
        1: 'POST',
        2: 'GET'
      }
      return methodMap[method]
    }
  },
  mixins: [mixin],
  data() {
    return {
      filterForm: listDataConfig.filterForm,
      filterConfig: listDataConfig.filterConfig,
      dataConfig: listDataConfig.fields,
      dialogForm: Object.assign({}, listDataConfig.dialogForm),
      dialogFormRules: listDataConfig.dialogFormRules,
      dialogConfig: listDataConfig.dialogFields,
      apiGroup: [],
      confirmRefresh: false,
      refreshLoading: false
    }
  },
  computed: {
    menuOptions() {
      const result = []
      this.apiGroup.map(v => result.push({ value: v.hash, label: v.name }))
      return result
    }
  },
  mounted() {
    this.getList()
    getAll().then(response => {
      this.apiGroup = response.data.list
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
      changeStatus(row.status, row.hash).then(response => {
        this.$message.success(response.msg)
      })
    },
    handleAdd() {
      this.dialogForm = Object.assign({}, listDataConfig.dialogForm)
      getHash().then(response => {
        this.dialogForm.hash = response.data.hash
      })
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.dialogForm.id = row.id
      this.dialogForm.api_class = row.api_class
      this.dialogForm.info = row.info
      this.dialogForm.method = row.method
      this.dialogForm.hash = row.hash
      this.dialogForm.group_hash = row.group_hash
      this.dialogForm.access_token = row.access_token
      this.dialogForm.is_test = row.is_test
      this.dialogForm.need_login = row.need_login
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
      del(row.hash).then(response => {
        this.list.splice(index, 1)
        this.$message.success(response.msg)
      })
    },
    refreshRoute() {
      this.$confirm('刷新路由是一个非常危险的操作，它有可能影响到您现有接口的访问，请确认无误后刷新！', '确定要刷新路由么', {
        type: 'warning'
      }).then(() => {
        this.refreshLoading = true
        refresh().then(response => {
          this.$message.success(response.msg)
          this.refreshLoading = false
        }).catch(() => {
          this.refreshLoading = false
        })
      }).catch(() => {})
    },
    handleRequest(row) {
      this.$router.push({ path: 'request/' + row.hash })
    },
    handleResponse(row) {
      this.$router.push({ path: 'response/' + row.hash })
    },
    commonTitle
  }
}
</script>
