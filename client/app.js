
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
  // e.preventDefault();
  const file = $('.file-upload')[0].files[0];
  const formData = new FormData();

  formData.append('file', file);

  $.ajax({
    url: '/csvParser/uploadCsv',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: (data) => {
      console.log(data);
    }
  });

}

