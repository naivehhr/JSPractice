// let p = new Promise((resolve, reject) => {
//   reject('123')
// })
// p.then(d => {
//   console.log(d)
//   return 1
// })
// .then(d => {
//   console.log(d) // 1
// })
// .catch(e => {
//   console.log('error')
// })
// .catch(e => {
//   console.log('error')
// })


// let p = new Promise((r, reject) => {
//   r('123')
// })

// p.then(d => {
// 	console.log(d)
// 	// 可以嵌套哦	
//   return new Promise((res, rej) => {
//     res('dddd')
//   })
// })
// .then(d => {
// 	console.log(d)
// 	throw '发生错误' // 也可以这样写
// })
// .then(d => {
//   console.log(d)
// })
// .catch(e => {
//   console.log('error', e)
// })


// let p1 = Promise.resolve(3)
// let p2 = Promise.resolve(p1)



// let pp = new Promise((resolve, reject) => {
//   resolve('123')
// })

// pp.then(data => {
//   console.log('data=>' + data)
//   return  Promise.resolve('asdf')
// })
// .then(data => {
//   console.log('data1=>' + data)
// })



// 并行的方式
let pp = new Promise((resolve, reject) => {
  a()
})

pp.then(data => {
  console.log('data=>' + data)
})
.catch(e => {
  console.log('e==' + e)
})

function a() {
  throw '123'
}
