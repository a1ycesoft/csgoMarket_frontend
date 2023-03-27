import axios from '@/utils/request'

export async function getConcernList(data) {
  const res: any = await axios.get("/myapi/concern/page", data)
  return res;
}