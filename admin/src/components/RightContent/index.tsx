import { Space } from 'antd';
import { SketchCircleFilled, GithubOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://weiye.fanjinyan.com');
        }}
      >
        <SketchCircleFilled style={{ fontSize: '20px' }} />
      </span>
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://github.com/chulxun/micropage');
        }}
      >
        <GithubOutlined style={{ fontSize: '20px' }} />
      </span>
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
