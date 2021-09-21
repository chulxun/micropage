import React from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { register } from '@/services/user';

export type FormValueType = {
  user_name: string;
  password: string;
  mobile?: string;
  email?: string;
  role: number;
};
export type AddFormProps = {
  onSubmit: () => Promise<void>;
};

const AddForm: React.FC<AddFormProps> = (props) => {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const handleAdd = async (values: FormValueType) => {
    const res: API.SubmitResult = await register(values);
    if (res.code === 0) {
      message.success(res.message);
      props.onSubmit();
    } else {
      message.error(res.message);
      return false;
    }
    return true;
  };
  return (
    <ModalForm
      title="新增用户"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新增用户
        </Button>
      }
      width="400px"
      {...formItemLayout}
      layout="horizontal"
      onFinish={async (values: FormValueType) => {
        const success = await handleAdd(values);
        return success;
      }}
    >
      <ProFormText
        name="user_name"
        label="用户名"
        placeholder="请输入用户名"
        rules={[
          {
            required: true,
            message: '用户名不能为空',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        label="密码"
        placeholder={'请输入密码'}
        rules={[
          {
            required: true,
            message: '密码不能为空',
          },
        ]}
      />
      <ProFormSelect
        name="role"
        label="身份"
        rules={[{ required: true, message: '请选择用户身份' }]}
        options={[
          {
            label: '普通用户',
            value: 2,
          },
          {
            label: '管理员',
            value: 1,
          },
        ]}
        placeholder="请选择用户身份"
      />
      <ProFormText name="mobile" label="手机号" placeholder="请输入手机号" />
      <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" />
    </ModalForm>
  );
};

export default AddForm;
