/* I personally love toast */
const toast = (toast, varibles= null) =>{
  const toastContainer = document.querySelector('.toast');
  const toastNotification = document.querySelector('.toasted');
  const toastButton = document.querySelector('.toastButton');

  if(varibles != null) {
    toastButton.innerHTML = `<a href='./'> Update </a>`;
  }

  toastContainer.classList.add('show');
  toastNotification.innerHTML = toast;
  setTimeout(()=>{
    document.querySelector('.toast').classList.remove('show');
  }, 50000);
}

document.querySelector('.toast .toastButton').addEventListener('click', ()=>{
  document.querySelector('.toast').classList.remove('show');
})