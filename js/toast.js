/* I personally love toast */
const toast = (message, varibles= null) =>{
  const toastBar = document.querySelector('#toast');

  toastBar.classList.add('show');
  toastBar.innerHTML = message;
  if(varibles != null) {
    toastBar.innerHTML += `<a href=""> Update </a>`;
    document.querySelector('#toast a').addEventListener('click', () => {
      toastBar.classList.remove('show');
    })
  }
  setTimeout(()=>{
    document.querySelector('#toast').classList.remove('show');
  }, 50000);
}