let value = 2
module.exports = {
  get: () =>{
    value++
    console.log('get value : ' + value)
  }
}
