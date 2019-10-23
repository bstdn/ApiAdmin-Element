<template>
  <div class="app-container">
    <el-card>
      <div>
        <h3>接口状态说明：</h3>
        <p>
          <el-tag type="warning">测试</el-tag>
          系统将不过滤任何字段，也不进行AccessToken的认证，但在必要的情况下会进行UserToken的认证！
        </p>
        <p>
          <el-tag type="primary">启用</el-tag>
          系统将严格过滤请求字段，并且进行全部必要认证！
        </p>
        <p>
          <el-tag type="danger">禁用</el-tag>
          系统将拒绝所有请求，一般应用于危机处理！
        </p>
      </div>
    </el-card>

    <el-card v-if="groupInfo.length>0" style="margin-top: 15px">
      <el-collapse>
        <el-collapse-item
          v-for="item in groupInfo"
          :key="item.id"
        >
          <template slot="title">
            <div class="collapse-title">
              接口数量{{ item.api_info ? item.api_info.length : 0 }} | 项目热度{{ item.hot }}
            </div>
            {{ item.name }} 【{{ item.create_time }}】
          </template>
          <el-alert
            v-for="api_item in item.api_info"
            :key="api_item.id"
            v-loading.fullscreen.lock="fullscreenLoading"
            :closable="false"
            :type="api_item.method | methodType"
            style="margin-bottom: 10px;cursor: pointer"
            @click.native.prevent="showApiDetail(api_item.hash)"
          >
            <template slot="title">
              <h3>/api/{{ api_item.hash }}</h3>
              <el-tag :type="api_item.method | methodType" effect="dark">{{ api_item.method | methodText }}</el-tag>
              {{ api_item.info }}
            </template>
          </el-alert>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-drawer
      direction="rtl"
      size="900px"
      :title="apiDetail.info"
      :visible.sync="showDetail"
      :before-close="closeDrawer"
      class="drawer-con"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="接口说明" name="apiInfo">
          <el-form label-width="80px">
            <el-form-item label="接口地址">
              <el-tag :type="apiDetail.method | methodType" effect="dark">{{ apiDetail.method | methodText }}</el-tag>
              <el-input v-model="url" style="width: 550px;max-width: 100%;" />
              <el-button type="primary" @click="handleCopy(url, $event)">copy</el-button>
            </el-form-item>
            <el-form-item label="请求头部">
              <data-table
                :data-source="headerList"
                :data-config="headerConfig"
              >
                <template slot="data_type" slot-scope="{scope}">
                  <el-tag type="primary">{{ detailInfo.dataType[scope.row.data_type] }}</el-tag>
                </template>
                <template slot="is_must" slot-scope="{scope}">
                  <el-tag :type="scope.row.is_must === 1 ? 'danger' : 'primary'">
                    {{ scope.row.is_must === 1 ? '复杂认证' : '简易认证' }}
                  </el-tag>
                </template>
                <template slot="info" slot-scope="{scope}">
                  <el-tooltip
                    v-if="scope.row.info.length>=20"
                    :content="scope.row.info"
                    placement="bottom"
                  >
                    <span>{{ scope.row.info.substring(0, 20) + '...' }}</span>
                  </el-tooltip>
                  <span v-else>{{ scope.row.info }}</span>
                </template>
              </data-table>
            </el-form-item>
            <el-form-item label="请求参数">
              <data-table
                :data-source="detailInfo.request"
                :data-config="requestConfig"
              >
                <template slot="data_type" slot-scope="{scope}">
                  <el-tag type="primary">{{ detailInfo.dataType[scope.row.data_type] }}</el-tag>
                </template>
                <template slot="is_must" slot-scope="{scope}">
                  <el-tag :type="scope.row.is_must === 1 ? 'danger' : 'primary'">
                    {{ scope.row.is_must === 1 ? '必填' : '选填' }}
                  </el-tag>
                </template>
                <template slot="info" slot-scope="{scope}">
                  <el-tooltip
                    v-if="scope.row.info.length>=20"
                    :content="scope.row.info"
                    placement="bottom"
                  >
                    <span>{{ scope.row.info.substring(0, 20) + '...' }}</span>
                  </el-tooltip>
                  <span v-else>{{ scope.row.info }}</span>
                </template>
              </data-table>
            </el-form-item>
            <el-form-item label="请求头部">
              <data-table
                :data-source="detailInfo.response"
                :data-config="responseConfig"
              >
                <template slot="data_type" slot-scope="{scope}">
                  <el-tag type="primary">{{ detailInfo.dataType[scope.row.data_type] }}</el-tag>
                </template>
                <template slot="info" slot-scope="{scope}">
                  <el-tooltip
                    v-if="scope.row.info.length>=20"
                    :content="scope.row.info"
                    placement="bottom"
                  >
                    <span>{{ scope.row.info.substring(0, 20) + '...' }}</span>
                  </el-tooltip>
                  <span v-else>{{ scope.row.info }}</span>
                </template>
              </data-table>
            </el-form-item>
            <el-form-item v-if="code" label="返回示例">
              <div v-highlight>
                <pre><code>{{ code }}</code></pre>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="接口测试" name="apiTest">
          <el-card>
            <div style="text-align: center">
              <img width="120px" src="https://cn.vuejs.org/images/logo.png">
              <h3>在线测试功能，即将到来</h3>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>

    <el-tooltip placement="top" content="Top">
      <back-to-top />
    </el-tooltip>
  </div>
</template>

<script>
import highlight from '@/directive/highlight'
import clip from '@/utils/clipboard'
import BackToTop from '@/components/BackToTop'
import DataTable from '@/components/DataTable'
import { apiGroup, detail } from '@/api/wiki'
import { listDataConfig } from './config'

export default {
  name: 'WikiList',
  components: {
    BackToTop,
    DataTable
  },
  directives: {
    highlight
  },
  filters: {
    methodType(method) {
      const map = {
        0: 'warning',
        1: 'info',
        2: 'success'
      }
      return map[method]
    },
    methodText(method) {
      const map = {
        0: '不限',
        1: 'GET',
        2: 'POST'
      }
      return map[method]
    }
  },
  data() {
    return {
      groupInfo: [],
      fullscreenLoading: false,
      showDetail: false,
      activeName: 'apiInfo',
      code: '',
      url: '',
      detailInfo: {},
      apiDetail: {},
      headerList: [],
      headerConfig: listDataConfig.headerFields,
      requestConfig: listDataConfig.requestFields,
      responseConfig: listDataConfig.responseFields
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      apiGroup().then(response => {
        this.groupInfo = response.data.data
      })
    },
    closeDrawer() {
      this.showDetail = false
      this.getList()
    },
    showApiDetail(hash) {
      this.fullscreenLoading = true
      detail({ hash }).then(response => {
        const res = response.data
        this.detailInfo = res
        this.url = res.url
        this.apiDetail = res.apiList
        if (res.apiList.return_str) {
          this.code = JSON.parse(res.apiList.return_str)
        }
        this.headerList = [{
          is_must: res.apiList.access_token,
          field_name: 'access-token',
          info: 'APP认证秘钥【请在Header头里面传递】',
          data_type: 2
        }]
        this.showDetail = true
        this.fullscreenLoading = false
      }).catch(() => {
        this.fullscreenLoading = false
      })
    },
    handleCopy(text, event) {
      clip(text, event)
    }
  }
}
</script>

<style lang="scss">
  .collapse-title {
    position: absolute;
    right: 20px;
    margin-right: 60px;
  }
  .drawer-con .el-drawer__body {
    padding: 0 15px 0;
    overflow: auto;
  }
</style>
