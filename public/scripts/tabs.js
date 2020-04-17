let tabItemLink = document.querySelectorAll('.tab-item-link')

tabItemLink.forEach(tabLink =>{
  let currentLocation = window.location.href;
  var anchor  = tabLink.getAttribute('href');
  if(currentLocation.includes(anchor)){
    tabLink.parentNode.classList.add('active');
  }
})
