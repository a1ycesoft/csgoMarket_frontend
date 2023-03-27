import axios from '@/utils/request'

export async function getGoodsInfo(data) {
  let str = "?page=" + data.page + "&pageSize=6"
  if (data.name)
    str += "&name=" + data.name
  if (data.type)
    data.type.forEach(x => {
      str += "&type=" + x
    })
  if (data.rarity)
    data.rarity.forEach(x => {
      str += "&rarity=" + x
    })
  if (data.exterior)
    data.exterior.forEach(x => {
      str += "&exterior=" + x
    })
  if (data.quality)
    data.quality.forEach(x => {
      str += "&quality=" + x
    })
  if (data.goodsId)
    data.goodsId.forEach(x => {
      str += "&goodsId=" + x
    })
  const res: any = await axios.get("/myapi/goods/page" + str, {})
  return res;
}