<template>
  <div class="detail-header black" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="detail-pic">

      <div style="width:269px" class="t_Center"> <img :src="allInfo.imgUrl" style="max-width:269px;max-height:176px;">
      </div>

    </div>
    <div class="detail-cont">
      <div>
        <div class="detail-fav">
        </div>
        <h1>{{ allInfo.name }}</h1>
      </div>
      <p> <span><label>稀有度 |</label>{{ allInfo.rarity }}</span> <span><label>类别 |</label>{{ allInfo.quality }}</span>
        <span><label>类型
            |</label>{{ allInfo.type }}</span>
      </p>
      <div class="blank20"></div>
      <div class="line"></div>
      <div class="blank20"></div>
      <div class="detail-summ">
        <span>
          <label>参考价格 |</label>
          <el-link :href="allInfo.buffUrl" target="_blank" type="warning">
            BUFF: {{ allInfo.buffPrice ? "￥" + allInfo.buffPrice : "暂无价格" }}
          </el-link>
          <el-link :href="allInfo.steamUrl" target="_blank" type="info" style="margin-left: 20px;">
            Steam: {{ allInfo.steamPriceCny ? "￥" + allInfo.steamPriceCny : "暂无价格" }}
          </el-link>
          <el-switch v-model="isConcerned" class="mb-2" size="large" inline-prompt active-text="已关注" inactive-text="未关注"
            style="margin-left: 35px;" @change="concernChange" />
        </span>
      </div>
    </div>
  </div>
  <div class="radio">
    <div v-if="allInfo.exterior == '无涂装'">
      <el-radio-group v-model="allInfo.exterior" size="large">
        <el-radio label="无涂装" />
      </el-radio-group>

    </div>
    <div v-else>
      <el-radio-group v-model="allInfo.exterior" size="large" @change="toElse">
        <el-radio v-for="item in btnState.list" :key="item.exterior" :label="item.exterior" :disabled="item.state" />
      </el-radio-group>

    </div>

  </div>
  <div style="margin-top: 10px;" v-if="isConcerned">
    <div id="history">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance, reactive, onUpdated, watch } from "vue";
import * as echarts from "echarts";
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ElLoading } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addConcern } from "@/api/addConcern";
import { deleteConcernById } from "@/api/deleteConcernById";
import { isConcerneds } from "@/api/isConcerned";
import { getRelativeGoods } from "@/api/getRelativeGoods";
import { getBuffInfo } from "@/api/getBuffInfo";
import { getHistoryById } from "@/api/getHistoryById"
import { usePython } from "@/api/usePython";
name: "Details";
const route = useRoute()
const router = useRouter()
const isConcerned = ref(false)
const goodsId = ref(route.params.id)
const allInfo = reactive({
  goodsId: goodsId.value,
  name: '',
  shortname: '',
  steamUrl: '',
  buffUrl: '',
  imgUrl: '',
  buffPrice: '',
  steamPriceCny: '',
  type: '',
  rarity: '',
  quality: '',
  exterior: ''
})
const fullscreenLoading = ref(true)
const sameGoods = reactive({
  list: []
})
const btnState = reactive({
  list: [
    { exterior: "崭新出厂", state: true },
    { exterior: "略有磨损", state: true },
    { exterior: "久经沙场", state: true },
    { exterior: "破损不堪", state: true },
    { exterior: "战痕累累", state: true },
  ]
})

const historyData = reactive({
  list: []
})

info_init(goodsId.value)
concern()

onBeforeRouteUpdate((to) => {
  setTimeout(function () {
    window.location.reload();
  }, 100);
});

const toElse = (toExterior) => {
  let id = 1;
  sameGoods.list.forEach(x => {
    if (x.exterior == toExterior)
      id = x.id;
  })
  if (id == 1)
    return
  router.push({ path: `/home/details/${id}` })
}
const concernChange = () => {
  if (isConcerned.value) {
    addConcern({
      goodsId: goodsId.value
    }).then(res => {
      ElMessage({
        message: '关注成功',
        type: 'success',
      })
    }).then(() => {
      usePython({
        source: "buff",
        goodsId: goodsId.value
      }).then(res => {
        console.log(res);
      })
    })
  }
  else {
    deleteConcernById({
      goodsId: goodsId.value
    }).then(res => {
      ElMessage({
        message: '取关成功',
        type: 'success',
      })
    })
  }
}
function info_init(id) {
  allInfo.buffUrl = "https://buff.163.com/goods/" + id;
  getBuffInfo({ id: id }).then(res => {

    allInfo.imgUrl = res.data.goods_infos[id].icon_url
    allInfo.name = res.data.goods_infos[id].name
    allInfo.shortname = res.data.goods_infos[id].short_name
    allInfo.buffPrice = res.data.items[0].price
    allInfo.steamPriceCny = res.data.goods_infos[id].steam_price_cny
    allInfo.type = res.data.goods_infos[id].tags.type.localized_name
    allInfo.rarity = res.data.goods_infos[id].tags.rarity.localized_name
    allInfo.quality = res.data.goods_infos[id].tags.quality.localized_name
    allInfo.exterior = res.data.goods_infos[id].tags.exterior.localized_name
  }).then(() => {
    getRelativeGoods({
      name: allInfo.shortname
    }).then(res => {

      sameGoods.list = res.data
      sameGoods.list.forEach(x => {
        btnState.list.forEach(y => {
          if (y.exterior == x.exterior)
            y.state = false;
        })
      })
      sameGoods.list.forEach(x => {
        if (x.exterior == allInfo.exterior)
          allInfo.steamUrl = x.steamUrl;
      })
      fullscreenLoading.value = false
    })
  })

}
function concern() {
  isConcerneds({
    goodsId: goodsId.value
  }).then(res => {
    isConcerned.value = res.data
  }).then(res => {
    if (isConcerned.value) {
      getHistory();
    }
  })
}
function getHistory() {
  getHistoryById({
    goodsId: goodsId.value,
    source: "buff"
  }).then(res => {
    res.data.forEach(x => {
      let arr = []
      let datetime = timestampToTime(Number(x.time))
      arr.push(datetime)
      arr.push(x.price)
      historyData.list.push(arr)
    })
  }).then(() => {
    echarts_init()
  })
}

function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}
function echarts_init() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('history'));
  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: '价格走势'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      min: function (value) {
        return Math.round(value.min * 0.8);
      },
      max: function (value) {
        return Math.round(value.max * 1.1);
      },

    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: 'CNY',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {},
        data: historyData.list
      }
    ]
  };
  myChart.setOption(option);

}
</script>

<style lang="less" scoped>
.detail-header {
  width: 100%;
  height: 194px;
  border-radius: 2px;

  .detail-pic {
    float: left;
    position: relative;
    padding: 9px px;

    .t_Center {
      text-align: center;
    }

  }

  .detail-cont {
    margin-left: 310px;
    padding: 0px 30px 0 0;
    font-size: 12px;

    label {
      color: #90969C;
      margin-right: 9px;
      cursor: default;
    }

    h1 {
      font-size: 24px;
      line-height: 24px;
      color: black;
    }

    p span {
      color: #c6cad0;
      margin: 0 24px 0 0;
    }

    .detail-summ {
      .f_Strong {
        font-size: 14px;
        color: #eea20e;

        small {
          color: #45536C;
          font-size: 12px;
          margin-left: 6px;
        }
      }
    }

    .line {
      height: 1px;
      font-size: 0;
      overflow: hidden;
      background-image: linear-gradient(-90deg, rgba(250, 250, 250, 0) 0, #eea20e 49%, rgba(250, 250, 250, 0) 100%);
      *background: #544B35;
    }

    .detail-fav {
      font-size: 14px;
      cursor: pointer;
      color: #E4E8EE;
      position: relative;
    }

    .blank20 {
      height: 20px;
      overflow: hidden;
      font-size: 0;
      line-height: 0;
    }
  }
}

.switch-btn {
  margin-left: 30px;
}

.black {
  color: #9a9b9e;
}

#history {
  width: 100%;
  height: 400px;
  background-color: #fff;
  margin-top: 5px;
}

.picker {
  margin-left: 31%;
}

.radio {
  margin-left: 40px;

}
</style>
