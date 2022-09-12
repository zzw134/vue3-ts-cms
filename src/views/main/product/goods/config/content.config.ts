export const contentTableConfig = {
  title: '商品列表',
  propList: [
    {
      prop: 'name',
      label: '商品名称',
      minWidth: '100'
    },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '80'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      minWidth: '80'
    },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '100',
      slotName: 'imgSlot'
    },
    {
      prop: 'status',
      label: '状态',
      minWidth: '80',
      slotName: 'status'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      slotName: 'handle',
      minWidth: '150'
    }
  ],
  showIndexColumn: true,
  showSelectionColumn: true
}
