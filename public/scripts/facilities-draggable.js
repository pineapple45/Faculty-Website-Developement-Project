//Make connection
// const socket = io.connect("http://localhost:5000/");


const title = document.querySelectorAll('.card-title')
const details = document.querySelectorAll('.card-details')
const deleteBtn = document.querySelectorAll('.delete-btn');
const editBtn = document.querySelectorAll('.edit-btn');
const submit = document.querySelector('.submit-btn');
const cardTitle = document.querySelectorAll('.i-card-title');
const cardDetails = document.querySelectorAll('.i-card-details');
const cardImage = document.querySelectorAll('.card-image');
const oCardTitle = document.querySelectorAll('.o-card-title');
const oCardDetails = document.querySelectorAll('.o-card-details');

cardImage.forEach((img)=>{
  const imgSrc = img.getAttribute('src');
  var filename = imgSrc.replace(/^.*[\\\/]/, '')
});

submit.addEventListener('click',() =>{
  let uploadCardImagePath = document.getElementById('uploadCardImage').value;
  let uploadCardImageName = uploadCardImagePath.replace(/^.*[\\\/]/, '')
    socket.emit('ImageName', {
      uploadCardImageName:uploadCardImageName,
    });
	});


deleteBtn.forEach((item, i) => {
  item.addEventListener('click',()=>{
    let imgSrc = item.parentNode.parentNode.firstElementChild.getAttribute('src');
    socket.emit('deleteCardData',imgSrc);
  });
});

// socket.on('reloadPage',(data)=>{
//   if(data === 'reload'){
//     location.reload();
//   }
// });


editBtn.forEach((item, i) => {
  item.addEventListener('click',()=>{
    let imgSrc = item.parentNode.parentNode.firstElementChild.getAttribute('src');
    socket.emit('cardEditData',imgSrc);
  });
});



// Listen for socket data in edit events
socket.on('editCardItem',(data) =>{
  const modalTitle = document.querySelector('.modal-Title');
  const modalDetails = document.querySelector('.modal-details');

  modalTitle.setAttribute("value",data.title);
  $('.card-modal-details').summernote('code', data.details);
  $('#myModal').modal('toggle');
});
