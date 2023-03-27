import axios from '@/utils/request'

export async function register(data) {
  const res: any = await axios.post("/myapi/users/register", data)
  return res;
}