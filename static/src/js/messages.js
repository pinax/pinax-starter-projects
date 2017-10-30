const handleMessageDismiss = () => {
  $('.message button[data-dismiss="message"]').click(e => {
    $(e.currentTarget).closest('.message').remove();
  });
};

export default handleMessageDismiss;
