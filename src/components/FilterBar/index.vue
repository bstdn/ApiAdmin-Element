<template>
  <div class="filter-container">
    <el-form :inline="true" :model="filterForm">
      <slot name="prepend" />
      <el-form-item
        v-for="item in filterConfig"
        :key="item.value"
        :style="{ width: item.width }"
      >
        <template slot-scope="scope">
          <slot :scope="scope" :name="item.value">
            <el-select
              v-if="item.type === 'select'"
              v-model="filterForm[item.value]"
              v-bind="item"
              :clearable="item.clearable !== false"
              :style="item.style || 'width: 100%;'"
              filterable
            >
              <el-option
                v-for="option in item.path"
                :key="option.value"
                v-bind="option"
              />
            </el-select>
            <el-input
              v-else
              v-model="filterForm[item.value]"
              v-bind="item"
              :maxlength="item.maxlength || 255"
              clearable
            >
              <template v-if="item.prepend" slot="prepend">{{ item.prepend }}</template>
              <template v-if="item.append" slot="append">{{ item.append }}</template>
            </el-input>
          </slot>
        </template>
      </el-form-item>
      <slot name="append" />
      <el-form-item>
        <el-button v-if="filterConfig.length>0" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ commonTitle(filterText) }}</el-button>
      </el-form-item>
      <el-form-item v-if="add">
        <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">{{ commonTitle(addText) }}</el-button>
      </el-form-item>
      <slot name="moreButton" />
      <el-form-item v-if="refresh" style="float: right;">
        <el-button class="filter-item" type="success" icon="el-icon-refresh" @click="handleRefresh">{{ commonTitle(refreshText) }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { commonTitle } from '@/utils/i18n'

export default {
  name: 'FilterBar',
  props: {
    filterForm: {
      type: Object,
      default: () => {}
    },
    filterConfig: {
      type: Array,
      default: () => []
    },
    filterText: {
      type: String,
      default: 'search'
    },
    add: {
      type: Boolean,
      default: false
    },
    addText: {
      type: String,
      default: 'add'
    },
    refresh: {
      type: Boolean,
      default: false
    },
    refreshText: {
      type: String,
      default: 'refresh'
    }
  },
  methods: {
    handleFilter() {
      this.$emit('handleFilter')
    },
    handleAdd() {
      this.$emit('handleAdd')
    },
    handleRefresh() {
      this.$emit('handleRefresh')
    },
    remoteMethod(query) {
      this.$emit('remoteMethod', query)
    },
    commonTitle
  }
}
</script>
