<template>
  <div class="upload-container">
    <el-upload
      :action="actionUrl"
      :headers="headers"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleSuccess"
      class="avatar-uploader"
      drag
    >
      <img v-if="imageUrl.length>0" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { baseUrl } from '@/utils/request'

export default {
  name: 'AvatarUpload',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    headers() {
      return {
        'apiAuth': getToken()
      }
    },
    actionUrl() {
      return baseUrl + '/Index/upload'
    },
    imageUrl() {
      return this.value
    }
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleSuccess(response) {
      if (response.code === 0) {
        this.$message.success(response.msg)
        this.emitInput(response.data.fileUrl)
      } else {
        this.$message.error(response.msg)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .avatar-uploader {
    width: 200px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
}
</style>
