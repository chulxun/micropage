import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const defaultMessage = 'chulxun出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: 'Github',
          href: 'https://github.com/chulxun/micropage',
          blankTarget: true,
        },
        {
          key: 'demo',
          title: '预览微页',
          href: 'https://weiye.fanjinyan.com',
          blankTarget: true,
        },
      ]}
    />
  );
};
