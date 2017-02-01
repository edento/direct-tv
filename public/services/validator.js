/**
 * This service is reponsible for any kind of validation needs to be done in this project.
 */
directTV.factory('validator', [function() {

    /**
     * Checks if for a given Obeject, all its field are true
     * @param object - any kind of object
     * @returns {boolean} - returns true if all fields are true. otherwise, it returns false
     */
    var allTrue = function(object) {
        for (var o in object)
            if (!object[o]) return false;

        return true;
    };
    /**
     * Validates credit card. currently it checks its length only.
     * @param number -  credit card number (number/string)
     * @returns {boolean} - true if the number is 8<=length<=16
     */
    var validateNumber = function(number) {
        // log("validating card " + number);
        return Stripe.card.validateCardNumber(number);
    };

    var validateCVV = function(cvv) {
        return Stripe.card.validateCVC(cvv);
    };

    var validateExpiry = function(month, year) {
        // log("validating exp month: " + month + " year: " + year);
        if (isFilled(month) && isFilled(year)) {
            return Stripe.card.validateExpiry(month, year);
        } else {
            return false;
        }
    };
    var validateHolder = function(name) {
        if (name && name.length > 4) {
            return true;
        } else {
            return false;
        }
    };
    var isCompanyNameValid = function(companyName) {
        return isFilled(companyName);
    };
    var isPhoneValid = function(phone) {
        // var digitsReg = /^\d+$/; // checks numbers only
        var phoneRegex = /^[0-9-]*$/; // checks numbers and dashes
        return isFilled(phone) && phoneRegex.test(phone);
    };
    var isWebsiteValid = function(website) {
        var urlRegex = /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*[.]([a-z]{2,3}|[a-z]{2,3}[.][a-z]{2,4})([:][0-9]{1,6})?([a-z]+)?([a-zA-Z0-9 \/ \? \& \= \- \# \ % \$ \@ \!]+)?$/;
        var test = urlRegex.test(website);
        // log("testing link: " + website + " with answer: " + test);

        return test;
    };
    var isEmailValid = function(email) {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var test = emailRegex.test(email);
        // log("testing email: " + email + " is valid: " + test);
        return isFilled(email) && test;
    };
    /**
     * Checks if a given input is not empty.
     * @param input - any object
     * @returns {boolean} - true if not empty (undefined, null, '');
     */
    var isFilled = function(input) {
        switch (typeof input) {
            case 'object':
                return !angular.equals(input, {});
            case 'number':
                input = input.toString();
            case 'string':
                if (input) {
                    return true;
                }
                return false;
            default:
                return false;
        }
    };

    return {
        allTrue: allTrue,
        isFilled: isFilled,
        validateCVV: validateCVV,
        validateHolder: validateHolder,
        isCompanyNameValid: isCompanyNameValid,
        isPhoneValid: isPhoneValid,
        isWebsiteValid: isWebsiteValid,
        isEmailValid: isEmailValid,
        validateNumber: validateNumber,
        validateExpiry: validateExpiry
    }
}]);