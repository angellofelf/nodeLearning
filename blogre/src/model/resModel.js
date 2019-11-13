import { basename } from "upath";

class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.cv = message;
        }
    }
}

class SuccessModal extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.succes = true;
    }
}

class ErrorModal extends BaseModel {
   constructor(data, message) {
    super(data, message);
    this.succes = false;
   }
}

module.exports = {
    SuccessModal,
    ErrorModal,
}