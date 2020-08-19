//Make connection
const socket = io.connect("http://localhost:5000/");

//Query DOM

const dragdivp = document.querySelectorAll('.dragdiv-p');
const dragdivh5 = document.querySelectorAll('.dragdiv-h5');
const dragdivid = document.querySelectorAll('.dragdiv-id');

var starttext = {
  subject: '',
  details: '',
};
var endtext = {
  subject: '',
  details: '',
};
var startindex = "";
var endindex = "";

var starttextid = "";
var endtextid = "";
var href = window.location.href;


// Add event Listeners
dragdivp.forEach((item, i) => {

  item.addEventListener('dragstart', () => {
    item.className += ' hold';
    setTimeout(() => item.className = 'invisible', 0);
    starttext.details = item.innerHTML;
    starttext.subject = item.previousElementSibling.children[0].innerHTML;
    startindex = i;
    starttextid = item.previousElementSibling.children[2].innerHTML;
  });

  item.addEventListener('dragend', () => {
    item.className = 'dragtext';
  });

  item.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  item.addEventListener('dragenter', (e) => {
    e.preventDefault();
    item.className += ' hovered';
  });

  item.addEventListener('dragleave', () => {
    item.className = 'dragtext';
  });

  item.addEventListener('drop', () => {
    item.className = 'dragtext';
    endtext.details = item.innerHTML;
    endtext.subject = item.previousElementSibling.children[0].innerHTML;
    endindex = i;
    endtextid = item.previousElementSibling.children[2].innerHTML;


    dragdivp[startindex].innerHTML = endtext.details;
    dragdivp[startindex].previousElementSibling.children[0].innerHTML = endtext.subject;
    dragdivp[endindex].innerHTML = starttext.details;
    dragdivp[endindex].previousElementSibling.children[0].innerHTML = starttext.subject;


    var temp1 = startindex;
    startindex = endindex;
    endindex = temp1;

    var temp2 = "";
    var temp3 = "";
    dragdivp.forEach((item, i) => {
      if (item.innerHTML === starttext.details) {
        temp2 = item.previousElementSibling.children[2].innerHTML;
        dragdivp.forEach((n_item, i) => {
          if (n_item.innerHTML === endtext.details) {
            temp3 = n_item.previousElementSibling.children[2].innerHTML;
            n_item.previousElementSibling.children[2].innerHTML = temp2;
          }
        });
        item.previousElementSibling.children[2].innerHTML = temp3;
      }
    });

    socket.emit('dragdiv', {
      startindex: startindex,
      starttextid: starttextid,
      starttext: starttext,
      endindex: endindex,
      endtextid: endtextid,
      endtext: endtext,
      href: href,
    });
  });

});


const delIconBtn = document.querySelectorAll('.del-icon-btn');
delIconBtn.forEach((item, i) => {
  item.addEventListener('click', () => {
    var id = item.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML;
    socket.emit('deleteItem',id);
  });
});


const editIconBtn = document.querySelectorAll('.edit-icon-btn');
editIconBtn.forEach((item, i) => {
  item.addEventListener('click', () => {
    // const modal = document.querySelector('.modal-subject');
    var id = item.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML;
    socket.emit('editItem',id);
  });
});


//Listen for socket data in edit events
socket.on('editItem',(data) =>{
  const modalSubject = document.querySelector('.modal-subject');
  const modalDetails = document.querySelector('.modal-details');

  modalSubject.setAttribute("value",data.subject);
  // modalDetails.value = data.details;
  $('.modal-details').summernote('code', data.details);
  console.log(modalSubject.getAttribute("value"));
  console.log(modalDetails.innerHTML);
  $('#Modal').modal('toggle');
});
