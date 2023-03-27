import axios from '@/utils/request'

export async function getHistoryById(data) {
  const res: any = await axios.get("/myapi/history", data)
  return res;
}