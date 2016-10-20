'use strict';

/* global window document */
window.jQuery = window.$ = require('jquery');

var $ = window.$;

require('bootstrap');

require('blueimp-file-upload');
require('eldarion-ajax');
require('select2');

var fileupload = function fileupload() {
    $('.fileupload').each(function () {
        var $that = $(undefined);
        var $dropzone = $that.closest('.dropzone');
        var $progress = $dropzone.find('.progress');
        $that.fileupload({
            dropZone: $dropzone,
            dataType: 'json',
            singleFileUploads: false,
            done: function done(e, data) {
                var $textarea = $dropzone.find('textarea');
                var content = $textarea.val();
                var start = $textarea.prop('selectionStart');
                var end = $textarea.prop('selectionEnd');
                var markdown = '\n';

                if (start === end && start === 0) {
                    start = end = content.length;
                }
                for (var i = 0; i < data.result.uploads.length; i++) {
                    var downloadUrl = data.result.uploads[i].download_url; // eslint-disable-line no-unused-vars
                    var filename = data.result.uploads[i].filename; // eslint-disable-line no-unused-vars
                    markdown = '${markdown}{{${downloadUrl}|${filename}}}\n\n';
                }

                $textarea.val(content.substring(0, start) + markdown + content.substring(end, content.length));
                $progress.addClass('hide');
            },
            fail: function fail() {
                $dropzone.prepend('<div class="alert alert-danger">Upload attempt failed. Try again.</div>');
                $progress.addClass('hide');
            },
            start: function start() {
                $progress.removeClass('hide');
            },
            progressall: function progressall(e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10); // eslint-disable-line no-unused-vars
                $progress.find('.progress-bar').css('width', '${progress}%');
            }
        });
    });
};

var loadSelect2 = function loadSelect2() {
    $('[data-autocomplete-url]').each(function (i, e) {
        var $el = $(e);
        $el.select2({
            ajax: {
                url: $el.data('autocomplete-url'),
                dataType: 'json',
                type: 'GET',
                data: function data(term) {
                    return { query: term };
                },
                results: function results(data) {
                    return { results: data };
                }
            },
            id: function id(obj) {
                return obj.email;
            },
            formatSelection: function formatSelection(obj) {
                if (obj.pk < 0) {
                    return obj.email;
                }
                return obj.email;
            },
            formatResult: function formatResult(obj) {
                if (obj.pk < 0) {
                    return '<div class="result new">${obj.email}</div>';
                }
                return '<div class="result clearfix">${obj.name}&lt;${obj.email}&gt;</div>';
            },
            minimumInputLength: 1,
            width: 'element',
            createSearchChoice: function createSearchChoice(term, data) {
                if ($(data).filter(function () {
                    return undefined.email === term;
                }).length === 0) {
                    return { pk: -1, email: term };
                }
            }
        });
    });
};
var loadImage = function loadImage(evt) {
    var input = evt.currentTarget;
    if (input.files && input.files[0]) {
        // var reader = new FileReader();
        // reader.onload = function(e) {
        //     $('#preview')
        //         .attr('src', '')
        //         .attr('style', '')
        //         .hide();
        //     $('#preview')
        //         .attr('src', e.target.result)
        //         .css({width: Math.round})
        //         .fadeIn();
        // }
        // reader.readAsDataURL(input.files[0]);
        $('.selected-filename').text(input.files[0].name);
    }
};

$(function () {
    loadSelect2();
    $(document).on('eldarion-ajax:complete', function (evt, el) {
        if ($(el).hasClass('invite-form')) {
            loadSelect2();
        }
    });
    $(document).on('click', '.file-browse', function (e) {
        e.preventDefault();
        $('.fileupload').click();
    });
    $(document).bind('drop dragover', function (e) {
        e.preventDefault();
    });
    $(document).bind('dragover', function (e) {
        var dropZone = $('.dropzone');
        var foundDropzone = null;
        var timeout = window.dropZoneTimeout;
        if (timeout) {
            clearTimeout(timeout);
        } else {
            dropZone.addClass('in');
        }
        var found = false;
        var node = e.target;

        do {
            if ($(node).hasClass('dropzone')) {
                found = true;
                foundDropzone = $(node);
                break;
            }
            node = node.parentNode;
        } while (node !== null);

        dropZone.removeClass('in hover');

        if (found) {
            foundDropzone.addClass('hover');
            $('body').removeClass('hovering');
        } else {
            $('body').addClass('hovering');
        }

        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZone.removeClass('in hover');
            $('body').removeClass('hovering');
        }, 100);
    });
    fileupload();
    $('#id_avatar').change(loadImage);
});