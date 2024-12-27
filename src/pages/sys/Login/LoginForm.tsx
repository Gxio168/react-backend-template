import { useTranslation } from 'react-i18next'
import { useSignIn } from '@/store/userStore'

import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

export default function Login() {
  const { t } = useTranslation()
  const signIn = useSignIn()
  const handleFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
    await signIn(values)
  }

  return (
    <>
      <span className="text-3xl font-bold ">{t('sys.login.signInFormTitle')}</span>
      <Form
        name="login"
        className="w-[80%] mt-4"
        initialValues={{
          remember: true,
          username: 'admin',
          password: '123456',
        }}
        onFinish={handleFinish}
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

        <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
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
