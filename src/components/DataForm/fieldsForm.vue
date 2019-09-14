<template>
  <div id="fieldsForm">
    <el-form-item
      v-for="(item, index) in formConfig"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <template slot-scope="scope">
        <slot :scope="scope" :name="item.prop">
          <template v-if="item.type === 'password'">
            <el-input
              v-model="dataForm[item.prop]"
              :type="passwordType"
              :minlength="item.minlength"
              :maxlength="item.maxlength || 255"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </template>
          <el-input
            v-else
            v-model="dataForm[item.prop]"
            :type="item.type"
            :minlength="item.minlength"
            :maxlength="item.maxlength || 255"
            :disabled="item.disabled"
            :placeholder="item.placeholder"
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
import { commonTitle } from '@/utils/i18n'

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
    },
    commonTitle
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
