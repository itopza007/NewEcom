// pwaUpdateNotifications.ts
import Swal from 'sweetalert2';

export function setupPwaUpdateNotifications() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              // Notify the user that an update is available
              showUpdateNotification(registration);
            }
          });
        }
      });
    });
  }
}

function showUpdateNotification(registration: ServiceWorkerRegistration) {
  // Use SweetAlert to show a custom notification
  Swal.fire({
    title: 'App Update Available',
    text: 'A new version of the app is available. Click OK to refresh.',
    icon: 'info',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  }).then((result: { isConfirmed: boolean }) => {
    if (result.isConfirmed) {
      // Proceed to activate and refresh as needed
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' }); // Use "waiting" instead of "installing"
      window.location.reload();
    }
  });
}
