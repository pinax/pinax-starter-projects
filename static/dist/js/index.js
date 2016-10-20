'use strict';

/* global window document */
window.jQuery = window.$ = require('jquery');

var $ = window.$;

require('bootstrap');
require('blueimp-file-upload');

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

$(function () {
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
});