// 生成器
// 作用呢

function* show(){
	yield 'hello'
	yield 'world'
}

let res = show()

res.next() //{value: "hello", done: false}
res.next() //{value: "world", done: false}
res.next() //{value: undefined, done: true}

function* show1(){
	yield 'hello'
	yield 'world'
	return 'default'
}

let res = show1()

res.next() //{value: "hello", done: false}
res.next() //{value: "world", done: false}
res.next() //{value: default, done: true}

// 貌似没大用啊
function* fn() {
	for(var i = 0; true; i++) {
		var a = yield i;
		if(a) i = -1
	}
}

// 总结
/**
 * yield 没有返回值
 * next 可以带参数 给上一个yield 赋值
 * 用for of 可以循环
 */