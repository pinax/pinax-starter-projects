/* global window document */
window.jQuery = window.$ = require('jquery');

const $ = window.$;

window.Popper = require('popper.js');
require('bootstrap');

const Card = require('./card');

import ajaxSendMethod from './ajax';

$(() => {
    $(document).ajaxSend(ajaxSendMethod);

    // Topbar active tab support
    $('.topbar li').removeClass('active');

    const classList = $('body').attr('class').split(/\s+/);
    $.each(classList, (index, item) => {
        const selector = `ul.nav li#tab_${item}`;
        $(selector).addClass('active');
    });

    $('#account_logout, .account_logout').click(e => {
        e.preventDefault();
        $('#accountLogOutForm').submit();
    });

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
