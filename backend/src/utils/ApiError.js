class ApiError{
    constructor(statusCode,message="Error"){
        this.statusCode=statusCode
        // this.data=data
        this.message=message
        this.success=statusCode<400
    }
}

export {ApiError}