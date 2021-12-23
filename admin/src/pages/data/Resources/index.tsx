import { Image, Card, List, Modal, message, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'umi';
import { getAllResources, deleteResource } from '@/services/resources';
import { useState, useMemo } from 'react';
import moment from 'moment';
import { useLocation } from 'umi';
import PreviewModal from './components/PreviewModal';

import styles from './style.less';

const ResourceList = () => {
  const location = useLocation();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [previewVisile, setPreviewVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<API.ResourceInfo | undefined>(undefined);
  const type = useMemo(() => {
    let pathname = location.pathname;
    if (pathname.indexOf('audio') !== -1) {
      return 3;
    } else if (pathname.indexOf('videos') !== -1) {
      return 2;
    } else {
      return 1;
    }
  }, [location.pathname]);
  const { data, loading, refresh } = useRequest(() => {
    return getAllResources({
      type,
      pageIndex,
      pageSize,
    });
  });
  const list = data?.list || [];
  // 删除
  const handleDelete = (item: API.ResourceInfo) => {
    Modal.confirm({
      title: '删除作品',
      content: `确定删除该资源吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await deleteResource({ id: item.id });
        if (res.code === 0) {
          message.success('操作成功');
          refresh();
        } else {
          message.error(res.message);
        }
      },
    });
  };
  // 复制
  const handleCopy = (e: React.MouseEvent) => {
    const target: any = e.target;
    const copyEle: any = target?.getElementsByTagName('p')[0]; // 获取要复制的节点
    const range = document.createRange(); // 创造range
    window?.getSelection()?.removeAllRanges(); //清除页面中已有的selection
    range.selectNode(copyEle); // 选中需要复制的节点
    window?.getSelection()?.addRange(range); // 执行选中元素
    const copyStatus = document.execCommand('Copy'); // 执行copy操作
    // 对成功与否定进行提示
    if (copyStatus) {
      message.success('复制成功');
    } else {
      message.error('复制失败');
    }
    window?.getSelection()?.removeAllRanges(); //清除页面中已有的selection
  };
  // 预览
  const handlePreview = (item: API.ResourceInfo) => {
    setCurrent(item);
    setPreviewVisible(true);
  };
  return (
    <PageContainer>
      <div className={styles.cardList}>
        <List
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
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
          dataSource={[...list]}
          renderItem={(item) => {
            return (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  className={styles.card}
                  actions={[
                    <a key="delete" onClick={(e) => handleDelete(item)}>
                      删除
                    </a>,
                    <a key="copy" onClick={(e) => handleCopy(e)}>
                      复制<p style={{ display: 'none' }}>{item.url}</p>
                    </a>,
                  ]}
                  cover={
                    <>
                      {type === 1 && <Image src={item.url} height={200} />}
                      {type === 2 && (
                        <img src={item.preview_url} onClick={() => handlePreview(item)} />
                      )}
                      {type === 3 && <Typography.Text>{item.url}</Typography.Text>}
                    </>
                  }
                >
                  <Card.Meta
                    title={<span>作者：{item.user_name}</span>}
                    description={
                      <>
                        创建时间：{moment(item.created_at).format('YYYY-MM-DD HH:mm')} <br />
                        大小：{item.size}
                      </>
                    }
                  />
                </Card>
              </List.Item>
            );
          }}
        />
      </div>
      <PreviewModal visible={previewVisile} onClose={setPreviewVisible} current={current} />
    </PageContainer>
  );
};

export default ResourceList;
