$( document ).ready(function() {
  
    $("#userForm").submit(function(event) {
    event.preventDefault();
    ajaxPost();
  });
    function ajaxPost(){
      var formData = {
        class_name : $("#class_name").val(),
      }
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : window.location + "/post",
      data : JSON.stringify(formData),
      dataType : 'json',
      success : function(result, status, xhr) {  
        $("#postResultDiv").html("<p>"+result.redirect+"</p>"); 
      },
      error : function(e) {
        $("#postResultDiv").html("<p>" + "Post Already Exist On MongoDB Database! <br>" +"</p>"); 
      }
    })
      resetData();
    }
    function resetData(){
        $("#class_name").val("");
      } 
})

$(document).ready(function(){
 getdata();
 function getdata(){
    $.ajax({
     type : "GET",
     url : "/totalAdminClass/get",
     dataType:'json',
     success:function(response){
      if(response.msg=='success'){
          if(response.data==undefined || response.data==null || response.data==''){
              $('.tblData').hide();
          }else{
             $('.tblData').show();
          $.each(response.data,function(index,data){
              var url = url+data._id;
              index+=1;
             var cls =data.class_name;
                $('tbody').append("<tr class='taskrow'><td>"+ index +"</td><td>"+data.class_name+"</td><td><button class=' btn btn-danger' data-toggle='modal' data-target='#"+data.class_name+"'>"+data.class_name+"</button>"+"</td></tr>");
                $('#abcde').append("<div class='modal fade' id="+data.class_name+" role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button> <h4 class='modal-title'>abc</h4></div><div class='modal-body'>abc</div><div class='modal-footer'><button class='del btn btn-danger'  value='"+data._id+"'>"+data.class_name+"</button></div></div></div></div>");
          });
      }
    }
 },
        error:function(response){
            alert('server error');
        }
    });
}
/*----------------------------------------------------------------------------*/
$(document).on('click','button.del',function(){
var id = $(this).parent().find('button.del').val();
$.ajax({
    url:'/totalAdminClass/delete',
    method:'delete',
    dataType:'json',
    data:{'id':id},
    success:function(response){
      if(response.msg=='success'){
          location.reload();
      }else{
          alert('data not get deleted');
      }
  },
    error:function(response){
             alert('server error')   
    }
});
});



});