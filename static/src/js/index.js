/* global window document */
window.jQuery = window.$ = require('jquery');

const $ = window.$;

require('bootstrap/dist/js/bootstrap.bundle');

import ajaxSendMethod from './ajax';
import handleMessageDismiss from './messages';
import loadStripeElements from './pinax-stripe';
import hookupCustomFileWidget from './pinax-documents';

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

    $('[data-show-menu]').click(e => {
        if ($('body').hasClass('show-menu')) {
            $($(e.currentTarget).data('show')).collapse('toggle');
        } else {
            $('body').toggleClass('show-menu');
            $($(e.currentTarget).data('show')).collapse('show');
        }
    });
    $('.btn-menu-toggle').click(() => {
        $('body').toggleClass('show-menu');
    });

    handleMessageDismiss();
    loadStripeElements();
    hookupCustomFileWidget();
});
