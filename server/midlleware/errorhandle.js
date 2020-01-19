class ErrorHandle{
    static err(err,req,res){
        let errorCode = err.errorCode || 500
        let message = err.message || 'Internal server error'
        res.status(errorCode).json(message)
    }
}


module.exports = ErrorHandle