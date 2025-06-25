import { useTranslation } from 'react-i18next'
import { useSignIn } from '@/store/userStore'

import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { useLoginActions, useLoginInfo } from '@/store/loginStore'
import { useEffect, useState } from 'react'

type FieldType = {
  username?: string
  password?: string
  isRemember?: string
}

export default function Login() {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { username, password, isRemember } = useLoginInfo()
  const { setLoginInfo, clearLoginInfo } = useLoginActions()
  const [remember, setRemember] = useState(isRemember)

  // 初始化表单值
  useEffect(() => {
    // 初始化执行一次
    if (isRemember) {
      form.setFieldsValue({
        username,
        password,
        isRemember,
      })
    }
  }, [])
  // 监听是否记住密码
  const onValuesChange = (changedValues: any) => {
    if (changedValues.isRemember !== undefined) {
      setRemember(changedValues.isRemember)
    }
  }

  // 登录
  const signIn = useSignIn()
  const handleFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
    if (!remember) {
      clearLoginInfo()
    } else {
      // 保存登录信息到 localStorage
      setLoginInfo({
        username: values.username,
        password: values.password,
        isRemember: values.isRemember,
      })
    }
    await signIn(values)
  }

  return (
    <>
      <span className="text-3xl font-bold ">{t('sys.login.signInFormTitle')}</span>
      <Form
        name="login"
        className="w-[80%] mt-4"
        form={form}
        onFinish={handleFinish}
        onValuesChange={onValuesChange}
        autoComplete="off">
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}>
          <Input placeholder={t('sys.login.accountPlaceholder')} />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: t('sys.login.passwordPlaceholder') }]}>
          <Input.Password placeholder={t('sys.login.passwordPlaceholder')} />
        </Form.Item>

        <Form.Item<FieldType> name="isRemember" valuePropName="checked" label={null}>
          <Checkbox>{t('sys.login.rememberMe')}</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="w-[100%]">
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
