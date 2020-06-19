<template>
  <div class="app-container">
    <filter-bar
      :refresh="true"
      :filter-form="filterForm"
      :filter-config="filterConfig"
      @handleFilter="handleFilter"
      @handleRefresh="getList"
    />

    <data-table
      :data-source="list"
      :data-config="dataConfig"
      :btn-width="80"
      :del="true"
      :list-loading="listLoading"
      @handleDel="handleDel"
    >
      <template #expand="{scope}">
        请求数据：{{ scope.row.data }}
      </template>
      <template #add_time="{scope}">
        {{ scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
      </template>
    </data-table>

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
import Pagination from '@/components/Pagination'
import mixin from '@/utils/mixin'
import { getList, del } from '@/api/log'
import { logDataConfig as dataConfig } from './config'

export default {
  name: 'SystemLog',
  components: {
    BackToTop,
    FilterBar,
    DataTable,
    Pagination
  },
  mixins: [mixin],
  data() {
    return {
      filterForm: dataConfig.filterForm,
      filterConfig: dataConfig.filterConfig,
      dataConfig: dataConfig.fields
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
    handleDel(index, row) {
      del(row.id).then(response => {
        this.list.splice(index, 1)
        this.$message.success(response.msg)
      })
    }
  }
}
</script>

<style lang="scss">
.el-table__expanded-cell {
  word-wrap: break-word;
}
</style>
