function Person() {
	this.age = 1
}
Person.prototype.getAge = function() {
	return this.age
}

function Woker() {
	Person.apply(this, arguments)
	this.dudu = 'dudu'
}

Woker.prototype = new Person() // 原型继承

let woker = new Woker()
let person = new Person()
console.log(woker)