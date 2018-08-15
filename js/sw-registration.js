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
      console.log(`Welcome Home. serviceWorker started at '${registration.scope}'`);
      if (!navigator.serviceWorker.controller) return;
      registration.addEventListener('updatefound', () => {
        if(registration.waiting){
          toast('New Content Available', 'updateServiceWorker');
          registration.waiting.postMessage('skipWaiting');
          return;
        }
        if (registration.installing){
          serviceWorkerInstallation(registration.installing);
          return;
        }
          return;
      });
  }).catch(error => {
      console.log(`serviceWorker failed to Start, with an Error: '${error}'`);
  });
});
const serviceWorkerInstallation = (status) =>{
  status.addEventListener('statechange', () => {
    if (status.state == 'installed'){
      toast('Checking For New Content');
    }
  })
}
