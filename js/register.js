/*
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js')
  .then(registration => {
      console.log(`Registration successful, scope is '${registration.scope}'`);
  }).catch(error => {
      console.log(`Service worker registration failed, error: '${error}'`);
  });
}
*/

window.addEventListener ('load', ()=>{
    for (let rg of document.querySelectorAll('script[src]')){
        console.log (rg)
        console.log ()
        console.log ()
    }
});
