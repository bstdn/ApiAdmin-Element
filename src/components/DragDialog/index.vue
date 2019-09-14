<template>
  <el-dialog
    v-el-drag-dialog
    :title="title"
    :width="deviceWidth"
    :visible.sync="formVisible"
    :before-close="formClose"
  >
    <slot name="body" />
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-dragDialog'
import { commonTitle } from '@/utils/i18n'

export default {
  name: 'DragDialog',
  directives: {
    elDragDialog
  },
  props: {
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
    }
  },
  computed: {
    deviceWidth() {
      return this.$store.state.app.device !== 'mobile' ? this.width : '90%'
    }
  },
  methods: {
    formClose() {
      this.$emit('formClose')
    },
    commonTitle
  }
}
</script>
