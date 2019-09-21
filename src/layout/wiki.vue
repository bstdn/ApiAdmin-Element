<template>
  <div :class="classObj" class="app-wrapper">
    <div class="navbar">
      <div class="right-menu">
        <router-link to="list" class="right-menu-item">
          <svg-icon icon-class="md-list-box" />
          接口列表
        </router-link>
        <el-dropdown class="right-menu-item hover-effect" style="margin-right: 30px;">
          <span class="el-dropdown-link">
            <i class="el-icon-user-solid" />
            {{ app_id }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Wiki',
  mixins: [ResizeMixin],
  data() {
    return {
      app_id: sessionStorage.getItem('ApiAdmin_AppInfo')
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    }),
    key() {
      return this.$route.fullPath
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('wiki/logout').then(() => {
        sessionStorage.removeItem('ApiAdmin_AppInfo')
        this.$router.push(`/wiki/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
  .mobile .fixed-header {
    width: 100%;
  }
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #001529;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        vertical-align: text-bottom;
        &.hover-effect {
          cursor: pointer;
          transition: background .3s;
          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }
    }
  }
</style>
