$(function() {
  let SubmitButton = $("#Submit-button");
  let ImageForm = $("#ImageForm");
  SubmitButton.click(function(e) {
    $.fn.serializefiles = function() {
      var obj = $(this);

      var form_data = new FormData(this[0]);
      $.each($(obj).find('input[type="file[]"]'), function(i, tag) {
        $.each($(tag)[0].files, function(i, file) {
          form_data.append(tag.name, file);
        });
      });

      var params = $(obj).serializeArray();
      $.each(params, function(i, val) {
        form_data.append(val.name, val.value);
      });

      return form_data;
    };

    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/upload",
      data: ImageForm.serializefiles(),
      processData: false,
      contentType: false,
      success: function(Hash) {
        getUploadedfile(Hash);
      },
      error: function(Error) {
        console.log("some error", Error);
      }
    });
  });
});

function getUploadedfile(Hash) {
  let url = `https://ipfs.infura.io/ipfs/${Hash}`;
  document.getElementById("url").innerHTML = url;
  document.getElementById("url").href = url;
  document.getElementById("output").src = url;
  document.getElementById("Submit-button").value = "Update this image";
}

$(function() {
  $.get("/api/getUploadedfile", Hash => {
    if (Hash) {
      let url = `https://ipfs.infura.io/ipfs/${Hash}`;
      document.getElementById("url").innerHTML = url;
      document.getElementById("url").href = url;
      document.getElementById("output").src = url;
      document.getElementById("Submit-button").value = "Update this image";
    }
  });
});
