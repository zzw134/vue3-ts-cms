import zwRequest from '@/service'
import { IDataType } from '../../type'

enum DashboardAPI {
  CategoryCount = 'goods/category/count',
  CategorySale = 'goods/category/sale',
  CategoryFavor = 'goods/category/favor',
  AddressSale = 'goods/address/sale'
}

export const getGoodsCategoryCount = () => {
  return zwRequest.get<IDataType>({
    url: DashboardAPI.CategoryCount
  })
}

export const getGoodsCategorySale = () => {
  return zwRequest.get<IDataType>({
    url: DashboardAPI.CategorySale
  })
}

export const getGoodsCategoryFavor = () => {
  return zwRequest.get<IDataType>({
    url: DashboardAPI.CategoryFavor
  })
}

export const getGoodsAddressSale = () => {
  return zwRequest.get<IDataType>({
    url: DashboardAPI.AddressSale
  })
}
