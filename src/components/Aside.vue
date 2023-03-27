<template>
  <el-menu class="el-menu-vertical-demo" router>
    <el-menu-item index="/home/ranking">
      <el-icon>
        <TrendCharts />
      </el-icon>
      <template #title>趋势榜单</template>
    </el-menu-item>
    <el-sub-menu>
      <template #title>
        <el-icon>
          <Search />
        </el-icon>
        <span>查找饰品</span>
      </template>
      <el-menu-item index="/home/searchbyname">按名称搜索</el-menu-item>
      <el-menu-item index="/home/searchbycategory">按类型检索</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/home/concern">
      <el-icon>
        <View />
      </el-icon>
      <template #title>我的关注</template>
    </el-menu-item>
    <el-menu-item index="/home/setting">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>账号管理</template>
    </el-menu-item>
  </el-menu>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import {
  TrendCharts,
  View,
  Search,
  Setting,
} from "@element-plus/icons-vue";
name: "Aside";

</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>