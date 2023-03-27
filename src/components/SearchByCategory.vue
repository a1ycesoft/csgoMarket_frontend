<template>
  <div class="main">
    <div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="类型" name="byType">
          <div class="byType">
            <div class="checker">
              <h3>匕首</h3>
              <el-check-tag v-for="item, index in goodsList.knifeList" :key="item.value" class="tag"
                :checked="item.choosed" @change="handleChange(item)">{{
                  item.name }}</el-check-tag>
            </div>
            <div class="checker">
              <h3>手枪</h3>
              <el-check-tag v-for="item, index in goodsList.handgunList" :key="item.value" class="tag"
                :checked="item.choosed" @change="handleChange(item)">{{
                  item.name }}</el-check-tag>
            </div>
            <div class="checker">
              <h3>步枪</h3>
              <el-check-tag v-for="item, index in goodsList.rifleList" :key="item.value" class="tag"
                :checked="item.choosed" @change="handleChange(item)">{{
                  item.name }}</el-check-tag>
            </div>

            <div class="checker">
              <h3>微型冲锋枪</h3>
              <el-check-tag v-for="item, index in goodsList.smgList" :key="item.value" class="tag" :checked="item.choosed"
                @change="handleChange(item)">{{
                  item.name }}</el-check-tag>
            </div>

            <div class="checker">
              <h3>霰弹枪</h3>
              <el-check-tag v-for="item, index in goodsList.shotgunList" :key="item.value" class="tag"
                :checked="item.choosed" @change="handleChange(item)">{{
                  item.name }}</el-check-tag>
            </div>

            <div class="checker">
              <h3>机枪</h3>
              <el-check-tag v-for="item, index in goodsList.machinegunList" :key="item.value" class="tag"
                :checked="item.choosed" @change="handleChange(item)">{{
                  item.name }}</el-check-tag>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="稀有度" name="byRarity">
          <div class="checker">
            <el-check-tag v-for="item, index in rarityList" :key="item.value" class="tag" :checked="item.choosed"
              @change="handleChange(item)">{{
                item.name }}</el-check-tag>
          </div>
        </el-tab-pane>
        <el-tab-pane label="磨损" name="byExterior">
          <div class="checker">
            <el-check-tag v-for="item, index in exteriorList" :key="item.value" class="tag" :checked="item.choosed"
              @change="handleChange(item)">{{
                item.name }}</el-check-tag>
          </div>
        </el-tab-pane>
        <el-tab-pane label="品质" name="byQuality">
          <div class="checker">
            <el-check-tag v-for="item, index in qualityList" :key="item.value" class="tag" :checked="item.choosed"
              @change="handleChange(item)">{{
                item.name }}</el-check-tag>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

    <div style="margin-top: 20px;">
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
            <el-button size="small" @click="toDetails(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination v-model:current-page="currentPage" layout="prev, pager, next" :total="totalGoods" :pageSize="6"
          @current-change="doGet" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import qs from 'qs'
import { useRouter } from 'vue-router'
import { defineComponent, ref, reactive, computed, getCurrentInstance } from "vue";
import type { TabsPaneContext } from 'element-plus'
import { getGoodsInfo } from '@/api/getGoodsInfo';
const router = useRouter()
const activeName = ref('byType')
const loading = ref(false)
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
name: "SearchByCategory";
const currentPage = ref(1)
const totalGoods = ref(1)
const state = reactive({
  tableData: []
});

const goodsList = reactive({
  knifeList: [
    { name: "鲍伊猎刀", value: "weapon_knife_survival_bowie", choosed: false },
    { name: "蝴蝶刀", value: "weapon_knife_butterfly", choosed: false },
    { name: "弯刀", value: "weapon_knife_falchion", choosed: false },
    { name: "折叠刀", value: "weapon_knife_flip", choosed: false },
    { name: "穿肠刀", value: "weapon_knife_gut", choosed: false },
    { name: "猎杀者匕首", value: "weapon_knife_tactical", choosed: false },
    { name: "M9 刺刀", value: "weapon_knife_m9_bayonet", choosed: false },
    { name: "刺刀", value: "weapon_bayonet", choosed: false },
    { name: "爪子刀", value: "weapon_knife_karambit", choosed: false },
    { name: "暗影双匕", value: "weapon_knife_push", choosed: false },
    { name: "短剑", value: "weapon_knife_stiletto", choosed: false },
    { name: "熊刀", value: "weapon_knife_ursus", choosed: false },
    { name: "折刀", value: "weapon_knife_gypsy_jackknife", choosed: false },
    { name: "锯齿爪刀", value: "weapon_knife_widowmaker", choosed: false },
    { name: "海豹短刀", value: "weapon_knife_css", choosed: false },
    { name: "系绳匕首", value: "weapon_knife_cord", choosed: false },
    { name: "求生匕首", value: "weapon_knife_canis", choosed: false },
    { name: "流浪者匕首", value: "weapon_knife_outdoor", choosed: false },
    { name: "骷髅匕首", value: "weapon_knife_skeleton", choosed: false },
  ],
  handgunList: [
    { name: "P2000", value: "weapon_hkp2000", choosed: false },
    { name: "USP消音版", value: "weapon_usp_silencer", choosed: false },
    { name: "格洛克18型", value: "weapon_glock", choosed: false },
    { name: "P250", value: "weapon_p250", choosed: false },
    { name: "FN57", value: "weapon_fiveseven", choosed: false },
    { name: "CZ75", value: "weapon_cz75a", choosed: false },
    { name: "Tec-9", value: "weapon_tec9", choosed: false },
    { name: "R8 左轮手枪", value: "weapon_revolver", choosed: false },
    { name: "沙漠之鹰", value: "weapon_deagle", choosed: false },
    { name: "双持贝瑞塔", value: "weapon_elite", choosed: false },
  ],
  rifleList: [
    { name: "加利尔 AR", value: "weapon_galilar", choosed: false },
    { name: "SCAR-20", value: "weapon_scar20", choosed: false },
    { name: "AWP", value: "weapon_awp", choosed: false },
    { name: "AK-47", value: "weapon_ak47", choosed: false },
    { name: "法玛斯", value: "weapon_famas", choosed: false },
    { name: "M4A4", value: "weapon_m4a1", choosed: false },
    { name: "M4A1 消音型", value: "weapon_m4a1_silencer", choosed: false },
    { name: "SG 553", value: "weapon_sg556", choosed: false },
    { name: "SSG 08", value: "weapon_ssg08", choosed: false },
    { name: "AUG", value: "weapon_aug", choosed: false },
    { name: "G3SG1", value: "weapon_g3sg1", choosed: false },
  ],
  smgList: [
    { name: "P90", value: "weapon_p90", choosed: false },
    { name: "MAC-10", value: "weapon_mac10", choosed: false },
    { name: "UMP-45", value: "weapon_ump45", choosed: false },
    { name: "MP7", value: "weapon_mp7", choosed: false },
    { name: "PP-野牛", value: "weapon_bizon", choosed: false },
    { name: "MP9", value: "weapon_mp9", choosed: false },
    { name: "MP5-SD", value: "weapon_mp5sd", choosed: false },
  ],
  shotgunList: [
    { name: "截短霰弹枪", value: "weapon_sawedoff", choosed: false },
    { name: "XM1014", value: "weapon_xm1014", choosed: false },
    { name: "新星", value: "weapon_nova", choosed: false },
    { name: "MAG-7", value: "weapon_mag7", choosed: false },
  ],
  machinegunList: [
    { name: "M249", value: "weapon_m249", choosed: false },
    { name: "内格夫", value: "weapon_negev", choosed: false },
  ]
})
const rarityList = reactive([
  { name: "普通级", value: "普通级", choosed: false },
  { name: "高级", value: "高级", choosed: false },
  { name: "奇异", value: "奇异", choosed: false },
  { name: "卓越", value: "卓越", choosed: false },
  { name: "非凡", value: "非凡", choosed: false },
  { name: "消费级", value: "消费级", choosed: false },
  { name: "工业级", value: "工业级", choosed: false },
  { name: "军规级", value: "军规级", choosed: false },
  { name: "受限", value: "受限", choosed: false },
  { name: "保密", value: "保密", choosed: false },
  { name: "隐秘", value: "隐秘", choosed: false },
  { name: "违禁", value: "违禁", choosed: false },
])
const exteriorList = reactive([
  { name: "无涂装", value: "无涂装", choosed: false },
  { name: "崭新出厂", value: "崭新出厂", choosed: false },
  { name: "略有磨损", value: "略有磨损", choosed: false },
  { name: "久经沙场", value: "久经沙场", choosed: false },
  { name: "破损不堪", value: "破损不堪", choosed: false },
  { name: "战痕累累", value: "战痕累累", choosed: false },
])
const qualityList = reactive([
  { name: "普通", value: "normal", choosed: false },
  { name: "纪念品", value: "tournament", choosed: false },
  { name: "★", value: "unusual", choosed: false },
  { name: "StatTrak™", value: "strange", choosed: false },
  { name: "★ StatTrak™", value: "unusual_strange", choosed: false },
])
const doGet = () => {
  let type = []
  for (let [key, value] of Object.entries(goodsList)) {
    value.forEach(x => {
      if (x.choosed) type.push(x.value)
    })
  }
  let rarity = []
  rarityList.forEach(x => {
    if (x.choosed) rarity.push(x.value)
  })
  let exterior = []
  exteriorList.forEach(x => {
    if (x.choosed) exterior.push(x.value)
  })
  let quality = []
  qualityList.forEach(x => {
    if (x.choosed) quality.push(x.value)
  })
  if (type.length == 0 && exterior.length == 0 && rarity.length == 0 && quality.length == 0) {
    state.tableData = []
    totalGoods.value = 0;
    return;
  }
  loading.value = true;
  console.log(type);
  getGoodsInfo({
    page: currentPage.value,
    type,
    rarity,
    exterior,
    quality
  })
    .then((res) => {
      //请求成功
      console.log(res);
      loading.value = false
      state.tableData = res.data.records
      totalGoods.value = res.data.total
    })
    .catch(err => {
      console.log(err)
    })
}
const handleChange = (item) => {
  item.choosed = !item.choosed;
  doGet()
}

const toDetails = (index: number, row: any) => {
  const id = row.id
  router.push({ path: `/home/details/${id}` })
}

</script>

<style lang="less" scoped>
.checker {
  h3 {
    margin-bottom: 10px;
    margin-top: 0px;
    font-size: 15px;
  }
}

.tag {
  margin-right: 10px;
  margin-bottom: 5px;
  height: 10px;
  text-align: center;
  line-height: 10px;
  font-size: 5px;
}

.page {
  margin-top: 20px;

}
</style>