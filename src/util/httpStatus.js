const HttpStatus = {

    // Success Responses
    OK: { code: 200, status: 'OK' }, // Standard response for successful HTTP requests.
    CREATED: { code: 201, status: 'CREATED' }, // The request has been fulfilled and resulted in a new resource being created.
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' }, // The server successfully processed the request, but is not returning any content.

    // Client Error Responses
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' }, // The server could not understand the request due to invalid syntax.
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' }, // The server cannot find the requested resource.

    // Server Error Responses
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' }, // The server encountered a situation it does not know how to handle.
}
  
  export default HttpStatus;
  