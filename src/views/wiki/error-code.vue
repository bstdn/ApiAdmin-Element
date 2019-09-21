<template>
  <div class="app-container">
    <data-table
      :data-source="list"
      :data-config="dataConfig"
      :type="true"
      :list-loading="listLoading"
    />

    <el-tooltip placement="top" content="Top">
      <back-to-top />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import DataTable from '@/components/DataTable'
import mixin from '@/utils/mixin'
import { errorCode } from '@/api/wiki'
import { errorDataConfig } from './config'

export default {
  name: 'WikiError',
  components: {
    BackToTop,
    DataTable
  },
  mixins: [mixin],
  data() {
    return {
      dataConfig: errorDataConfig.fields
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      errorCode().then(response => {
        this.list = response.data.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
