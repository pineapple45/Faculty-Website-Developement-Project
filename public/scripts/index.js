let editIcon = document.querySelectorAll('.edit-icon-gallery');
let deleteIcon = document.querySelectorAll('.delete-icon-gallery');
let dropdown = document.getElementById('list-holder');
let imagesContainer = document.querySelectorAll('.img-container');
let revertBtn = document.getElementById('revert-btn');

revertBtn.addEventListener('click',()=>{
    socket.emit('clear','removeClasses');
    location.reload();
})

//Aquire list items which will provide class names
let original = document.getElementById('#original');
let big = document.getElementById("#big");
let horizontal = document.getElementById("#horizontal");
let vertical = document.getElementById("#vertical");



editIcon.forEach(icon =>{
    icon.addEventListener('click',(event) =>{
        event.preventDefault();
        icon.parentNode.appendChild(dropdown);
        dropdown.classList.toggle('add');
    });
})

original.addEventListener("click",(e)=>{
    e.preventDefault();
    let parent = original.parentElement.parentElement;
    socket.emit('orignalClass',{
      parentId:parent.id,
      class:'original'
    })
    location.reload();
    })


big.addEventListener("click",(e)=>{
    e.preventDefault();
    let parent = big.parentElement.parentElement;
    socket.emit('bigClass',{
      parentId:parent.id,
      class:'big'
    })
    location.reload();
    })



horizontal.addEventListener("click",(e)=>{
    e.preventDefault();
    let parent = big.parentElement.parentElement;
    socket.emit('horizontalClass',{
      parentId:parent.id,
      class:'horizontal'
    })
    location.reload();

 })


vertical.addEventListener("click",(e)=>{
    e.preventDefault();
    let parent = big.parentElement.parentElement;
    socket.emit('verticalClass',{
      parentId:parent.id,
      class:'vertical'
    })
    location.reload();
})


socket.on('foundItems',(foundItems) =>{
  if(foundItems.length === 0){
    imagesContainer.forEach(imgContainer =>{
      imgContainer.setAttribute('Class','img-container');
    })
  }
  else{
    foundItems.forEach((item, i) => {
      imagesContainer.forEach(imgContainer =>{
         if(item.parentId === imgContainer.id){
           imgContainer.setAttribute('Class','img-container');
           imgContainer.classList.add(item.addedClass);
         }
      })
    });
  }
})

deleteIcon.forEach((icon, i) => {
  icon.addEventListener('click',(e) =>{
    e.preventDefault();
    socket.emit('deleteGalleryItems',{
      imageId:icon.parentNode.id,
      imageName:icon.previousElementSibling.previousElementSibling.name,
    })
  })
});
