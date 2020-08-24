const sortingByNewest = document.getElementById('sorting-by-newest');
const sortingByOldest = document.getElementById('sorting-by-oldest');
let timestamps = document.querySelectorAll('#timestamp');
const imageCardsContainer = document.getElementById('image-cards-container');
const allPostsContainer = document.getElementById('all-posts-container');

sortingByNewest.addEventListener('click',() =>{

    let childElementsArray = Array.from(timestamps).sort((a,b) => {
        return b.innerHTML - a.innerHTML;
    }).map((data) =>{
        if(data.parentElement.parentElement.tagName == 'FORM'){
            return data.parentElement.parentElement;
        }
        else{
            return data.parentElement;
        }
    })

    if(imageCardsContainer){
        while(imageCardsContainer.firstChild){
            imageCardsContainer.removeChild(imageCardsContainer.firstChild);
        }
        imageCardsContainer.append(...childElementsArray);

    }

    if(allPostsContainer){
        while(allPostsContainer.firstChild){
            allPostsContainer.removeChild(allPostsContainer.firstChild);
        }
    
        allPostsContainer.append(...childElementsArray);
    }
    //OR

    // childElementsArray.forEach(ch => {
    //     imageCardsContainer.append(ch)
    // })

})

sortingByOldest.addEventListener('click',() =>{

    let childElementsArray = Array.from(timestamps).sort((a,b) => {
        return a.innerHTML - b.innerHTML;
    }).map((data) =>{
        if(data.parentElement.parentElement.tagName == 'FORM'){
            return data.parentElement.parentElement;
        }
        else{
            return data.parentElement;
        }
    })

    if(imageCardsContainer){
        while(imageCardsContainer.firstChild){
            imageCardsContainer.removeChild(imageCardsContainer.firstChild);
        }
        imageCardsContainer.append(...childElementsArray);

    }

    if(allPostsContainer){
        while(allPostsContainer.firstChild){
            allPostsContainer.removeChild(allPostsContainer.firstChild);
        }
    
        allPostsContainer.append(...childElementsArray);
    }
    //OR

    // childElementsArray.forEach(ch => {
    //     imageCardsContainer.append(ch)
    // })

})