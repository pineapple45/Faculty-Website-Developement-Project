let editIcon = document.querySelectorAll('.edit-icon-gallery');
let deleteIcon = document.querySelectorAll('.delete-icon-gallery');
let dropdown = document.getElementById('list-holder');
let imagesContainer = document.querySelectorAll('.img-container');
let revertBtn = document.getElementById('revert-btn');


// var buttons = document.getElementsByTagName('button');
// for (let i = 0; i < buttons.length; i++) {
//     let button = buttons[i];
//     let type = button.getAttribute('type'); // Submit is the default
//     if(type === 'submit'){
//       button.addEventListener('click',() =>{
//        let html = "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>";
//        button.innerHTML = html;
//       })
//     }
// }

revertBtn.addEventListener('click',()=>{
    socket.emit('clear','removeClasses');
    // location.reload();
})

//Aquire list items which will provide class names
let original = document.getElementById('#original');
let big = document.getElementById("#big");
let horizontal = document.getElementById("#horizontal");
let vertical = document.getElementById("#vertical");

let large = document.getElementById('#large');
let horizontalLarge = document.getElementById('#horizontal-large');
let verticalLarge = document.getElementById('#vertical-large');
let space = document.getElementById('#space');
let spaceHorizontal = document.getElementById('#space-horizontal');
let spaceVertical = document.getElementById('#space-vertical');
let xl = document.getElementById('#xl');
let horizontalExtraLarge = document.getElementById('#horizontal-xl');
let verticalExtraLarge = document.getElementById('#vertical-xl');
let xxl = document.getElementById('#xxl');
let xxxl = document.getElementById('#xxxl');



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
    // location.reload();
})


big.addEventListener("click",(e)=>{
    e.preventDefault();
    let parent = big.parentElement.parentElement;
    socket.emit('bigClass',{
      parentId:parent.id,
      class:'big'
    })
    // location.reload();
})



horizontal.addEventListener("click",(e)=>{
    e.preventDefault();
    let parent = horizontal.parentElement.parentElement;
    socket.emit('horizontalClass',{
      parentId:parent.id,
      class:'horizontal'
    })
    // location.reload();
})


vertical.addEventListener("click",(e)=>{
    e.preventDefault();
    let parent = vertical.parentElement.parentElement;
    socket.emit('verticalClass',{
      parentId:parent.id,
      class:'vertical'
    })
    // location.reload();
})

large.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = large.parentElement.parentElement;
  socket.emit('largeClass',{
    parentId:parent.id,
    class:'large'
  })
  // location.reload();
})

horizontalLarge.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = horizontalLarge.parentElement.parentElement;
  socket.emit('horizontalLargeClass',{
    parentId:parent.id,
    class:'horizontalLarge'
  })
  // location.reload();
})

verticalLarge.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = verticalLarge.parentElement.parentElement;
  socket.emit('verticalLargeClass',{
    parentId:parent.id,
    class:'verticalLarge'
  })
  // location.reload();
})

space.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = space.parentElement.parentElement;
  socket.emit('spaceClass',{
    parentId:parent.id,
    class:'space'
  })
  // location.reload();
})

spaceHorizontal.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = spaceHorizontal.parentElement.parentElement;
  socket.emit('spaceHorizontalClass',{
    parentId:parent.id,
    class:'spaceHorizontal'
  })
  // location.reload();
})

spaceVertical.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = spaceVertical.parentElement.parentElement;
  socket.emit('spaceVerticalClass',{
    parentId:parent.id,
    class:'spaceVertical'
  })
  // location.reload();
})

xl.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = xl.parentElement.parentElement;
  socket.emit('xlClass',{
    parentId:parent.id,
    class:'xl'
  })
  // location.reload();
})

horizontalExtraLarge.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = horizontalExtraLarge.parentElement.parentElement;
  socket.emit('horizontalExtraLargeClass',{
    parentId:parent.id,
    class:'horizontalExtraLarge'
  })
  // location.reload();
})

verticalExtraLarge.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = verticalExtraLarge.parentElement.parentElement;
  socket.emit('verticalExtraLargeClass',{
    parentId:parent.id,
    class:'verticalExtraLarge'
  })
  // location.reload();
})

xxl.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = xxl.parentElement.parentElement;
  socket.emit('xxlClass',{
    parentId:parent.id,
    class:'xxl'
  })
  // location.reload();
})


xxxl.addEventListener("click",(e)=>{
  e.preventDefault();
  let parent = xxxl.parentElement.parentElement;
  socket.emit('xxxlClass',{
    parentId:parent.id,
    class:'xxxl'
  })
  // location.reload();
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
