import axios from '@/utils/request'

export async function getRelativeGoods(data) {
  const res: any = await axios.get("/myapi/goods/getRelativeGoods", data)
  return res;
}