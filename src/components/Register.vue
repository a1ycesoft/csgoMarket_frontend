<template>
  <div class="main">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" status-icon>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="电话" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber" />
      </el-form-item>
      <el-form-item style="padding-left: 120px;">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <el-link :icon="Link" class="link" @click="toLogin">已有账号？登录</el-link>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { Link } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { register } from '@/api/register'
import type { FormInstance, FormRules } from 'element-plus'
name: 'Register'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  password: '',
  checkPass: '',
  phoneNumber: '',
  email: ''
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次输入不同"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 25, message: 'Length should be 5 to 25', trigger: 'blur' },
  ],
  password: [{ required: true, validator: validatePass, trigger: 'blur' }],
  checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { min: 3, max: 23, message: 'Length should be 3 to 23', trigger: 'blur' },
  ],
  phoneNumber: [
    { required: false, message: '请输入电话', trigger: 'blur' },
  ],

})
const toLogin = () => {
  router.push('/index/login')
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      register({
        userName: ruleForm.name,
        password: ruleForm.password,
        email: ruleForm.email,
        phoneNumber: ruleForm.phoneNumber
      }).then(res => {
        if (res.code == 1) {
          ElMessage({
            message: '创建成功',
            type: 'success',
          })
          router.push('/index/login')
        }
        else if (res.code == 0) {
          ElMessage({
            message: '创建失败',
            type: 'error',
          })
        }
      })
    } else {
      ElMessage({
        message: '请检查您的输入',
        type: 'error',
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>


<style lang="less" scoped>
.main {
  padding: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  border: 1px solid var(--el-border-color);
  border-radius: 20px;
  box-shadow: var(--el-box-shadow-light);

  .demo-ruleForm {
    margin: auto;
  }

  .link {
    margin-left: 280px;
  }
}
</style>
