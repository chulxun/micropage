//html转为svg 保存图片
export async function onCreateImgBySvg() {
  // 复制DOM节点
  let dom: any = document.querySelector('.editor_container');
  dom.style.position = "relative"
  let cloneDom: any = dom.cloneNode(true);
  if (cloneDom.querySelector('.scale_height_btn')) {
    cloneDom.querySelector('.scale_height_btn').remove();
  }
  let _w = dom.clientWidth,
    _h = dom.scrollHeight - 36; //- scale_height_btn高度
  //处理样式为内联
  let style: any = document.createElement('style');
  cloneDom.appendChild(style);
  let styleList = document.querySelectorAll('style');
  let styleouter = '';
  let linkList: any = document.querySelectorAll('link[rel=stylesheet]');
  for (let i = 0; i < linkList.length; i++) {
    let url = linkList[i].href;
    let _csstext = '';
    try {
      let response = await fetch(url);
      _csstext = await response.text();
    } catch (err) { }
    if (_csstext) {
      styleouter += _csstext;
    }
  }
  for (let i = 0; i < styleList.length; i++) {
    styleouter += styleList[i].innerHTML;
  }
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = styleouter;
  } else {
    style.appendChild(document.createTextNode(styleouter));
  }
  cloneDom.appendChild(style);
  //处理页面内img为base64
  let imgList = cloneDom.querySelectorAll('img');
  for (let i = 0; i < imgList.length; i++) {
    if (imgList[i].src.indexOf('data:image') == -1) {
      //不处理base64 图片
      let newurl = await toBase64(imgList[i].src);
      imgList[i].src = newurl;
    }
  }
  cloneDom.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // 图片地址显示为DOM转换的svg
  let data =
    'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="' +
    _w +
    '" height="' +
    _h +
    '"><foreignObject x="0" y="0" width="100%" height="100%">' +
    new XMLSerializer()
      .serializeToString(cloneDom)
      .replace(/#/g, '%23')
      .replace(/\n/g, '%0A') +
    '</foreignObject></svg>';
  let svgImgBase64 = await toBase64(data)
  return svgImgBase64

}
//图片url转为base64
export async function toBase64(url: string): Promise<string> {
  let image1 = new Image();
  image1.setAttribute('crossOrigin', 'anonymous');
  image1.src = url;
  return new Promise(reslove => {
    image1.onload = async function () {
      let width = image1.width,
        height = image1.height;
      let canvas = document.createElement('canvas');
      let context: any = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image1, 0, 0);
      let base64 = canvas.toDataURL();
      reslove(base64);
    };
  });
}
