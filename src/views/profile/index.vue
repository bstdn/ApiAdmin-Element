<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <span>
          <i class="el-icon-user-solid" />
          个人信息
        </span>
      </div>
      <el-form
        ref="postForm"
        :model="postForm"
        :rules="rules"
        :label-position="labelPosition"
        class="form-container"
        label-width="100px"
      >
        <fields-form
          :data-form="postForm"
          :form-config="formFields"
        >
          <template #username>
            <el-input v-model="username" disabled />
          </template>
          <template #head_img>
            <avatar-upload v-model="postForm.head_img" />
          </template>
        </fields-form>

        <el-form-item size="large">
          <el-button type="text" @click="formClose">{{ commonTitle('cancel') }}</el-button>
          <el-button
            :loading="submitLoading"
            type="primary"
            @click="formSubmit"
          >
            {{ commonTitle('confirm') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import FieldsForm from '@/components/DataForm/fieldsForm'
import AvatarUpload from '@/components/Upload/avatarUpload'
import { commonTitle } from '@/utils/i18n'
import { own } from '@/api/user'
import { profileDataConfig } from './config'

export default {
  name: 'Profile',
  components: {
    FieldsForm,
    AvatarUpload
  },
  data() {
    return {
      submitLoading: false,
      username: '',
      postForm: Object.assign({}, profileDataConfig.postForm),
      formFields: profileDataConfig.formFields,
      rules: this.realRules()
    }
  },
  computed: {
    labelPosition() {
      return this.$store.state.app.device !== 'mobile' ? 'right' : 'top'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const userInfo = this.$store.getters.userInfo
      this.username = userInfo.username
      this.postForm.nickname = userInfo.nickname
      this.postForm.head_img = userInfo.userData.head_img
    },
    realRules() {
      const rules = {
        oldPassword: [
          {
            trigger: 'blur',
            validator: (role, value, callback) => {
              if (this.postForm.password && value === '') {
                callback(new Error('原密码不能为空'))
              }
              callback()
            }
          }
        ]
      }
      return Object.assign({}, profileDataConfig.rules, rules)
    },
    formClose() {
      this.$store.dispatch('tagsView/delView', this.$route).then(({ visitedViews }) => {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView)
        } else {
          this.$router.push('/')
        }
      })
    },
    formSubmit() {
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          this.$confirm('个人信息修改后，将会退出系统重新登录，请明确后修改！', '确定要提交么', {
            type: 'warning'
          }).then(() => {
            this.submitLoading = true
            own(this.postForm).then(response => {
              this.$message.success(response.msg)
              this.$store.dispatch('user/logout').then(() => {
                location.reload()
              })
            }).catch(() => {
              this.submitLoading = false
            })
          }).catch(() => {})
        }
      })
    },
    commonTitle
  }
}
</script>
