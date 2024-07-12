const asyncHandler=(fn) => async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(500).json({
         message:error.message,
         statusCode:error.statusCode||500,
         stack:error.stack
         
        })
        console.error(error)
    }
}

module.exports={asyncHandler}