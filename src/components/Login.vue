<template>
  <div class="main">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" status-icon>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item style="padding-left: 120px;">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <el-link :icon="Link" @click="toRegister" class="link">没有账号？注册
    </el-link>

  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Link } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/login'
import type { FormInstance, FormRules } from 'element-plus'
name: 'Login'
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  password: '',

})
const toRegister = () => {
  router.push('/index/register')
}
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 25, message: 'Length should be 5 to 25', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, message: '错误的密码长度', trigger: 'blur' }
  ],


})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      login({
        username: ruleForm.name,
        password: ruleForm.password
      }).then(res => {
        console.log(res);

        if (res.code == 1) {
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          router.push('/home/ranking')
          localStorage.setItem("token", res.data)
        }
        else if (res.code == 0) {
          ElMessage({
            message: '登录失败',
            type: 'error',
          })
        }
      })



    } else {
      console.log('error submit!', fields)
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
  width: 350px;
  height: 150px;
  border: 1px solid var(--el-border-color);
  border-radius: 20px;
  box-shadow: var(--el-box-shadow-light);

  .demo-ruleForm {
    margin: auto;
  }

  .link {
    margin-left: 233px;
  }
}
</style>
