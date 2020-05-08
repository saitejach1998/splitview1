
const { remote } = require('electron')

window1 = remote.getCurrentWindow();

$(document).ready(function () {
  //your code here
  $('.xop-left').click(function(){
  window1.loadURL('file://' + __dirname +  '/../html/static-entry.html');

  console.log('clicked');
  })

  $('.xop-right').click(function(){



  })

});
