
function openUploadModal() {
  $('#uploadModal').modal('show');
}

function chooseUploadFile() {
  $('.file-upload').click();
}

$('.file-upload').change(() => {
  const file = $('.file-upload')[0].files[0];
  $('.selected-file').text(file.name);
});

function onUploadCsvFile(e) {
  const file = $('.file-upload')[0].files[0];
  const form  = new FormData();

  form.append('file', file);
  // form.submit('/api/uploadCsv', (err, res) => {
  //   // res – response object (http.IncomingMessage)  //
  //   console.log(err, res);
  // });

  $.ajax({
    url: '/api/uploadCsv',
    type: 'POST',
    data: form,
    processData: false,
    contentType: false,
    success: (data) => {
      console.log(data);
    }
  });

}

