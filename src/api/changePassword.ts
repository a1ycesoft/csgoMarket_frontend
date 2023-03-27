import axios from '@/utils/request'

export async function changePassword(data) {
  const res: any = await axios.post("/myapi/users/changePassword", data)
  return res;
}