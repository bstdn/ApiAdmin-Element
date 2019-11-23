<template>
  <el-dialog
    v-el-drag-dialog
    :title="title"
    :width="deviceWidth"
    :visible.sync="formVisible"
    :before-close="formClose"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataFormRules"
      :label-position="labelPosition"
      :label-width="labelWidth"
    >
      <slot name="prepend" />
      <el-form-item
        v-for="item in formConfig"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
      >
        <template slot-scope="scope">
          <slot :scope="scope" :name="item.prop">
            <el-radio-group
              v-if="item.type === 'radio'"
              v-model="dataForm[item.prop]"
            >
              <el-radio
                v-for="option in item.path"
                :key="option.label"
                :disabled="option.disabled"
                :label="option.label"
              >
                {{ option.description }}
              </el-radio>
            </el-radio-group>
            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="dataForm[item.prop]"
                :multiple="item.multiple"
                :disabled="item.disabled"
                :clearable="item.clearable === false ? false : true"
                :placeholder="item.placeholder"
                :allow-create="item.allowCreate"
                :remote="item.remote"
                :remote-method="item.source === 'menu' ? menuRemoteMethod : remoteMethod"
                :loading="selectLoading"
                :reserve-keyword="item.reserveKeyword"
                :style="item.style || 'width: 100%;'"
                filterable
                @change="handleSelectChange"
              >
                <el-option
                  v-for="option in item.source === 'menu' ? menuPath : item.path"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                  :disabled="option.disabled"
                />
              </el-select>
              <el-tooltip v-if="item.tooltip" effect="dark" placement="right">
                <div slot="content" v-html="item.tooltipContent" />
                <i class="el-icon-question" />
              </el-tooltip>
            </template>
            <template v-else-if="item.type === 'password'">
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
            <template v-else-if="item.type === 'inputNumber'">
              <el-input-number
                v-model="dataForm[item.prop]"
                :min="item.min"
                :max="item.max"
                :step="item.step"
                :step-strictly="item.stepStrictly"
                :precision="item.precision"
                :disabled="item.disabled"
                :controls-position="item.controlsPosition"
                :placeholder="item.placeholder"
              >
                <template v-if="item.prepend" slot="prepend">{{ item.prepend }}</template>
                <template v-if="item.append" slot="append">{{ item.append }}</template>
              </el-input-number>
              <el-tag v-if="item.tag" :type="item.tagType">{{ item.tag }}</el-tag>
            </template>
            <el-input
              v-else-if="item.type === 'textarea'"
              v-model="dataForm[item.prop]"
              :type="item.type"
              :minlength="item.minlength"
              :maxlength="item.maxlength"
              :rows="item.rows"
              :autosize="item.autosize"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            />
            <template v-else>
              <el-input
                v-model="dataForm[item.prop]"
                :minlength="item.minlength"
                :maxlength="item.maxlength || 255"
                :disabled="item.disabled"
                :placeholder="item.placeholder"
                :style="item.style || 'width: 100%;'"
                clearable
              >
                <template v-if="item.prepend" slot="prepend">{{ item.prepend }}</template>
                <template v-if="item.append" slot="append">{{ item.append }}</template>
              </el-input>
              <el-tag v-if="item.tag" :type="item.tagType">{{ item.tag }}</el-tag>
            </template>
          </slot>
        </template>
      </el-form-item>
      <slot name="append" />
    </el-form>
    <div slot="footer" class="dialog-footer">
      <slot name="footerPrepend" />
      <el-button type="text" @click="formClose">{{ cancelText }}</el-button>
      <el-button
        v-if="isSubmit"
        :loading="submitLoading"
        type="primary"
        @click="formSubmit"
      >
        {{ submitText }}
      </el-button>
      <slot name="footerAppend" />
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-dragDialog'
import { commonTitle } from '@/utils/i18n'

export default {
  name: 'DataForm',
  directives: {
    elDragDialog
  },
  props: {
    formConfig: {
      type: Array,
      required: true
    },
    dataForm: {
      type: Object,
      required: true
    },
    dataFormRules: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: commonTitle('tips')
    },
    width: {
      type: String,
      default: '50%'
    },
    formVisible: {
      type: Boolean,
      default: false
    },
    submitLoading: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '0'
    },
    cancelText: {
      type: String,
      default: commonTitle('cancel')
    },
    submitText: {
      type: String,
      default: commonTitle('confirm')
    },
    isSubmit: {
      type: Boolean,
      default: true
    },
    selectLoading: {
      type: Boolean,
      default: false
    },
    menuPath: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      passwordType: 'password'
    }
  },
  computed: {
    deviceWidth() {
      return this.$store.state.app.device !== 'mobile' ? this.width : '90%'
    },
    labelPosition() {
      return this.$store.state.app.device !== 'mobile' ? 'right' : 'top'
    }
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
    },
    handleSelectChange(val) {
      this.$emit('handleSelectChange', val)
    },
    formClose() {
      this.$emit('formClose')
      this.$refs.dataForm.clearValidate()
    },
    formSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          const params = Object.assign({}, this.dataForm)
          this.$emit('formSubmit', params)
          this.$refs.dataForm.clearValidate()
        }
      })
    },
    menuRemoteMethod(query) {
      this.$emit('menuRemoteMethod', query)
    },
    remoteMethod(query) {
      this.$emit('remoteMethod', query)
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
