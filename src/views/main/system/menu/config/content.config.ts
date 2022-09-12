export const contentTableConfig = {
  title: '用户列表',
  propList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '130'
    },
    {
      prop: 'type',
      label: '类型',
      minWidth: '100'
    },
    {
      prop: 'url',
      label: '菜单url',
      minWidth: '100'
    },
    {
      prop: 'icon',
      label: '菜单icon',
      minWidth: '100'
    },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '100'
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
  showIndexColumn: false,
  showSelectionColumn: false,
  showFooter: false,
  childrenProps: {
    rowKey: 'id'
  }
}
