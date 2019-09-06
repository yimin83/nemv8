let value = 2
module.exports = {
  get: () =>{
    value++
    return value
  }
}
