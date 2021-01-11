module.exports = () => {
    const dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const passLength = Math.floor( Math.random() * 12) + 6
    
    let randPass = ''
    for(let x = 0; x < passLength; x++)
      {
          randPass += dict[Math.floor(Math.random()*dict.length)]
      }
    return randPass
}
