var buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let type = button.getAttribute('type'); // Submit is the default
    if(type === 'submit'){
      button.addEventListener('click',() =>{
       let html = "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>";
       button.innerHTML = html;
      })
    }
}