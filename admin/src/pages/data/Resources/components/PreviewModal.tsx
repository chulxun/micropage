import { Modal } from 'antd';
type PreviewProps = {
  visible: boolean;
  current: API.ResourceInfo | undefined;
  onClose: (status: boolean) => void;
};
const PreviewModal = (props: PreviewProps) => {
  const { visible, current, onClose } = props;
  if (!current) return null;
  return (
    <>
      <Modal
        title={current.type === 2 ? '视频预览' : '音频预览'}
        visible={visible}
        onOk={() => onClose(false)}
        onCancel={() => onClose(false)}
      >
        <div className="preview_content">
          {current.type === 2 ? (
            <video controls autoPlay={true}>
              <source type="video/mp4" src={current.url} />
            </video>
          ) : (
            <audio src={current.url} controls></audio>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
