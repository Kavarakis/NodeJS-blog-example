// Centralized script for handling errors
module.exports = (err) => {

    var response = {};
    //Handled errors
    if (err.name === 'SequelizeValidationError') {

        response.message = err.errors[0].message;
    } else if (err.name === 'SequelizeUniqueConstraintError') {

        response.message = err.errors[0].message;
    } else if (err.name === 'SequelizeForeignKeyConstraintError') {

        if (err.original.errno === 1452) {

            response.message = 'Foreign key is not valid.';
        }
    } else if (err.name === 'SearchError') {

        response.message = err.message;
    }
    else if (err.message) {
        response.message = err.message;
    }
    //If response isn't handled, pass original error
    if (JSON.stringify(response) === '{}') return err;
    else return response;
};