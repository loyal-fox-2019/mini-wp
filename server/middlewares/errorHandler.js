
function errorHandler(err, req, res, next) {
   console.log(Object.keys(err))
   console.log(err)

   let errorCode = err.errorCode || 500
   let message = err.message || 'internal server error'

   if(JSON.stringify(err).includes('ValidationError')) {
      errorCode = 400
      message = err.message.split('Author validation failed: ')[1].split(',').join('\n')
   }
   
   res.status(errorCode).json({message})
}

module.exports = errorHandler