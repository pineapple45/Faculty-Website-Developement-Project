// let images = document.querySelectorAll('.gallery-card-img');
// let imagesDetail = document.querySelectorAll('.gallery-card-details');
const nextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')
const slides = document.querySelectorAll('.slides')
const deleteGalleryCardForm = document.querySelector('#deleteGalleryCardForm');
const deleteCrossIcons = document.querySelectorAll('.cross-icon');
const galleryCardContainers = document.querySelectorAll('.gallery-card-containers')
const galleryImages = document.querySelectorAll('.gallery-images')

let startSlide = '';
galleryImages.forEach((galleryImage,i) => {
  galleryImage.addEventListener('click',()=>{
    startSlide = i;
    getCurrentSlide(i);
  })

})

nextBtn.addEventListener('click',() =>{
  plusSlide(1);
});

prevBtn.addEventListener('click',() =>{
  plusSlide(-1)
});

function getCurrentSlide(i){
  slides.forEach((slide,j) =>{
    if(i != j){
      slide.setAttribute('style','display:none');
    }
  })
  slides[i].setAttribute('style','display:block');
  $('#galleryModal').modal('toggle');
}



function plusSlide(i){
  startSlide = startSlide+i;
  slides.forEach((slide,j) =>{
    if(startSlide != j){
      slide.setAttribute('style','display:none');
    }
  })

  if(startSlide === slides.length){
    startSlide = 0;
  }
  else if(startSlide === -1){
    startSlide = slides.length-1;
  }

  slides[startSlide].setAttribute('style','display:block');
  $('#galleryModal').modal('show');
}
