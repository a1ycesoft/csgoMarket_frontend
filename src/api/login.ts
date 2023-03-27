import axios from '@/utils/request'

export async function login(data) {
  const res: any = await axios.post("/myapi/users/login", data)
  return res;
}