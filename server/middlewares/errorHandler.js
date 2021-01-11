function errorHandler(err, req, res, next){
  let code = err.code || 500
  let message = err.message || 'Internal Server Error'
  if (code == 11000){
    code = 500
    message = 'Email is used'
  } 
  if (err.errors){
    code = 400
    let fields = Object.keys(err.errors)
    message = ''
    fields.forEach((e) => {
      message += (err.errors[e].message) + '\n'
    })
  }
  res.status(code).json({message})
}

module.exports = errorHandler