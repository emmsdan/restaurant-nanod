/**
 * Service Worker registration Script moved here for better organization.
 * load service worker after window has loaded
 */
window.addEventListener('load', ()=>{
  navigator.serviceWorker.register('serviceWorker.js')
  .then(registration => {
      console.log(`Welcome Home. serviceWorker started at '${registration.scope}'`);
  }).catch(error => {
      console.log(`serviceWorker failed to Start, with an Error: '${error}'`);
  });
});
