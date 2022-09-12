import zwRequest from '@/service'
import { IDataType } from '../../type'

export const getPageListData = (pageUrl: string, queryInfo: any) => {
  return zwRequest.post<IDataType>({
    url: pageUrl,
    data: queryInfo
  })
}

export const deletePageListById = (url: string) => {
  return zwRequest.delete<IDataType>({
    url: url
  })
}

export const createPageData = (url: string, newData: any) => {
  return zwRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export const editPageData = (url: string, editData: any) => {
  return zwRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
