import axios from '@/utils/request'

export async function addConcern(data) {
  const res: any = await axios.post("/myapi/concern/add", data)
  return res;
}