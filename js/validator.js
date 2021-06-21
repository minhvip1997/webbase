function Validator(options) {

    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        console.log(errorElement)
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    var formElement = document.querySelector(options.form);

    if (formElement) {

        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector)

            console.log(inputElement)
            if (inputElement) {
                // Blur
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                //input text
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }

        })
    }

}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'please enter this field'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'This field must be email';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Please enter at least ${min} characters`;
        }
    };
}

Validator.maxLength = function (selector, max, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length <= max ? undefined : message || `Please do not enter at  ${max} characters`;
        }
    };
}

Validator.isPostCode = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\d{6}$/;
            return regex.test(value) ? undefined : message || 'This field must be 6 number';
        }
    };
}

Validator.isMobile = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\d{10}$/;
            return regex.test(value) ? undefined : message || 'This field must be 10 number';
        }
    };
}
