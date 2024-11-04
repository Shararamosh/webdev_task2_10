$("#navigation").load("navigation.html");
$("#footer").load("footer.html");
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  console.log(elems)
  M.Sidenav.init(elems);
  console.log(document.getElementById("send_message_btn"));
  console.log(document.getElementById("copyright_footer"));
});