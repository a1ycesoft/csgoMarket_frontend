import axios from '@/utils/request'

export async function isConcerneds(data) {
  const res: any = await axios.get("/myapi/concern/isConcerned", data)
  return res;
}