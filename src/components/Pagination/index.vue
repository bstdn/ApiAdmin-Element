<template>
  <div class="pagination-container">
    <slot name="prepend" />
    <el-pagination
      :total="total"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :current-page.sync="currentPage"
      :layout="deviceLayout"
      :background="background"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <slot name="append" />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50, 100]
    },
    layout: {
      type: String,
      default: '->, total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    float: {
      type: String,
      default: 'right'
    },
    batchDelRoles: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    deviceLayout() {
      return this.$store.state.app.device !== 'mobile' ? this.layout : this.mobileLayout
    },
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
  .pagination-container {
    background: #fff;
    padding: 32px 16px;
  }
</style>
