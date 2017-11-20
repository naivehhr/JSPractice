function startMove(obj, _json, callback) {
  clearInterval(obj.timer)
  //attr, iTarget
  obj.timer = setInterval(function () {
    var stop = true;
    for(let attr in _json) {
      var cur = 0
      if (attr == 'opacity') {
        cur = parseFloat(getStyle(obj, attr)) * 100
      } else {
        cur = parseInt(getStyle(obj, attr))
      }
      var speed = (_json[attr] - cur) / 10;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if(cur != _json[attr]) stop = false
      if (attr == 'opacity') {
        obj.style.filter = `alpha(opcity:${cur + speed})`
        obj.style.opacity = (cur + speed) / 100
      } else {
        obj.style[attr] = cur + speed + 'px'
      }
      if(stop) {
        clearInterval(obj.timer)
        if(callback) callback()
      }
    }
  }, 30)
}
function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name]
  } else {
    return getComputedStyle(obj, false)[name]
  }
}