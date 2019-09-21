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
  </div>
</template>

<script>
export default {
  name: 'WikiList'
}
</script>
