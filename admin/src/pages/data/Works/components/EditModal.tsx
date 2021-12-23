import type { FC } from 'react';
import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '../style.less';
import { message } from 'antd';
import CodeMirror from '@/components/CodeMirror';
import { editWork } from '@/services/works';
import { useState } from 'react';
type EditModalProps = {
  visible: boolean;
  current: Partial<API.WorkInfo> | undefined;
  onDone: () => void;
};

const OperationModal: FC<EditModalProps> = (props) => {
  const { visible, current, onDone, children } = props;
  const [code, setCode] = useState('');
  if (!visible) {
    return null;
  }
  const handleFinish = async (values: API.WorkInfo) => {
    if (code) {
      values.pages = encodeURIComponent(JSON.stringify(JSON.parse(code)));
    }
    values.work_id = current?.work_id || '';
    const res = await editWork(values);
    if (res.code === 0) {
      message.success('操作成功');
      onDone();
    } else {
      message.error(res.message);
    }
  };
  return (
    <ModalForm<API.WorkInfo>
      visible={visible}
      title={'编辑作品'}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        handleFinish(values);
      }}
      initialValues={current}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
      }}
    >
      <>
        <ProFormText
          name="title"
          label="作品标题"
          rules={[{ required: true, message: '请输入作品标题' }]}
          placeholder="请输入"
        />
        <ProFormTextArea
          name="description"
          label="作品描述"
          rules={[{ required: true, message: '请输入作品描述内容' }]}
          placeholder="请输入"
        />
        <ProForm.Item name="pages">
          <CodeMirror
            value={JSON.stringify(current?.pages || [], null, 1)}
            onChange={(_editor: any, _data: any, value: any) => {
              setCode(value);
            }}
          />
        </ProForm.Item>
      </>
    </ModalForm>
  );
};

export default OperationModal;
