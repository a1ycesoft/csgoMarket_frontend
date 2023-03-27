import axios from '@/utils/request'

export async function deleteConcernById(data) {
  const res: any = await axios.post("/myapi/concern/delete", data)
  return res;
}