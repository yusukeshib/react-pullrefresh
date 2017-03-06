const boxShadow = dp => {
  if(dp === 0) return 'none'
  let shadow = '0px '
  let ambientY = dp
  let ambientBlur = dp == 1 ? 3 : dp * 2
  let ambientAlpha = (dp + 10 + (dp / 9.38)) / 100
  shadow += ambientY + 'px ' + ambientBlur + 'px rgba(0, 0, 0, ' + ambientAlpha + '), 0px '
  let directY = (dp < 10 ? (dp % 2 == 0 ? dp - ((dp / 2) - 1) : (dp - ((dp - 1) / 2))) : dp - 4)
  let directBlur = dp == 1 ? 3 : dp * 2
  let directAlpha = (24 - Math.round(dp / 10)) / 100
  shadow += directY + 'px ' + directBlur + 'px rgba(0, 0, 0, ' + directAlpha + ')'
  return shadow
}

export default function(v) {
  return {
    boxShadow: boxShadow(v)
  }
}

