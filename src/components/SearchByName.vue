<template>
  <div class="main">
    <el-table :data="state.tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="饰品" width="100px">
        <template #default="scope">
          <el-image style="width: 60px; height: 60px" fit="cover" :src="scope.row.iconSrc" />
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="fullName" width="500px" />
      <el-table-column label="参考价格￥(BUFF)" prop="sellMinPrice" />
      <el-table-column label="参考价格￥(Steam)" prop="steamPriceCny" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="large" placeholder="Type to search" clearable @change="searchByName" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="toDetails(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination v-model:current-page="currentPage" layout="prev, pager, next" :total="totalGoods" :pageSize="6"
        @current-change="searchByName" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getGoodsInfo } from '@/api/getGoodsInfo';
name: 'SearchByName'
const router = useRouter()
interface goods {
  buyMaxPrice: number,
  exterior: string,
  fullName: string,
  iconSrc: string,
  id: number,
  rarity: string,
  sellMinPrice: number,
  shortName: string,
  steamPrice: number,
  steamPriceCny: number,
  steamUrl: string,
  type: string
}
const loading = ref(false)
const search = ref('')
const currentPage = ref(1)
const totalGoods = ref(1)
const state = reactive({
  tableData: []
});

const searchByName = () => {
  if (search.value == '') {
    state.tableData = []
    totalGoods.value = 0;
    return;
  }
  sendHttp()
}

const toDetails = (index: number, row: goods) => {
  const id = row.id
  router.push({ path: `/home/details/${id}` })
}

const sendHttp = () => {
  loading.value = true
  getGoodsInfo({
    page: currentPage.value,
    name: search.value
  })
    .then((res) => {
      //请求成功
      console.log(res);
      loading.value = false;
      state.tableData = res.data.records
      totalGoods.value = res.data.total
    })
    .catch(err => {
      console.log(err)
    })

}




</script>
<style lang="less" scoped></style>