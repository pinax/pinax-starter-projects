/* global window */
window.jQuery = window.$ = require('jquery');

const $ = window.$;

require('bootstrap');

const Card = require('./card');

$(() => {
    if ($('form.with-card').length === 1) {
        window.card = new Card({
            form: 'form.with-card',
            container: '.card-wrapper',
            formSelectors: {
                numberInput: 'input[data-stripe="number"]',
                expiryInput: 'input.card-exp-month, input.card-exp-year',
                cvcInput: 'input.card-cvc'
            },
            debug: true
        });
    }
});
