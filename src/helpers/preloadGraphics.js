export const preloadGraphics = (images = []) => new Promise((resolve, reject) => {
  const loadWatchers = images.map(image => new Promise((resolveImage, rejectImage) => {
    const imageEl = document.createElement('img');
    imageEl.src = `/images/${image}`;
    imageEl.id = image.split('.')[0];
    imageEl.style = 'display:none;';
    imageEl.onload = resolveImage;
    imageEl.onerror = rejectImage;

    document.body.appendChild(imageEl);
  }));

  Promise.all(loadWatchers).then(resolve).catch(reject);
});
