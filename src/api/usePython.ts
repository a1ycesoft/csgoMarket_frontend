import axios from '@/utils/request'

export async function usePython(data) {
  const res: any = await axios.post("/myapi/common/usePython", data)
  return res;
}