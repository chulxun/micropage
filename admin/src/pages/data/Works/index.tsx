import type { FC } from 'react';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, Input, List, Menu, Modal, Radio, Row } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { worksList } from '@/services/works';
import { addFakeList, removeFakeList, updateFakeList } from './service';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

// const ListContent = ({
//   data: { owner, createdAt, percent, status },
// }: {
//   data: API.WorkInfo;
// }) => (
//   <div className={styles.listContent}>
//     <div className={styles.listContentItem}>
//       <span>Owner</span>
//       <p>{owner}</p>
//     </div>
//     <div className={styles.listContentItem}>
//       <span>开始时间</span>
//       <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
//     </div>
//     <div className={styles.listContentItem}>
//       <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
//     </div>
//   </div>
// );

export const BasicList: FC = () => {
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<API.WorkInfo> | undefined>(undefined);

  const { data, loading, mutate } = useRequest(() => {
    return worksList({
      // count: 50,
    });
  });
  const { run: postRun } = useRequest(
    (method, params) => {
      if (method === 'remove') {
        return removeFakeList(params);
      }
      if (method === 'update') {
        return updateFakeList(params);
      }
      return addFakeList(params);
    },
    {
      manual: true,
      onSuccess: (result: any) => {
        mutate(result);
      },
    },
  );

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    // total: data.length,
  };

  const showEditModal = (item: API.WorkInfo) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: number) => {
    postRun('remove', { id });
  };

  const editAndDelete = (key: string | number, currentItem: API.WorkInfo) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">单页</RadioButton>
        <RadioButton value="waiting">翻页</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn: React.FC<{
    item: API.WorkInfo;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({});
  };

  const handleSubmit = (values: API.WorkInfo) => {
    setDone(true);
    const method = values?.id ? 'update' : 'add';
    postRun(method, values);
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="全部作品" value="999+" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已发布" value="400" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="新增作品" value="50" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.preview_img_url} shape="square" size="large" />}
                    title={
                      <a
                        href={`https://weiye.fanjinyan.com/pcviewer/${item.work_id}`}
                        target="_blank"
                      >
                        {item.title}
                      </a>
                    }
                    description={item.description}
                  />
                  <div className={styles.listContent}>
                    <div className={styles.listContentItem}>
                      <span>作者</span>
                      <p>{item.user_id}</p>
                    </div>

                    <div className={styles.listContentItem}>
                      <span>更新时间</span>
                      <p>{moment(item.updated_at).format('YYYY-MM-DD HH:mm')}</p>
                    </div>
                    <div className={styles.listContentItem}>123</div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
      {/* <Button
        type="dashed"
        onClick={() => {
          setVisible(true);
        }}
        style={{ width: '100%', marginBottom: 8 }}
      >
        <PlusOutlined />
        添加
      </Button> */}
      <OperationModal
        done={done}
        visible={visible}
        current={current}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BasicList;
