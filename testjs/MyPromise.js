
// Promise 的规范， 状态只能单向流动一次
function MyPromise(fn) {
	var value = null
	var callbacks = []
	var state = 'pending'

	this.then = function (onFulfilled) {
		if(state === 'pending'){
			callbacks.push(onFulfilled)
			return this
		}
		// 如果已经改变了，就直接执行注册的回调方法就行了
		onFulfilled(value)
		return this
	}

	// 就是实际在resolve中调用的
	function _resolve(value) {
		setTimeout(function () {
			callbacks.forEach(function (callbackFn) {
				callbackFn(value)
			})
		}, 1)
	}
	fn(_resolve)
}

let p = new MyPromise(function (resolve) {
	// 其宗旨就是要异步完成😂
	resolve('1')
})
p.then(function (data) {
	console.log('123s')
})
