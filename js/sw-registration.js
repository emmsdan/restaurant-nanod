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

    if(registration.waiting){
      serviceWorkerInstallation(registration.installing);
      document.querySelector('#toast a').addEventListener('click', () => {
        registration.waiting.postMessage('skipWaiting');
      })
      return;
    }
    if (registration.installing){
      document.querySelector('#toast a').addEventListener('click', () => {
        registration.waiting.postMessage('skipWaiting');
      })
      serviceWorkerInstallation(registration.installing);
      return;
    }
  }).catch(error => {
    toast(`Issues Starting Offline Server'`);
  });
});
const serviceWorkerInstallation = (status) =>{
  status.addEventListener('statechange', () => {
    if (status.state == 'installed'){
      toast('New Contents are Available', 'updateServiceWorker');
    }
  })
}
