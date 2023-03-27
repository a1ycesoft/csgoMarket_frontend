import axios from '@/utils/request'

export async function getBuffInfo(data) {
  const time = new Date().getTime()
  const res: any = await axios.get('/buff/api/market/goods/sell_order?game=csgo&goods_id=' + data.id + '&page_num=1&sort_by=default&mode=&allow_tradable_cooldown=1&_=' + time, {})
  return res;
}