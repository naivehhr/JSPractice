function getPos(ev) {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	return {
		x: ev.clientX + scrollLeft,
		y: ev.clientY + scrollTop
	}
}

function myAddEvent(obj, ev, fn) {
	if(obj.attachEvent) {
		obj.attachEvent('on' + ev, fn)
	} else {
		obj.addEventListener(ev, fn ,false)
	}
}