<template>
  <el-row>
    <el-col :span="16">
      <div class="grid-content">
        <div class="left"> Counter-strike Global Offensive</div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content">
        <div class="right">
          <div class="username">
            欢迎您， {{ user.info.userName }}
          </div>
          <div class="img"> <el-avatar :size="55" :src="user.info.avatar" /></div>
          <div class="btn"> <el-button :icon="SwitchButton" @click="logout" plain round /></div>
        </div>

      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, getCurrentInstance, onMounted } from "vue";
import { getUserInfo } from "@/api/getUserInfo";
import { SwitchButton } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
name: "Header";
const router = useRouter()
const { proxy }: any = getCurrentInstance()
const user: any = reactive({
  info: {
  }
}
)
init();

const logout = () => {
  router.push('/index/login');
  localStorage.removeItem('token')
}

function init() {
  getUserInfo({})
    .then(res => {
      user.info.avatar = res.data.avatar
      user.info.userName = res.data.userName
    })
}
</script>

<style lang="less" scoped>
.grid-content {
  border-radius: 4px;
  min-height: 60px;



  .left {
    line-height: 60px;
    font-size: 30px;
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


}
</style>
