if(TIMES==""){
const JOIN_DATE = Date.now();
const aaa = JOIN_DATE-START_DATE;
console.log(START_DATE);console.log("111111");
var ms_time = 2*60*1000;
var remaining_ms_time = ms_time-aaa;
var remaining_s_time = remaining_ms_time/60000;
const startimeMinutes = remaining_s_time;
    let time =startimeMinutes * 60;
    const countdownEl = document.getElementById('countdown');
    function updateCountdown(){
       const minutes = Math.floor(time / 60);
       let seconds = (time % 60).toFixed(0);
       if (seconds < 10) {
            seconds = "0" + seconds; 
        }
       countdownEl.innerHTML = minutes + ":" + seconds;
       if (time <= 0) {
           clearInterval(abc);
        } else {    
          time--;
        }             
    }
    var abc = setInterval(updateCountdown,1000);
  
var b = remaining_ms_time;
$(document).ready(function(){
  "<form id='userForm' ><input type='submit' name='submit'></form>"
  $('#form1').submit(ajax);
})
function ajax(){
$.ajax({
  url : window.location + "/delete",
  method:'delete',
  dataType:'json',
  success:function(res,status,xhr){
    if(res){
       window.location.href= res.msgg;
    }else{
        alert('data not get deleted');
    }
  },
  
});
return false;
}
window.onload=function(){
  setInterval(ajax,b);
}



$( document ).ready(function() {
  "<form id='form1' ><input type='submit' name='submit'></form>"
  $('#form1').submit(ajaxPost);
});
  function ajaxPost(){
    var formData = {
      class_name : idss,
    }
    $.ajax({
    type : "POST",
    contentType : "application/json",
    url : window.location + "/post",
    data : JSON.stringify(formData),
    dataType : 'json',
    success : function(result, status, xhr) {  
      if(result){
        location.reload();
      } 
    },
    error : function(e) {
      console.log('data error...............');
    }
  })
return false;
  } 

  window.onload=function(){
    setInterval(ajaxPost,500000);
  }


}