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
    $("#answerDiv").append("<input type='text' name='option" + count + "' class='form-control' id='option" + count + "' placeholder='Option " + count + "' required>");
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

  $('#cancel').click(function() {
    console.log("In back function");
    $(location).attr('href', '/');
  });

  var resultData = {};
  $('#result').click(function() {
    console.log("In result function");
    var pollId = document.getElementById('pollId');
    console.log("Poll id is:" + pollId);
    $(location).attr('href', '/polls/pollresult/'+pollId.value);
  });
  var resultData = document.getElementById("resultData").value;

  resultData = JSON.parse(resultData);
  console.log("resultData:" + resultData);
  console.log("resultData:" + resultData.question);
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {
    'packages': ['corechart']
  });

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Option');
    data.addColumn('number', 'Votes');
    var totalVoteCount = 0;
    for(var i=0;i<resultData.options.length;i++) {
      data.addRow([resultData.options[i].option, resultData.options[i].count]);
      totalVoteCount = totalVoteCount+resultData.options[i].count;
    }
    if(totalVoteCount == 0){
      var options = {
        'title': 'This Question has yet to get Vote!',
        'width': 700,
        'height': 600
      };
    } else {
      // Set chart options
      var options = {
        'title': resultData.question,
        'width': 700,
        'height': 600
      };
    }

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

});
function showPollDetail(obj){
  console.log('hi');
  //console.log(obj);
  obj = JSON.parse(obj);
  document.getElementById('question').innerHTML = obj.question;
  document.getElementById("pollDetail").innerHTML = "";
  for(var i=0;i<obj.options.length;i++) {
    document.getElementById("pollDetail").innerHTML += "Option "+(i+1)+" : "+obj.options[i].option;
    document.getElementById("pollDetail").innerHTML += "<br>";
  }
  $('#myPollModal').modal({
    show: 'false'
  });
  // $('#myModal').modal({
  //   show: 'false'
  // });
}
