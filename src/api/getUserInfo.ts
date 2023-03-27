import axios from '@/utils/request'

export async function getUserInfo(data) {
  const res: any = await axios.get("/myapi/users", data)
  return res;
}