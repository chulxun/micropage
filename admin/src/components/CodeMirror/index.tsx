import { UnControlled as CodeMirror } from 'react-codemirror2';
// 依赖
import 'codemirror/lib/codemirror.css';
// 功能插件
// 编辑行高亮
import 'codemirror/addon/selection/active-line';
// 折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
// 代码提示补全
import 'codemirror/addon/hint/show-hint.css'; // start-ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js'; // end
// 全屏
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/fullscreen.js';
// 主题样式
import 'codemirror/theme/material.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/blackboard.css';
import './ayu-mirage.css';
// mode
import 'codemirror/mode/cmake/cmake';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';

import { useState, useEffect } from 'react';
import { Menu, Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import _ from './index.less';

export default CodeEditor;

const defaultOptions = {
  mode: { name: 'text/javascript' },
  theme: 'solarized',
  indentUnit: 2, // 缩进单位，值为空格数，默认为2
  tabSize: 2, // tab字符的宽度，默认为4 。
  smartIndent: true, // 自动缩进，设置是否根据上下文自动缩进（和上一行相同的缩进量）。默认为true。
  lineNumbers: true, // 显示行号
  firstLineNumber: 1, // 行号从哪个数开始计数，默认为1 。
  readOnly: false, // boolean|string 编辑器是否只读。如果设置为预设的值 “nocursor”，那么除了设置只读外，编辑区域还不能获得焦点。
  lineWiseCopyCut: true, // 启用时，如果在复制或剪切时没有选择文本，那么就会自动操作光标所在的整行。
  dragDrop: true, // 是否允许拖放，默认为true。
  autofocus: true, // 自动获取焦点
  // 以下需引入插件支持
  styleActiveline: true, // 光标行代码高亮
  extraKeys: { Ctrl: 'autocomplete' }, // ctr1+空格 自动提示配置
  // 折叠
  lineWrapping: true, // 在长行时文字是换行(wrap)还是滚动(scroll)，默认为滚动(scroll)。
  foldGutter: true,
  gutters: ['CodeMirror- linenumbers', ' CodeMirror- foldgutter'], // end
};

function CodeEditor(props: any) {
  const [options, setOptions] = useState(defaultOptions);
  const [fullScreen, setFullScreen] = useState(false);
  const [themeVisible, setThemeVisible] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem('codeMirrorTheme') || defaultOptions.theme,
  );

  useEffect(() => {
    const { options = {} } = props;
    setOptions({
      ...defaultOptions,
      theme,
      fullScreen,
      ...options,
    });
  }, [props.options, fullScreen, theme]);

  useEffect(() => {
    localStorage.setItem('codeMirrorTheme', theme);
  }, [theme]);

  const themeMenu = (
    <Menu onClick={(item) => setTheme(item.key)} selectedKeys={[theme]}>
      <Menu.Item key="ayu-mirage"> ayu-mirage </Menu.Item>
      <Menu.Item key="solarized"> solarized </Menu.Item>
      <Menu.Item key="material"> material </Menu.Item>
      <Menu.Item key="blackboard"> blackboard </Menu.Item>
    </Menu>
  );

  return (
    <div className={_.container}>
      <div className={_['btns']}>
        <Button
          className={fullScreen && _['full-screen-btn']}
          onClick={() => setFullScreen(!fullScreen)}
        >
          {fullScreen ? '退出全屏' : '全屏展示'}
        </Button>
        <Dropdown
          overlay={themeMenu}
          onVisibleChange={(v) => setThemeVisible(v)}
          visible={themeVisible}
        >
          <Button onClick={(e) => e.preventDefault()}>
            颜色主题
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <CodeMirror autoCursor={false} {...props} options={options} />
    </div>
  );
}
