/**
 * Service Worker registration Script moved here for better organization.
 * load service worker after window has loaded
 * check for service worker support
 * listen to service registration changes
 */
window.addEventListener('load', ()=>{
  if (!navigator.serviceWorker){
    toast('This Browser is older than Jimmy');
    return Promise.resolve();
  }
  navigator.serviceWorker.register('serviceWorker.js')
  .then(registration => {
    // checking if controller is true/false
    if (!navigator.serviceWorker.controller) return;

    const toastButton = document.querySelector('#toast');
    if(registration.waiting){
      toast('New Content Available', 'updateServiceWorker');
      toastButton.addEventListener('click', () => {
        registration.waiting.postMessage('skipWaiting');
      })
      return;
    }
    registration.addEventListener('updatefound', () => {
      toast('Fresh Contents Available', 'updateServiceWorker');
      toastButton.addEventListener('click', () => {
        registration.waiting.postMessage('skipWaiting');
      })
      return;
    });
  }).catch(error => {
    console.log (error)
    toast(`Issues Starting Offline Server'`);
  });
});
