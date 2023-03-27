<template>
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
      <template #default="scope">
        <el-button size="small" @click="toDetails(scope.$index, scope.row)" type="primary">详情</el-button>
        <el-button size="small" @click="deleteConcern(scope.$index, scope.row)" type="danger">取消关注</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="page">
    <el-pagination v-model:current-page="currentPage" layout="prev, pager, next" :total="totalGoods" :pageSize="6"
      @current-change="getConcern" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteConcernById } from '@/api/deleteConcernById';
import { getConcernList } from '@/api/getConcernList';
import { getGoodsInfo } from '@/api/getGoodsInfo';
name: 'Concern'
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
  type: string,
  concernId: number
}
const loading = ref(false)
const concern = reactive({
  list: []
})
const currentPage = ref(1)
const totalGoods = ref(10)
const state = reactive({
  tableData: []
});
getConcern();
const toDetails = (index: number, row: goods) => {
  const id = row.id
  router.push({ path: `/home/details/${id}` })
}
const deleteConcern = (index: number, row: goods) => {
  ElMessageBox.confirm(
    '确认取消关注吗？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '返回',
      type: 'warning',
    }
  )
    .then(() => {
      deleteConcernById({
        concernId: row.concernId
      }).then(res => {
        concern.list = []
        getConcern();
        ElMessage({
          type: 'success',
          message: '取消关注成功',
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作未进行',
      })
    })

}
function getConcern() {
  loading.value = true;
  getConcernList({
    page: currentPage.value,
    pageSize: 6,
  })
    .then((res) => {
      totalGoods.value = res.data.total
      concern.list = []
      res.data.records.forEach(x => {
        concern.list.push({ goodsId: x.goodsId, concernId: x.concernId });
      })
    })
    .then((res) => {
      let goodsId = []
      concern.list.forEach(x => {
        goodsId.push(x.goodsId)
      })
      getGoodsInfo({
        page: 1,
        goodsId
      }).then(res => {
        //console.log(res);
        let arr = []
        state.tableData = []
        concern.list.forEach(x => {
          res.data.records.forEach(y => {
            if (x.goodsId == y.id) {
              y.concernId = x.concernId
              arr.push(y);
            }

          })
        })
        state.tableData = arr
        // console.log(res.data);
        loading.value = false
      })
    })
    .catch(err => {
      // console.log(err)
    })
}





</script>