$(document).ready(function(){
  getdata();
  function getdata(){
     $.ajax({
      type : "GET",
      url : "/get",
      dataType:'json',
      success:function(response){
        if(response.msg=='success'){
          var  student_id = response.student_id;
          var  student_name = response.student_name;
/************************************************************************************************************/
// show loading state
const loading = document.createElement("div");
const spin = document.createElement("div");
loading.setAttribute("class", "d-flex loading");
spin.classList.add("loading_spinner");

loading.appendChild(spin);
document.body.appendChild(loading);

const socket = io("/");
const peer = new Peer(student_id, {
  secure: true,
  host: "spanion-video-chat-peer.herokuapp.com",
});

const peers = {};
const newVideoGrid = document.getElementById("newVideoGrid");
const hostVideoGrid = document.getElementById("hostVideoGrid");
const joinVideoGrid = document.getElementById("joinVideoGrid");
const conVideoGrid = document.getElementById("conVideoGrid");
const videoText = document.createElement("div");
const videoItem = document.createElement("div");
videoItem.classList.add("video__item");
videoText.classList.add("video__name");
videoItem.append(videoText);

const mediaConfig = {
  video: true,
  audio: true,
};

peer.on("open", (id) => {
  if (loading) loading.remove();
  socket.emit("join-room", ROOM_ID, { id, name: student_name });
  navigator.mediaDevices
    .getUserMedia(mediaConfig)
    .then((stream) => {
    if(ROOMH_ID){
      const newVideo = document.createElement("video");
      newVideo.muted = true;
      newVideo.style.width = "25%";
      newVideoStream(newVideo, stream, id,student_name);
    }else{
      const hostVideo = document.createElement("video");
      hostVideo.muted = true;
      hostVideo.style.width = "100%";
      hostVideo.style.height = "65vh";
      hostVideo.style.background = "#000";
      hostVideo.controls = true;
      hostVideoStream(hostVideo, stream, id,student_name);
    }
    
    peer.on("call", (call) => { 
      call.answer(stream);
      const joinVideo = document.createElement("video");
      joinVideo.style.width = "100%";
      joinVideo.style.height = "75vh";
      joinVideo.style.background = "#000";
      joinVideo.controls = true;
      if(ROOMH_ID){
        call.on("stream", (userStream) => {
          const userId = call.peer;
          const userName = call.metadata.name;
          if(userId==ROOMH_ID){
            joinHostVideoStream(joinVideo, userStream,userId,userName);
          }
        });
      }
    });
    if(ROOMH_ID==!id){
      socket.on("user-connected", ({ id, name }) => {
        connectToNewUser({ id, name }, stream);
      });
    }
  })

  .catch((err) => {
    document.write(err);
  });
});

socket.on("user-disconnected", ({ id }) => {
  const video = document.getElementById(id);
  if (video) {
    video.parentElement.remove();
  }
  if (peers[id]) peers[id].close();
});

function connectToNewUser({ id, name }, stream) {
  const call = peer.call(id, stream, { metadata: { name: student_name } });
  const conNewVideo = document.createElement("video");
  conNewVideo.style.width = "50%";
  conNewVideo.style.height = "30vh";
  conNewVideo.style.background = "#000";
  //conNewVideo.style.border = "1px solid rgb(12, 36, 143)";
  conNewVideo.controls = true;
      call.on("stream", (userStream) => {
        conNewVideoStream(conNewVideo, userStream, id, name);
      });
  call.on("close", () => {
    conNewVideo.remove();
  });
  peers[id] = call;
}

if(ROOMH_ID){
  function newVideoStream(newVideo, stream, id, name) {
    newVideo.srcObject = stream;
    newVideo.addEventListener("loadedmetadata", () => {
      newVideo.play();
    });
    newVideo.setAttribute("id", id);
    const clonedItem = videoItem.cloneNode(true);
    clonedItem.children[0].innerHTML = name;
    clonedItem.append(newVideo);
    newVideoGrid.append(clonedItem);
    // weird error cleanup
    const nodes = document.querySelectorAll(".video__item") || [];
    nodes.forEach((node) => {
      if (node.children && node.children.length < 2) {
        node.remove();
      }
    });
  }
}else{
  function hostVideoStream(hostVideo, stream, id, name) {
    hostVideo.srcObject = stream;
    hostVideo.addEventListener("loadedmetadata", () => {
      hostVideo.play();
    });
    hostVideo.setAttribute("id", id);
    const clonedItem = videoItem.cloneNode(true);
    clonedItem.children[0].innerHTML = name;
    clonedItem.append(hostVideo);
    hostVideoGrid.append(clonedItem);
    // weird error cleanup
    const nodes = document.querySelectorAll(".video__item") || [];
    nodes.forEach((node) => {
      if (node.children && node.children.length < 2) {
        node.remove();
      }
    });   
  }
}
function joinHostVideoStream(joinVideo, stream,id, name) {
  joinVideo.srcObject = stream;
  joinVideo.addEventListener("loadedmetadata", () => {
    joinVideo.play();
  });
  joinVideo.setAttribute("id", id);
  const clonedItem = videoItem.cloneNode(true);
  clonedItem.children[0].innerHTML = name;
  clonedItem.append(joinVideo);
  joinVideoGrid.append(clonedItem);
  // weird error cleanup
  const nodes = document.querySelectorAll(".video__item") || [];
  nodes.forEach((node) => {
    if (node.children && node.children.length < 2) {
      node.remove();
    }
  });
}

function conNewVideoStream(conNewVideo, stream,id, name) {
  conNewVideo.srcObject = stream;
  conNewVideo.addEventListener("loadedmetadata", () => {
    conNewVideo.play();
  });
  conNewVideo.setAttribute("id", id);
  const clonedItem = videoItem.cloneNode(true);
  clonedItem.children[0].innerHTML = name;
  clonedItem.append(conNewVideo);
  conVideoGrid.append(clonedItem);
  // weird error cleanup
  const nodes = document.querySelectorAll(".video__item") || [];
  nodes.forEach((node) => {
    if (node.children && node.children.length < 2) {
      node.remove();
    }
  });
}

/************************************************************************************************************/
  
      }
   },
          error:function(response){
              alert('server error');
          }
      });
    
  } 
});
