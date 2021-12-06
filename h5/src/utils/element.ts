const outsideData = ['width', 'height', 'left', 'top', 'transform', 'position']
// 组装 element的style(最外层)
export function getElementStyle(styles: any, isRem: boolean = false, pageHeight = 667) {
   const newStyle:any = { zIndex: 1 }
  if (!styles.position) {
    newStyle.position = 'absolute'
  }
  for (const key in styles) {
    if (outsideData.includes(key)) {
      if (!isNaN(styles[key])) {
        newStyle[key] = isRem
          ? pxToRem(styles[key])
          : `${styles[key]}px`
      } else {
        newStyle[key] = styles[key]
      }
    }
  }
  // 预览作品时，考虑fixed定位bottom所在位置
  if (isRem) {
    const screenHeight = 667
    if (newStyle.position === 'fixed' && (styles.top + styles.height) > screenHeight) {
      newStyle.bottom = `${pxToRem(pageHeight - styles.top - styles.height)}`
      newStyle.top = 'auto'
    }
  }
  return newStyle
}

// 组装 element的style(最里层)，需要区分开,不然动画和拖拽展示会有问题
export function getElementInsideStyle(elename:string, styles:any, isRem = false) {
  const newStyle:any = {}
  for (const key in styles) {
    if (!outsideData.includes(key)) {
      if (elename === 'plug-timer' && key === 'textAlign') {
        if (styles[key] === 'right') {
          newStyle.justifyContent = 'flex-end'
        } else if (styles[key] === 'left') {
          newStyle.justifyContent = 'flex-start'
        } else {
          newStyle.justifyContent = styles[key]
        }
      } if (key === 'padding') {
         let pd = isRem ? pxToRem(styles.padding) : styles.padding + "px";
        if(elename === 'plug-text'){
          newStyle.padding = pd;
        }else{
          newStyle.paddingLeft = pd;
          newStyle.paddingRight = pd;
        }
      } else if (!isNaN(styles[key]) && key !== 'lineHeight') {
        // 行高不需要转rem
        newStyle[key] = isRem
          ? pxToRem(styles[key])
          : `${styles[key]}px`
      } else {
        newStyle[key] = styles[key]
      }
    }
  }
  return newStyle
}
//px转rem
export function pxToRem(num: number) {
  if (num) {
    return parseFloat(num / 100 + '').toFixed(2) + 'rem'
  }
  return num
}

// 替换富文本中的px为rem
export function getElementRichTextRem(richText:string, isRem = false) {
  if (richText !== '' && isRem) {
    richText = richText.replace(/([1-9]\d*\.?\d*)px/g, s => {
      s = s.replace('px', '')
      const value = parseInt(s, 10) * 0.01
      return `${value}rem`
    })
  }
  return richText
}