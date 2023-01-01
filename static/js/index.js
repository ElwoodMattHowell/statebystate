states = {
  "MA": "Massachusetts",
  "MN": "Minnesota",
  "MT": "Montana",
  "ND": "North Dakota",
  "HI": "Hawaii",
  "ID": "Idaho",
  "WA": "Washington",
  "AZ": "Arizona",
  "CA": "California",
  "CO": "Colorado",
  "NV": "Nevada",
  "NM": "New Mexico",
  "OR": "Oregon",
  "UT": "Utah",
  "WY": "Wyoming",
  "AR": "Arkansas",
  "IA": "Iowa",
  "KS": "Kansas",
  "MO": "Missouri",
  "NE": "Nebraska",
  "OK": "Oklahoma",
  "SD": "South Dakota",
  "LA": "Louisiana",
  "TX": "Texas",
  "CT": "Connecticut",
  "NH": "New Hampshire",
  "RI": "Rhode Island",
  "VT": "Vermont",
  "AL": "Alabama",
  "FL": "Florida",
  "GA": "Georgia",
  "MS": "Mississippi",
  "SC": "South Carolina",
  "IL": "Illinois",
  "IN": "Indiana",
  "KY": "Kentucky",
  "NC": "North Carolina",
  "OH": "Ohio",
  "TN": "Tennessee",
  "VA": "Virginia",
  "WI": "Wisconsin",
  "WV": "West Virginia",
  "DE": "Delaware",
  "DC": "District of Columbia",
  "MD": "Maryland",
  "NJ": "New Jersey",
  "NY": "New York",
  "PA": "Pennsylvania",
  "ME": "Maine",
  "MI": "Michigan",
  "AK": "Alaska"
}

$('#us-map').on({
  mouseover: (e) => {
    if (e.target.tagName == 'path') {
      const content = states[e.target.dataset.name];
      $("#details-box").html(content);
      $("#details-box").css({ opacity: 1 });
    }
    else {
      $("#details-box").css({ opacity: 0 });
    }
  },

  mousemove: (e) => {
    let x = e.clientX,
      y = e.clientY;
    $('#details-box').css({ top: (y + 20) + 'px', left: (x) + 'px' });
  },

  // mousedown: (e) => {
  //   let moving = true;
  //   let pos1 = e.clientX;
  //   let pos2 = e.clientY;

  //   $('#us-map').mousemove(() => {
  //     if (moving) {
  //       let pos3 = e.clientX - pos1;
  //       let pos4 = e.clientY - pos2;

  //       console.log(pos3, pos4);

  //       pos1 = pos3;
  //       pos2 = pos4;

  //       $('#us-map').css('transform', 'translate(-100px, -100px)');
  //     }

  //     $('#us-map').mouseup(() => {
  //       moving = false
  //     })

  //   });

  // $('#us-map').mouseup(() => closeDragElement);
  // $('#us-map').mousemove(() => elementDrag);

  // const elementDrag = (e) => {
  //   let pos1 = pos3 - e.clientX;
  //   let pos2 = pos4 - e.clientY;
  //   pos3 = e.clientX;
  //   pos4 = e.clientY;

  //   $('#us-map').css('top', ($('#map').offset().top - pos2) + "px");
  //   $('#us-map').css('left', ($('#map').offset().left - pos1) + "px");
  // }

  // const closeDragElement = () => {
  //   $('#us-map').mouseup = null;
  //   $('#us-map').mousemove = null;
  // }


  // },

  mouseup: (e) => {
    if (e.target.tagName == 'path') {
      $("#details-box").css({ opacity: 0 });
      const content = e.target.dataset.name;
      const year = $('#year').val()
      console.log(year);
      window.location.replace(`http://127.0.0.1:5000/modal?state=${content}&year=${year}`)
    }
  }
});

$(document).ready(function () {
  $("#details-box").css({ opacity: 0 });
  $("#exampleModalLong").modal("show")
})

$('.zoom-button').click((e) => {
  const scale = $("#us-map")[0].getBoundingClientRect().width / $("#us-map").width();
  console.log(scale)
  let dScale = 0.1;
  if (e.currentTarget.id == "out") dScale *= -1;
  if (scale == 0.1 && direction == "out") dScale = 0;
  $('#us-map').css('transform', `scale(${scale + dScale}`);
})

