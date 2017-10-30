const hookupCustomFileWidget = () => {
  const $el = $('body.pinax-documents .custom-file').find('input[type=file]');
//   <label class="custom-file">
//   <input type="file" id="file2" class="custom-file-input">
//   <span class="custom-file-control"></span>
// </label>
  $el.change(e => {
    const files = e.currentTarget.files;
    $el.parent().find('.custom-file-control')
      .attr('data-file', files.length === 1 ? files[0].name : '')
      .attr('data-files', files.length);
  });
}

export default hookupCustomFileWidget;
