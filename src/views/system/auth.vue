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
      <template #member_list="{scope}">
        <el-button type="primary" @click="handleMemberList(scope.row.id)">组成员</el-button>
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
      <template #rules>
        <el-tree
          ref="formTree"
          class="rule-list"
          :data="ruleList"
          :props="treeProps"
          node-key="id"
          default-expand-all
          show-checkbox
        />
      </template>
    </data-form>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="pagination.page"
      :limit.sync="pagination.size"
      @pagination="getList"
    />

    <drag-dialog
      :form-visible.sync="memberShow.memberVisible"
      width="90%"
      title="组成员列表"
      @formClose="memberShow.memberVisible = false"
    >
      <template #body>
        <data-table
          :data-source="memberList"
          :data-config="memberDataConfig"
          :btn-width="80"
          :type="true"
          :del="true"
          :list-loading="memberShow.listLoading"
          @handleDel="handleMemberDel"
        >
          <template #status="{scope}">
            <el-tag :type="scope.row.status === 0 ? 'danger' : 'success'">
              {{ scope.row.status === 0 ? '禁用' : '启用' }}
            </el-tag>
          </template>
        </data-table>

        <pagination
          v-show="memberShow.total>0"
          :total="memberShow.total"
          :page.sync="memberShow.page"
          :limit.sync="memberShow.size"
          @pagination="getMemberList"
        />
      </template>
    </drag-dialog>

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
import DragDialog from '@/components/DragDialog'
import mixin from '@/utils/mixin'
import { commonTitle } from '@/utils/i18n'
import { getList, changeStatus, add, edit, del, delMember, getRuleList } from '@/api/auth'
import { getUsers } from '@/api/user'
import { authDataConfig as dataConfig } from './config'

export default {
  name: 'SystemAuth',
  components: {
    BackToTop,
    FilterBar,
    DataTable,
    DataForm,
    Pagination,
    DragDialog
  },
  mixins: [mixin],
  data() {
    return {
      filterForm: dataConfig.filterForm,
      filterConfig: dataConfig.filterConfig,
      dataConfig: dataConfig.fields,
      dialogForm: {},
      dialogFormRules: dataConfig.dialogFormRules,
      dialogConfig: dataConfig.dialogFields,
      memberDataConfig: dataConfig.userFields,
      memberList: [],
      memberShow: {
        memberVisible: false,
        listLoading: false,
        page: 1,
        size: 10,
        total: 0,
        gid: 0
      },
      ruleList: [],
      treeProps: {
        label: 'title'
      }
    }
  },
  mounted() {
    this.getList()
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
    handleSwitchChange(row) {
      changeStatus(row.status, row.id).then(response => {
        this.$message.success(response.msg)
      })
    },
    handleAdd() {
      this.dialogForm = { ...dataConfig.dialogForm }
      this.dialogStatus = 'add'
      getRuleList().then(response => {
        this.ruleList = response.data.list
      })
      this.$nextTick(() => {
        this.$refs.formTree.setCheckedKeys([])
      })
      this.dialogFormVisible = true
    },
    async handleEdit(row) {
      this.dialogFormVisible = true
      this.dialogForm = { ...dataConfig.dialogForm, ...row }
      this.dialogStatus = 'edit'
      this.ruleList = await this.awaitGetRuleList(row.id)
      this.$nextTick(() => {
        this.$refs.formTree.setCheckedKeys(this.generateCheckedKeys(this.ruleList))
      })
    },
    awaitGetRuleList(id) {
      return new Promise(resolve => {
        getRuleList({ 'group_id': id }).then(response => {
          resolve(response.data.list)
        })
      })
    },
    generateCheckedKeys(routes) {
      let data = []
      routes.forEach(route => {
        if (route.checked === true) data.push(route.id)
        if (route.children) {
          const temp = this.generateCheckedKeys(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    dialogFormSubmit(params) {
      this.dialogSubmitLoading = true
      params.rules = []
      const checkedNodes = this.$refs.formTree.getCheckedNodes()
      const ruleLength = checkedNodes.length
      if (ruleLength) {
        for (let i = 0; i <= ruleLength - 1; i++) {
          params.rules.push(checkedNodes[i]['key'])
        }
      }
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
    handleMemberList(gid) {
      this.memberShow.gid = gid
      this.memberShow.memberVisible = true
      this.getMemberList()
    },
    getMemberList() {
      this.memberShow.listLoading = true
      const params = {
        page: this.memberShow.page,
        size: this.memberShow.size,
        gid: this.memberShow.gid
      }
      getUsers(params).then(response => {
        this.memberList = response.data.list
        this.memberShow.total = response.data.count
        this.memberShow.listLoading = false
      }).catch(() => {
        this.memberShow.listLoading = false
      })
    },
    handleMemberDel(index, row) {
      delMember({
        uid: row.id,
        gid: this.memberShow.gid
      }).then(response => {
        this.memberList.splice(index, 1)
        this.$message.success(response.msg)
      })
    },
    commonTitle
  }
}
</script>

<style>
.rule-list {
  height: 300px;
  border: 1px solid #dddee1;
  border-radius: 5px;
  padding: 10px;
  overflow: auto;
}
</style>
