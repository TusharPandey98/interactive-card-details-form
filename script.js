const fullNameInput = document.getElementById('card_holder_name');
const fullNameError = document.getElementById('nameErrorMsg');
const cardHolderName = document.getElementById('cardHolderName');
const cardNumberInput = document.getElementById('card_number');
const cardNumberErr = document.getElementById('cardNumberErrorMsg');
const cardNumber = document.querySelectorAll('.card__number span');
const expDateInputs = document.querySelectorAll('.expiry__date__inputs input');
const expDateErrorMsg = document.getElementById('expDateErrorMsg');

const allerror = document.querySelectorAll('.error');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

//cvc
const cvcInput = document.getElementById('cvc');
const cvcErrMsg = document.getElementById('cvcErrorMsg');
const cvcNumber = document.querySelector('.cvc__number');

const confirmBtn = document.getElementById('confirm');
const allInputs = document.querySelectorAll('form input')

const cardDetailForm = document.getElementById('card__details__form');
const thankyouCard = document.getElementById('thankyou__card');

const regexForName = /^[A-Za-z' ']+$/
const regexForNumsOnly = /^[0-9]+$/
const cardData = {
    cardHolderName: ''
}
const handleInput = (e) => {
    let { name, value } = e.target;
    if (name == 'cardHolderName') {
        if (!regexForName.test(value) || value == '' || value.length > 20) {
            fullNameError.classList.remove('dsp__hidden');
            e.target.classList.add('input__error')
        } else {
            fullNameError.classList.add('dsp__hidden');
            e.target.classList.remove('input__error')
        }
        if (value.length <= 20) {
            cardHolderName.textContent = value;
        }
    } else if (name === 'cardNumber') {
        if (!regexForNumsOnly.test(value) || value == '' || value.length > 16) {
            cardNumberErr.classList.remove('dsp__hidden');
            e.target.classList.add('input__error');

        } else {
            cardNumberErr.classList.add('dsp__hidden');
            e.target.classList.remove('input__error')
        }
        if (value.length <= 16) {
            const formattedValue = value.padEnd(16, '0').slice(0, 16);
            const groups = formattedValue.match(/.{1,4}/g) || [];

            cardNumber.forEach((span, index) => {
                span.textContent = groups[index] || '0';
            });

        }
    }
    else if (name === 'month') {
        if (!regexForNumsOnly.test(value) || value == '' || value > 12) {
            expDateErrorMsg.classList.remove('dsp__hidden');
            e.target.classList.add('input__error');

        } else {
            expDateErrorMsg.classList.add('dsp__hidden');
            e.target.classList.remove('input__error')
        }
        if (value.length <= 2) {
            month.textContent = value.padStart(2, '0');
        }
    }
    else if (name == 'year') {
        if (!regexForNumsOnly.test(value) || value == '' || value < 23) {
            expDateErrorMsg.classList.remove('dsp__hidden');
            e.target.classList.add('input__error');

        } else {
            expDateErrorMsg.classList.add('dsp__hidden');
            e.target.classList.remove('input__error')
        }
        if (value.length <= 2) year.textContent = value.padStart(2, '0');
    } else if (name == 'cvc') {
        if (!regexForNumsOnly.test(value) || value == '' || value > 999) {
            cvcErrMsg.classList.remove('dsp__hidden');
            e.target.classList.add('input__error');

        } else {
            cvcErrMsg.classList.add('dsp__hidden');
            e.target.classList.remove('input__error')
        }
        if (value.length <= 3) cvcNumber.textContent = value.padStart(3, '0');
    }

}

const isAllDataValid = () => {
    let blankInputCount = 0, errorCount = 0;
    allInputs.forEach(input => {
        debugger
        if(input.value == ''){
            input.classList.add('input__error');
            if(input.parentElement.classList.contains('expiry__date__inputs')){
                expDateErrorMsg.classList.remove('dsp__hidden');

            }else{
                input.nextElementSibling.classList.remove('dsp__hidden');
            }
            blankInputCount++;
        }
    });
    allerror.forEach(span => {
        span.classList.contains('dsp__hidden') ? errorCount++ : errorCount;
    })

    return blankInputCount == 0 && errorCount == 4;
}

// console.log(isAllDataValid());

const handleSubmit = (e) =>{
    debugger
    if(isAllDataValid()){
        thankyouCard.classList.remove('dsp__none');
        cardDetailForm.classList.add('dsp__none')
    }else{
        thankyouCard.classList.add('dsp__none');
        cardDetailForm.classList.remove('dsp__none')
    }
    e.preventDefault();
}

fullNameInput.addEventListener('input', handleInput);
cardNumberInput.addEventListener('input', handleInput);
expDateInputs.forEach(input => input.addEventListener('input', handleInput));
cvcInput.addEventListener('input', handleInput)
confirmBtn.addEventListener('click', handleSubmit);