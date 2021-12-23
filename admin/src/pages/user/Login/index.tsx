import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/user';
import styles from './index.less';

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [type] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const res = await login({ ...values, is_admin: true });
      setSubmitting(false);
      if (res && res.code === 0) {
        message.success('登录成功！');
        const userInfo = res.property;
        if (userInfo) {
          localStorage.setItem('token', userInfo.token);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          await setInitialState((s) => ({ ...s, currentUser: userInfo }));
        }
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img
                alt="logo"
                className={styles.logo}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <span className={styles.title}>微页</span>
            </Link>
          </div>
          <div className={styles.desc}>{'微页 - 一个注重交互的H5编辑器'}</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type}>
              <Tabs.TabPane key="account" tab={'账户密码登录'} />
            </Tabs>
            {type === 'account' && (
              <>
                <ProFormText
                  name="user_name"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'用户名: weiye'}
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'密码: weiye123456'}
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                  ]}
                />
              </>
            )}
            {/* <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
            </div> */}
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
