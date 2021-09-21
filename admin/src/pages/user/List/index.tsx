import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import AddForm from './components/AddForm';
import PwdForm from './components/PwdForm';
import { user, writeOffUser, recoveryUser } from '@/services/user';

const TableList: React.FC = () => {
  const [pwdModalVisible, handlePwdModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.CurrentUser>();
  function onDelete(record: API.CurrentUser) {
    Modal.confirm({
      title: '注销提醒',
      content: `确定要注销“${record.user_name}”该账号吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const params: API.WhiteOffParams = { user_id: record.id || 0 };
        const res: API.SubmitResult = await writeOffUser(params);
        if (res.code === 0) {
          message.success(res.message);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        } else {
          message.error(res.message);
        }
      },
    });
  }
  function onRecovery(record: API.CurrentUser) {
    Modal.confirm({
      title: '恢复提醒',
      content: `确定要恢复“${record.user_name}”该账号吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const params: API.WhiteOffParams = { user_id: record.id || 0 };
        const res: API.SubmitResult = await recoveryUser(params);
        if (res.code === 0) {
          message.success(res.message);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        } else {
          message.error(res.message);
        }
      },
    });
  }
  const columns: ProColumns<API.CurrentUser>[] = [
    {
      title: '用户名',
      dataIndex: 'user_name',
      valueType: 'textarea',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'textarea',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'is_delete',
      valueEnum: {
        '': {
          text: '全部',
        },
        false: {
          text: '正常',
        },
        true: {
          text: '已注销',
        },
      },
    },
    {
      title: '身份',
      dataIndex: 'role',
      valueEnum: {
        '': {
          text: '全部',
        },
        1: {
          text: '管理员',
        },
        2: {
          text: '普通用户',
        },
      },
    },
    {
      title: '注册时间',
      key: 'showTime',
      dataIndex: 'create_at',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '注册时间',
      dataIndex: 'create_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: new Date(`${value[0]} 00:00:00`).getTime(),
            endTime: new Date(`${value[1]} 23:59:59`).getTime(),
          };
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      valueType: 'option',
      render: (_, record) => {
        return (
          <>
            {record.id === 1 && (
              <span key="noEdit" style={{ color: '#999' }}>
                初始账号不能操作
              </span>
            )}
            {record.id !== 1 && (
              <>
                {record.is_delete === false && (
                  <Button
                    type="primary"
                    key="edit"
                    ghost
                    onClick={() => {
                      handlePwdModalVisible(true);
                      setCurrentRow(record);
                    }}
                  >
                    修改密码
                  </Button>
                )}
                {record.is_delete === true && (
                  <Button
                    danger
                    type="dashed"
                    style={{ marginLeft: '15px' }}
                    key="recovery"
                    onClick={() => {
                      onRecovery(record);
                    }}
                  >
                    恢复
                  </Button>
                )}
                {record.is_delete === false && (
                  <Button
                    danger
                    style={{ marginLeft: '15px' }}
                    key="delete"
                    onClick={() => {
                      onDelete(record);
                    }}
                  >
                    注销
                  </Button>
                )}
              </>
            )}
          </>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.CurrentUser, API.PageParams>
        actionRef={actionRef}
        rowKey={(record) => record.id.toString()}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <AddForm
            onSubmit={async () => {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          />,
        ]}
        request={user}
        columns={columns}
      />

      <PwdForm
        onCancel={() => {
          handlePwdModalVisible(false);
          setCurrentRow(undefined);
        }}
        pwdModalVisible={pwdModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default TableList;
