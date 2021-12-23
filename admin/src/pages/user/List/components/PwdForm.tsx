import React from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { changePwd } from '@/services/user';

export type FormValueType = {
  pwd: string;
  pwd2: string;
};
export type PwdFormProps = {
  onCancel: () => void;
  pwdModalVisible: boolean;
  values: Partial<API.CurrentUser>;
};

const PwdForm: React.FC<PwdFormProps> = (props) => {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  // 修改密码
  const handleEdit = async (values: FormValueType) => {
    const params: API.PwdParams = { password: values.pwd, user_id: props.values.id || 0 };
    const res: API.SubmitResult = await changePwd(params);
    if (res.code === 0) {
      message.success(res.message);
      props.onCancel();
    } else {
      message.error(res.message);
      return false;
    }
    return true;
  };
  return (
    <ModalForm
      title="修改密码"
      width="460px"
      visible={props.pwdModalVisible}
      {...formItemLayout}
      layout="horizontal"
      onFinish={async (values: FormValueType) => {
        const success = await handleEdit(values);
        return success;
      }}
      modalProps={{
        onCancel: () => props.onCancel(),
      }}
    >
      <ProFormText
        name="user_name"
        label="用户名"
        placeholder="请输入用户名"
        readonly
        value={props?.values?.user_name || ''}
      />
      <ProFormText.Password
        name="pwd"
        label="新密码"
        placeholder={'请输入新密码'}
        rules={[
          {
            required: true,
            message: '新密码不能为空',
          },
        ]}
      />
      <ProFormText.Password
        name="pwd2"
        label="确认密码"
        placeholder={'请输入确认密码'}
        rules={[
          {
            required: true,
            message: '确认密码不能为空!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('pwd') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两个密码必须一致!'));
            },
          }),
        ]}
      />
    </ModalForm>
  );
};

export default PwdForm;
