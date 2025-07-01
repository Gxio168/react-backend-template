import React, { useState } from 'react'
import {
  Table,
  Tag,
  Button,
  Space,
  Form,
  Input,
  DatePicker,
  Select,
  Popconfirm,
  message,
  Modal,
  Card,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { Icon } from '@iconify/react/dist/iconify.js'

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    name: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    status: 'active',
    createTime: '2023-01-01',
    role: 'admin',
  },
  {
    id: 2,
    username: 'user1',
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13900139000',
    status: 'active',
    createTime: '2023-01-02',
    role: 'user',
  },
  {
    id: 3,
    username: 'user2',
    name: '李四',
    email: 'lisi@example.com',
    phone: '13700137000',
    status: 'pending',
    createTime: '2023-01-03',
    role: 'user',
  },
  {
    id: 4,
    username: 'user3',
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13600136000',
    status: 'inactive',
    createTime: '2023-01-04',
    role: 'user',
  },
  {
    id: 5,
    username: 'editor1',
    name: '编辑1',
    email: 'editor1@example.com',
    phone: '13500135000',
    status: 'active',
    createTime: '2023-01-05',
    role: 'editor',
  },
  {
    id: 5,
    username: 'editor1',
    name: '编辑1',
    email: 'editor1@example.com',
    phone: '13500135000',
    status: 'active',
    createTime: '2023-01-05',
    role: 'editor',
  },
  {
    id: 5,
    username: 'editor1',
    name: '编辑1',
    email: 'editor1@example.com',
    phone: '13500135000',
    status: 'active',
    createTime: '2023-01-05',
    role: 'editor',
  },
  {
    id: 5,
    username: 'editor1',
    name: '编辑1',
    email: 'editor1@example.com',
    phone: '13500135000',
    status: 'active',
    createTime: '2023-01-05',
    role: 'editor',
  },
  {
    id: 5,
    username: 'editor1',
    name: '编辑1',
    email: 'editor1@example.com',
    phone: '13500135000',
    status: 'active',
    createTime: '2023-01-05',
    role: 'editor',
  },
  {
    id: 5,
    username: 'editor1',
    name: '编辑1',
    email: 'editor1@example.com',
    phone: '13500135000',
    status: 'active',
    createTime: '2023-01-05',
    role: 'editor',
  },
] as any

// 状态标签样式
const statusMap = {
  active: { text: '正常', color: 'green' },
  pending: { text: '待审核', color: 'orange' },
  inactive: { text: '已禁用', color: 'red' },
} as any

// 角色标签样式
const roleMap = {
  admin: { text: '管理员', color: 'volcano' },
  user: { text: '普通用户', color: 'blue' },
  editor: { text: '编辑', color: 'cyan' },
} as any

const User: React.FC = () => {
  const [form] = Form.useForm()
  const [users, setUsers] = useState(mockUsers)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: mockUsers.length * 10,
  })

  // 行选择配置
  const rowSelection: TableRowSelection<(typeof mockUsers)[0]> = {
    selectedRowKeys,
    onChange: newSelectedRowKeys => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys)
      setSelectedRowKeys(newSelectedRowKeys)
    },
    getCheckboxProps: record => ({
      disabled: record.status === 'pending', // 待审核用户不可选择
      name: record.username,
    }),
  }

  // 处理搜索
  const handleSearch = (values: any) => {
    console.log('Search Values:', values)
    // 这里可以添加实际的搜索逻辑
    setLoading(true)
    setTimeout(() => {
      // 模拟搜索结果
      setUsers(mockUsers)
      setLoading(false)
    }, 500)
  }

  // 处理重置
  const handleReset = () => {
    form.resetFields()
    // 重置搜索条件
    setUsers(mockUsers)
  }

  // 处理删除用户
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？此操作不可撤销。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('删除用户 ID:', id)
        // 模拟删除操作
        setUsers(users.filter(user => user.id !== id))
        message.success('用户删除成功')
      },
      onCancel() {
        console.log('取消删除')
      },
    })
  }

  // 处理批量删除
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的用户')
      return
    }

    Modal.confirm({
      title: '确认批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？此操作不可撤销。`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('批量删除用户 IDs:', selectedRowKeys)
        // 模拟批量删除操作
        setUsers(users.filter(user => !selectedRowKeys.includes(user.id)))
        setSelectedRowKeys([])
        message.success('批量删除成功')
      },
      onCancel() {
        console.log('取消批量删除')
      },
    })
  }

  // 处理分页变化
  const handleTableChange = (pagination: any) => {
    setPagination(pagination)
    // 这里可以添加实际的分页逻辑
    console.log('Page changed to: ', pagination.current)
    console.log('PageSize changed to: ', pagination.pageSize)
  }

  // 表格列定义
  const columns: ColumnsType<(typeof mockUsers)[0]> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      width: 120,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 100,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: Object.keys(statusMap).map(key => ({
        text: statusMap[key].text,
        value: key,
      })),
      onFilter: (value, record) => record.status === value,
      render: status => (
        <Tag color={statusMap[status]?.color || 'default'}>{statusMap[status]?.text || status}</Tag>
      ),
      width: 100,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      filters: Object.keys(roleMap).map(key => ({
        text: roleMap[key].text,
        value: key,
      })),
      onFilter: (value, record) => record.role === value,
      render: role => (
        <Tag color={roleMap[role]?.color || 'default'}>{roleMap[role]?.text || role}</Tag>
      ),
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => a.createTime.localeCompare(b.createTime),
      width: 140,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" onClick={() => console.log('查看用户:', record)}>
            👁️ 查看
          </Button>
          <Button type="link" size="small" onClick={() => console.log('编辑用户:', record)}>
            ✏️ 修改
          </Button>
          <Popconfirm
            title="确认删除?"
            onConfirm={() => handleDelete(record.id)}
            okText="确认"
            cancelText="取消">
            <Button type="link" size="small" danger>
              ❌ 删除
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 200,
    },
  ]

  return (
    <div className="bg-gray-50 h-full p-4 md:p-6  overflow-x-scroll">
      {/* 搜索表单卡片 */}
      <Card className="mb-6 shadow-sm border border-gray-200 rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">搜索筛选</h2>
        </div>

        <Form
          form={form}
          name="user_search"
          layout="inline"
          onFinish={handleSearch}
          className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ max: 50, message: '用户名长度不能超过50个字符' }]}>
              <Input placeholder="请输入用户名" className="w-full" />
            </Form.Item>

            <Form.Item name="role" label="角色">
              <Select placeholder="请选择角色" className="w-full">
                {Object.entries(roleMap).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value.text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="createTime" label="创建时间">
              <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} className="w-full" />
            </Form.Item>
          </div>

          {/* 搜索按钮 */}
          <div className="flex justify-end space-x-3 pt-4 ">
            <Button
              type="default"
              onClick={handleReset}
              icon={<Icon icon="material-symbols:device-reset" fontSize={20} />}>
              重置
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<Icon icon="material-symbols:search-rounded" fontSize={20} />}>
              搜索
            </Button>
          </div>
        </Form>
      </Card>

      {/* 数据管理操作栏 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          <Button
            type="primary"
            onClick={() => console.log('添加用户')}
            icon={<Icon icon="material-symbols:add-circle-outline-rounded" fontSize={20} />}>
            添加用户
          </Button>

          <Button
            type="primary"
            danger
            onClick={handleBatchDelete}
            disabled={selectedRowKeys.length === 0}
            icon={<Icon icon="material-symbols:delete-rounded" fontSize={20} />}>
            <span>批量删除</span>
          </Button>

          <Button
            type="default"
            onClick={() => console.log('导入数据')}
            icon={<Icon icon="material-symbols:upload-rounded" fontSize={20} />}>
            数据导入
          </Button>

          <Button
            type="default"
            onClick={() => console.log('导入数据')}
            icon={<Icon icon="material-symbols:download-rounded" fontSize={20} />}>
            数据导出
          </Button>
        </div>

        <div className="flex items-center">
          {selectedRowKeys.length > 0 && (
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              已选择 <span className="font-medium text-primary">{selectedRowKeys.length}</span>{' '}
              条数据
            </span>
          )}
        </div>
      </div>

      {/* 用户表格 */}
      <Card className="shadow-sm border border-gray-200 rounded-lg bg-white">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={users}
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
          className="min-w-full"
          rowKey="id"
        />
      </Card>
    </div>
  )
}

export default User
