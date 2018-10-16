/* global $ */
import '../scss/index.scss';

import ajaxSendMethod from './ajax';
import handleMessageDismiss from './messages';
import loadStripeElements from './apps/pinax-stripe';

require('bootstrap/dist/js/bootstrap.bundle');

$(() => {
  $(document).ajaxSend(ajaxSendMethod);

  // Topbar active tab support
  $('.topbar li').removeClass('active');

  const classList = $('body').attr('class').split(/\s+/);
  $.each(classList, (index, item) => {
    const selector = `ul.nav li#tab_${item}`;
    $(selector).addClass('active');
  });

  $('#account_logout, .account_logout').click((e) => {
    e.preventDefault();
    $('#accountLogOutForm').submit();
  });

  handleMessageDismiss();
  loadStripeElements();
});
