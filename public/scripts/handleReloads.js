socket.on('reloadPage',(data)=>{
    if(data === 'reload'){
      location.reload();
    }
  });