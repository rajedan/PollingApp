var count = 2;
$(document).ready(function() {
  $("#addBtn").click(function() {
    if (count >= 5) {
      //alert('You exceeded the maximum number of options');
      document.getElementById('errorMsg').innerHTML = 'You exceeded the maximum number of options';
      $('#myModal').modal({
        show: 'false'
      });
      return;
    }
    count++;
    console.log("In add, count is : " + count);
    $("#answerDiv").append("<input type='text' name='option"+count+"' class='form-control' id='option" + count + "' placeholder='Option " + count + "' required>");
  });

  $("#removeBtn").click(function() {
    console.log("In remove, count is : " + count);
    if (count <= 2) {
      //alert('You exceeded the minimum number of options');
      document.getElementById('errorMsg').innerHTML = 'You exceeded the minimum number of options';
      $('#myModal').modal({
        show: 'false'
      });
      return;
    }
    $("#option" + count).remove();
    count--;
  });

  // $("#submitSurvey").click(function(){
  //   //alert('cout is : '+count);
  // });

  function showModal(msg) {
    console.log("showing modal now : " + msg);
    $("#myModal").append("<div class='modal fade bd-example-modal-sm' tabindex='-1' role='dialog'aria-labelledby='mySmallModalLabel' aria-hidden='false'><div class='modal-dialog modal-sm'><div class='modal-content'>" + msg + "</div></div></div>");
  }
});
