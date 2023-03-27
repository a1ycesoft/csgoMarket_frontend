import axios from '@/utils/request'

export async function changeAvatar(data) {
  const res: any = await axios.post("/myapi/users/changeAvatar", data)
  return res;
}