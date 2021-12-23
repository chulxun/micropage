import React from 'react';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Skeleton, Card, Alert } from 'antd';
import styles from './Welcome.less';
import { useModel } from 'umi';

const PageHeaderContent: FC = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  const { currentUser } = initialState;
  if (!currentUser || !currentUser.user_name) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src="/avatar.gif" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.user_name}
          ，祝你开心每一天！
        </div>
        <div>欢迎登录微页-后台管理系统</div>
      </div>
    </div>
  );
};
export default (): React.ReactNode => {
  return (
    <PageContainer content={<PageHeaderContent />}>
      <Card>
        <Alert
          message={'更多内容持续发布中。'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
      </Card>
    </PageContainer>
  );
};
