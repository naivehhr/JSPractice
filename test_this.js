// 字面量方式创建对象，以后就是function了吧


let obj = {
	// 原来写法
	name: 'myname',
	getName: function(){
		return this.name
	},
	getNameArrow: () => {
		// this并不能指向obj 这里指向了window
		return this.name
	}
}

let name = 'myname'
let obj2 = {
	name,
	getName(){
		return this.name
	},
	// 这样语法不通...
	getNameArrow = () =>{
		return this.name
	}
}

// 构造函数方式
function Person() {
	this.myname = 'myname'
}
Person.prototype.getName = function() {
	return this.myname
}
Person.prototype.getNameArrow = () => {
	// this 同样会丢失 这里依然指向window
	return this.myname
}
let p = new Person()
console.log(p.getName())