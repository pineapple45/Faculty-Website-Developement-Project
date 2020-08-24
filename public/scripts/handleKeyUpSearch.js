const searchBar = document.getElementById('search');
const imageCards = document.querySelectorAll('.image-card');
const postsContainer = document.getElementsByClassName('posts-container');

searchBar.addEventListener('keyup',(e) =>{
    const term = e.target.value.toLowerCase();

    imageCards.forEach(imageCard => { 
        const title = imageCard.children[1].children[1].firstElementChild.innerHTML;
        let stylableElement;
        if(imageCard.parentElement.tagName == 'FORM')
        {
            stylableElement = imageCard.parentElement;
        }
        else{
            stylableElement = imageCard;
        }

        if(title.toLowerCase().indexOf(term) != -1){
            stylableElement.style.display = 'block';
        }
        else{
            stylableElement.style.display = 'none';
        }
    }) 

    Array.from(postsContainer).forEach(container => {
        const title = container.firstElementChild.firstElementChild.firstElementChild.innerHTML;
        const subject = container.firstElementChild.children[1].innerText;

        if(subject.toLowerCase().indexOf(term) != -1 || title.toLowerCase().indexOf(term) != -1){
            container.style.display = 'block';
        }
        else{
            container.style.display = 'none';
        }
    })

})