let value = 2
module.exports = {
  get: () =>{
    value++
    if (value > 65535) {
      value = 2
    }
    return value
  }
}
