import type { FC } from 'react';
import React, { useState } from 'react';
import { Avatar, Card, Col, Input, List, Modal, Radio, Row, message, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import moment from 'moment';
import EditModal from './components/EditModal';
import { getAllWorksList, deleteWork, recoveryWork } from '@/services/works';
import styles from './style.less';
import { DownOutlined } from '@ant-design/icons';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

// 顶部统计数量card
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

export const WorkList: FC = () => {
  // 作品类型
  const [pageType, setPageType] = useState<number | ''>('');
  // 搜索框
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<API.WorkInfo> | undefined>(undefined);
  // 获取列表数据
  const { data, loading, refresh } = useRequest(
    () => {
      return getAllWorksList({
        pageType,
        searchTitle,
        pageIndex,
        pageSize,
      });
    },
    {
      refreshDeps: [pageType, searchTitle, pageIndex, pageSize],
    },
  );

  // 删除
  const deleteItem = (item: API.WorkInfo) => {
    Modal.confirm({
      title: '删除作品',
      content: `确定删除 “${item.title}” 吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await deleteWork({ work_id: item.work_id });
        if (res.code === 0) {
          message.success('操作成功');
          refresh();
        } else {
          message.error(res.message);
        }
      },
    });
  };
  // 恢复
  const recoveryItem = (item: API.WorkInfo) => {
    Modal.confirm({
      title: '恢复作品',
      content: `确定恢复 “${item.title}” 吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await recoveryWork({ work_id: item.work_id });
        if (res.code === 0) {
          message.success('操作成功');
          refresh();
        } else {
          message.error(res.message);
        }
      },
    });
  };
  // 筛选条件
  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup
        defaultValue={pageType}
        onChange={(e) => {
          setPageType(e.target.value);
        }}
      >
        <RadioButton value="">全部</RadioButton>
        <RadioButton value={1}>单页</RadioButton>
        <RadioButton value={2}>翻页</RadioButton>
      </RadioGroup>
      <Search
        className={styles.extraContentSearch}
        placeholder="请输入"
        onSearch={(e) => {
          setSearchTitle(e);
        }}
      />
    </div>
  );
  // 关闭弹框
  const handleDone = () => {
    setVisible(false);
    setCurrent({});
  };
  // 选择编辑方式
  const chooseEditType = (key: string | number, currentItem: API.WorkInfo) => {
    if (key === 'normal') {
      window.open('https://weiye.fanjinyan.com/editor/' + currentItem.work_id, '_blank');
    } else {
      setVisible(true);
      setCurrent(currentItem);
    }
  };
  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="全部作品" value={data?.page?.total_count || 0} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已发布" value={data?.page?.publish_count || 0} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="今日新增" value={data?.page?.today_count || 0} />
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
              pagination={{
                pageSize: pageSize,
                current: pageIndex,
                hideOnSinglePage: true,
                total: data?.page?.total_count || 0,
                onChange: (page, pageSize) => {
                  setPageIndex(page);
                  setPageSize(pageSize);
                },
              }}
              dataSource={data?.list || []}
              renderItem={(item) => (
                <List.Item
                  className={item.is_delete ? 'deleted' : ''}
                  actions={[
                    item.is_delete ? null : (
                      <Dropdown
                        overlay={
                          <Menu onClick={({ key }) => chooseEditType(key, item)}>
                            <Menu.Item key="normal">可视化编辑</Menu.Item>
                            <Menu.Item key="code">编辑源代码</Menu.Item>
                          </Menu>
                        }
                      >
                        <a>
                          编辑 <DownOutlined />
                        </a>
                      </Dropdown>
                    ),
                    item.is_delete ? (
                      <a
                        key="recovery"
                        onClick={(e) => {
                          e.preventDefault();
                          recoveryItem(item);
                        }}
                      >
                        恢复
                      </a>
                    ) : (
                      <a
                        key="delete"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteItem(item);
                        }}
                      >
                        删除
                      </a>
                    ),
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
                      <p>{item.user_name}</p>
                    </div>
                    <div className={styles.listContentItem}>
                      <span>类型</span>
                      <p> {item.page_type === 1 ? '单页' : '翻页'}</p>
                    </div>
                    <div className={styles.listContentItem}>
                      <span>创建时间</span>
                      <p>{moment(item.created_at).format('YYYY-MM-DD HH:mm')}</p>
                    </div>
                    <div className={styles.listContentItem}>
                      <p> {item.is_publish ? '已发布' : '未发布'}</p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
      <EditModal visible={visible} current={current} onDone={handleDone} />
    </div>
  );
};

export default WorkList;
