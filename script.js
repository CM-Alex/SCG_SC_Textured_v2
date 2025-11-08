// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

// Dismiss the intro overlay on click or tap
document.addEventListener('click', () => {
  const overlay = document.getElementById('intro-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(() => overlay.remove(), 500);
  }
}, { once: true });

// Sidebar and hotspot zoom logic
const modelViewer = document.getElementById('modelViewer');
const sidebar = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebarTitle');
const closeSidebar = document.getElementById('closeSidebar');

document.querySelectorAll('.Hotspot').forEach(hotspot => {
  hotspot.addEventListener('click', () => {
    const position = hotspot.dataset.position.split(' ').map(p => parseFloat(p));
    const target = `${position[0]}m ${position[1]}m ${position[2]}m`;
    const title = hotspot.querySelector('.HotspotAnnotation')?.textContent || 'Hotspot';

    modelViewer.cameraTarget = target;
    modelViewer.cameraOrbit = '0deg 45deg 0.5m';
    modelViewer.jumpCameraToGoal();

    sidebarTitle.textContent = title;
    sidebar.classList.remove('hidden');
  });
});

closeSidebar.addEventListener('click', () => {
  sidebar.classList.add('hidden');
  modelViewer.cameraOrbit = '1637deg 45deg 67.08m';
  modelViewer.cameraTarget = '0m 0m 0m';
  modelViewer.jumpCameraToGoal();
});
