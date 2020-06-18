<template>
  <div id="fieldsForm">
    <el-form-item
      v-for="item in formConfig"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
    >
      <template slot-scope="scope">
        <slot :scope="scope" :name="item.prop">
          <template v-if="item.type === 'password'">
            <el-input
              v-model="dataForm[item.prop]"
              v-bind="item"
              :type="passwordType"
              :maxlength="item.maxlength || 255"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </template>
          <el-input
            v-else
            v-model="dataForm[item.prop]"
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
  </div>
</template>

<script>
export default {
  name: 'FieldsForm',
  props: {
    dataForm: {
      type: Object,
      required: true
    },
    formConfig: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      passwordType: 'password'
    }
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $dark_gray: #889aa4;
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
</style>
