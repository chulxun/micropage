
//组装 element的style
export function getElementStyle(styles: any, isRem: boolean = false) {

  let newStyle = Object.assign({}, styles)
  if (!styles.position) {
    newStyle.position = 'absolute'
  }
  if (styles.width && !isNaN(styles.width)) {
    newStyle.width = isRem ? pxToRem(styles.width) : styles.width + 'px'
  } else {
    newStyle.width = styles.width
  }

  if (styles.height && !isNaN(styles.height)) {
    newStyle.height = isRem ? pxToRem(styles.height) : styles.height + 'px'
  } else {
    newStyle.height = styles.height
  }

  if (styles.top && !isNaN(styles.top)) {
    newStyle.top = isRem ? pxToRem(styles.top) : styles.top + 'px'
  } else {
    newStyle.top = styles.top
  }

  if (styles.left && !isNaN(styles.left)) {
    newStyle.left = isRem ? pxToRem(styles.left) : styles.left + 'px'
  } else {
    newStyle.left = styles.left
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