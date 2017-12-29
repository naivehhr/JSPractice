
// https://zhuanlan.zhihu.com/p/21834559
// https://mengera88.github.io/2017/05/18/Promise%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90/


// 博大精深啊
// Promise 的规范， 状态只能单向流动一次
function MyPromise(fn) {
	var value = null
	var callbacks = []
	var state = 'pending'
	
	this.then = function (onFulfilled, onRejected) {
		// if(state === 'pending'){
		// 	callbacks.push(onFulfilled)
		// 	return this
		// }
		// // 如果已经改变了，就直接执行注册的回调方法就行了
		// onFulfilled(value)
		// return this

		// 链式promise
		return new MyPromise(function (resolve, reject) {
			handle({
				onFulfilled: onFulfilled || null,
				resolve: resolve,
				onRejected: onRejected || null,
				reject: reject
			})
		})
	}

	this.catch = function(_rejectFn){
		_rejectFn(value)
	}

	/**
	 * 通过state的值，调用不同的方法
	 * 如有回调，就把方法返回的值传下去
	 * @param {*} obj 
	 */
	function handle(obj) {
		if (state === 'pending') {
			// 如果进这就表示还没进入下个状态啊
			callbacks.push(obj)
			return
		}
		// then 方法没有注册回调方法的时候

		// if (!obj.onFulfilled) {
		// 	obj.resolve(value)
		// 	return
		// }
		var cb = state == 'fulfilled' ? obj.onFulfilled : obj.onRejected
		var ret
		if (cb === null) {
			cb = state == 'fulfilled' ? obj.resolve : obj.reject
			cb(value)
			return
		}
		ret = cb(value);
		obj.resolve(ret);
		// var ret = obj.onFulfilled(value) //执行当前then方法 并返回的value向下个promise传递
		// obj.resolve(ret) // 这里是？
	}

	function _reject(reason) {
		state = 'reject'
		value = reason
		execute()
	}

	// 就是实际在resolve中调用的
	function _resolve(newValue) {
		// setTimeout(function () {
		// 	callbacks.forEach(function (callbackFn) {
		// 		callbackFn(value)
		// 	})
		// }, 1)
		// 如果是嵌套的MyPromise
		if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
			var _then = newValue.then
			if (typeof _then == 'function') {
				// 这里要主动调用then方法啊，要不怎么跳出内层的MyPromise呢
				_then.call(newValue, _resolve, _reject) // 回调? 应该是嵌套了多少个MyPromise吧
				return
			}
		}
		state = 'fulfilled'
		value = newValue
		// 延迟就是为了先把then等的函数注册进去
		execute()
	}

	function execute() {
		setTimeout(function () {
			callbacks.forEach(function (callbackFn) {
				handle(callbackFn);
			})
		}, 0)
	}

	try {
		fn(_resolve, _reject)
	} catch (error) {
		_reject(error)
	}
}


let p = new MyPromise(function (resolve, reject) {
	// 其宗旨就是要异步完成😂
	// console.log(resolve)
	a()
	setTimeout(function () {
		// a()
	}, 0)
})
// p.then(function (data) {
// 	// 处理job
// 	console.log('data=>' + data)
// }, function (error) {
// 	// getUserId或者getUerJobById时出现的错误
// 	console.log('error=>' + error);
// })

p.then(function (data) {
	// 处理job
	console.log('data=>' + data)
})
.catch(err => {
	console.log('errasdfs=>' + err)
})

function a() {
	throw '123'
}
