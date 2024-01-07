const resconst = {
    fieldMissingError: {
        success: false,
        errorCode: 'PSE: 1001',
        message: 'Some required fields are missing'
    },
    registerMessage: {
        success: true,
        errorCode: 201,
        message: "Registration successfull"
    },
    registerError : {
        success: false,
        errorCode: 409, 
        message: "User is already registered"
    },

    mobileAndPasswordError: {
        success: false,
        errorCode: 400,
        message: "Mobile number shuold be 10 digit and password len should be 8 digit"
    },
    loginMessage: {
        success: true,
        errorCode: 201,
        message: "login successfull"
    },
    loginError: {
        success: false,
        errorCode: 401,
        message: "password and mobile number are invalid"
    },
    loginUserNotfound: {
        success: false,
        errorCode: 204,
        message: "user not found"
    },
    internalServerError: {
        success: "false",
        errorCode: 500,
        message: "Interval server error. We are looking into this."
    },
    loginDataExist: {
        success: true,
        errorCode: 400,
        message: "you have already logged in"
    },

    internalServerError: {
        success: false,
        errorCode: 500,
        message: "Internal Server Error. we are looking into this server"
    },

    documentMissing:{
        success: false,
        errorCode: 204,
        message: "No bookings found for the specified user"
    },
    passwordError:{
        success: false,
        errorCode: 400,
        message: "password len should be 8 digit"
    },

    successfulDeletion : {
        success: true,
        errorCode: 200,
        message: "Member successfully deleted"
    },
    
    memberNotFound :{
        success: false,
        errorCode: 404,
        message: "Member not found"
    },

    successfulUpdate:{
        success: true,
        errorCode: 200,
        message: "Member details successfully updated"
    },

    bookNotFound: {
        success: false,
        errorCode: 404,
        message: "Book not found"
    },
    
    successfulBookListing: {
        success: true,
        errorCode: 200,
        message: "Books listed successfully"
    },

    bookExistsError: {
        success: false,
        errorCode: 409,
        message: "Book already exists"
    },
    bookAddedSuccess: {
        success: true,
        errorCode: 201,
        message: "Book added successfully"
    },

    successfullyDeletedBook:{
        success: true,
        errorCode: 200,
        message: "Book successfully deleted"
    }
};

module.exports = resconst;
