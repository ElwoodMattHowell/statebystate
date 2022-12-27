
$('body').on({
  mouseover: (e) => {
    if (e.target.tagName == 'path') {
      const content = e.target.dataset.name;
      $("#details-box").html(content);
      $("#details-box").css({ opacity: 1 });
    }
    else {
      $("#details-box").css({ opacity: 0 });
    }
  },

  mousemove: (e) => {
    var x = e.clientX,
      y = e.clientY;
    $('#details-box').css({ top: (y + 20) + 'px', left: (x) + 'px' });
  },

  click: (e) => {
    if (e.target.tagName == 'path') {
      $("#details-box").css({ opacity: 0 });
      const content = e.target.dataset.name;
      window.location.replace(`http://127.0.0.1:5000/modal?state=${content}`)
    }
  }
});

$(document).ready(function () {
  $("#details-box").css({ opacity: 0 });
  $("#exampleModalLong").modal("show")
})