//Make connection
// const socket = io.connect("http://localhost:5000/");


const title = document.querySelectorAll('.card-title')
const details = document.querySelectorAll('.card-details')
const deleteBtn = document.querySelectorAll('.delete-btn');
const editBtn = document.querySelectorAll('.edit-btn');
const submit = document.querySelector('.submit-btn');
// const upload = document.querySelector('.upload-btn');
const cardTitle = document.querySelectorAll('.i-card-title');
const cardDetails = document.querySelectorAll('.i-card-details');
const cardImage = document.querySelectorAll('.card-image');
const oCardTitle = document.querySelectorAll('.o-card-title');
const oCardDetails = document.querySelectorAll('.o-card-details');

cardImage.forEach((img)=>{
  // console.log(img.getAttribute('src'));
  const imgSrc = img.getAttribute('src');
  var filename = imgSrc.replace(/^.*[\\\/]/, '')
  // console.log(filename);
});

// submit.addEventListener('click',() =>{
//   // console.log(submit.parentNode.parentNode.childNodes[5].lastElementChild.value);
//   // console.log(submit.parentNode.parentNode.childNodes[7].lastElementChild);
//   let cardTitle = submit.parentNode.parentNode.childNodes[5].lastElementChild.value;
//   // let facilityCardDetails = submit.parentNode.parentNode.childNodes[7].lastElementChild.value;
//   let cardDetails = document.getElementById('exampleTextarea').value;
//   let cardFile = submit.parentNode.parentNode.childNodes[3].lastElementChild.value;
//   // console.log(submit.parentNode.parentNode.childNodes[3].lastElementChild.value);
//
//   socket.emit('CardValues', {
//     cardTitle:cardTitle,
//     cardDetails:cardDetails,
//     cardFile:cardFile,
//     href:window.location.href,
//   });
//
//
// });

// submit.addEventListener('click',() =>{
//   // console.log(submit.parentNode.parentNode.childNodes[5].lastElementChild.value);
//   // console.log(submit.parentNode.parentNode.childNodes[7].lastElementChild);
//   let cardTitle = submit.parentNode.parentNode.childNodes[5].lastElementChild.value;
//   // let facilityCardDetails = submit.parentNode.parentNode.childNodes[7].lastElementChild.value;
//   let cardDetails = document.getElementById('exampleTextarea').value;
//   let cardFile = submit.parentNode.parentNode.childNodes[3].lastElementChild.value;
//   // console.log(submit.parentNode.parentNode.childNodes[3].lastElementChild.value);
//
//   socket.emit('CardValues', {
//     cardTitle:cardTitle,
//     cardDetails:cardDetails,
//     cardFile:cardFile,
//     href:window.location.href,
//   });
//
//
// });

submit.addEventListener('click',() =>{
  let uploadCardImagePath = document.getElementById('uploadCardImage').value;
  let uploadCardImageName = uploadCardImagePath.replace(/^.*[\\\/]/, '')
    socket.emit('ImageName', {
      uploadCardImageName:uploadCardImageName,
    });

  // if(uploadCardImageName === ""){
  //   alert('err: No image added yet!!');
  //   console.log('err: No image added yet!!');
  // }
  // else{
  //
  //   document.getElementById('cardDetailsUploadForm').submit();
  //   upload.click();
  // }

	});

  // upload.addEventListener('click',() =>{
  //   document.getElementById('cardImageUploadForm').submit();
  // 	});



// Listen for socket data in edit events
// socket.on('CardItems',(data) =>{
//
//   cardImage.forEach((img, i) => {
//     // console.log(img.parentNode.childNodes[3].firstElementChild.innerHTML);
//     // console.log(img.parentNode.childNodes[3].lastElementChild.innerHTML);
//     const imgSrc = img.getAttribute('src');
//     let filename = imgSrc.replace(/^.*[\\\/]/, '');
//     data.forEach((item, i) => {
//       // if(item.image === filename){
//       //   console.log(img);
//       // }
//
//
//         const tempimg = item.image;
//         var itemImage = tempimg.replace(/^.*[\\\/]/, '')
//         // console.log(filename);
//         if(itemImage === filename){
//           // console.log(itemImage);
//           img.parentNode.childNodes[3].firstElementChild.innerHTML = item.title;
//           img.parentNode.childNodes[3].lastElementChild.innerHTML = item.details;
//         }
//
//     });
//
//   });
// });



deleteBtn.forEach((item, i) => {
  item.addEventListener('click',()=>{
    let imgSrc = item.parentNode.parentNode.firstElementChild.getAttribute('src');
    socket.emit('deleteCardData',imgSrc);
  });
});

socket.on('reloadPage',(data)=>{
  if(data === 'reload'){
    location.reload();
  }
});


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
  // modalDetails.innerHTML = data.details;
  $('#myModal').modal('toggle');
});
