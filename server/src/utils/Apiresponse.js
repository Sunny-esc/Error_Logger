

class Apiresponse {
  constructor(statusCode, message='Success', data) {
    this.status = statusCode;
    this.message = message;
    this.data = data;
    this.Success = statusCode < 400;
  }
}
export default Apiresponse;