/* global window document */
window.jQuery = window.$ = require('jquery');

const $ = window.$;

window.Popper = require('popper.js');
require('bootstrap');
require('blueimp-file-upload');

const fileupload = () => {
    $('.fileupload').each(() => {
        const $that = $(this);
        const $dropzone = $that.closest('.dropzone');
        const $progress = $dropzone.find('.progress');
        $that.fileupload({
            dropZone: $dropzone,
            dataType: 'json',
            singleFileUploads: false,
            done: (e, data) => {
                const $textarea = $dropzone.find('textarea');
                const content = $textarea.val();
                let start = $textarea.prop('selectionStart');
                let end = $textarea.prop('selectionEnd');
                let markdown = '\n';

                if (start === end && start === 0) {
                    start = end = content.length;
                }
                for (let i = 0; i < data.result.uploads.length; i++) {
                    const downloadUrl = data.result.uploads[i].download_url;  // eslint-disable-line no-unused-vars
                    const filename = data.result.uploads[i].filename;  // eslint-disable-line no-unused-vars
                    markdown = '${markdown}{{${downloadUrl}|${filename}}}\n\n';
                }

                $textarea.val(content.substring(0, start) + markdown + content.substring(end, content.length));
                $progress.addClass('hide');
            },
            fail: () => {
                $dropzone.prepend('<div class="alert alert-danger">Upload attempt failed. Try again.</div>');
                $progress.addClass('hide');
            },
            start: () => {
                $progress.removeClass('hide');
            },
            progressall: (e, data) => {
                const progress = parseInt(data.loaded / data.total * 100, 10);  // eslint-disable-line no-unused-vars
                $progress.find('.progress-bar').css('width', '${progress}%');
            }
        });
    });
};

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

    $(document).on('click', '.file-browse', e => {
        e.preventDefault();
        $('.fileupload').click();
    });
    $(document).bind('drop dragover', e => {
        e.preventDefault();
    });
    $(document).bind('dragover', e => {
        const dropZone = $('.dropzone');
        let foundDropzone = null;
        const timeout = window.dropZoneTimeout;
        if (timeout) {
            clearTimeout(timeout);
        }
        else {
            dropZone.addClass('in');
        }
        let found = false;
        let node = e.target;

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

        window.dropZoneTimeout = setTimeout(() => {
            window.dropZoneTimeout = null;
            dropZone.removeClass('in hover');
            $('body').removeClass('hovering');
        }, 100);
    });
    fileupload();
});
