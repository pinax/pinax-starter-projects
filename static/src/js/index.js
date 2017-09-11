/* global window */
window.jQuery = window.$ = require('jquery');

const $ = window.$;

window.Popper = require('popper.js');
require('bootstrap');
require('jquery-chosen/chosen.jquery.js');

$(() => {
    $('#id_participants').chosen();
});
