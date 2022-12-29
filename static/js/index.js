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

$('body').on({
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
    var x = e.clientX,
      y = e.clientY;
    $('#details-box').css({ top: (y + 20) + 'px', left: (x) + 'px' });
  },

  mouseup: (e) => {
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