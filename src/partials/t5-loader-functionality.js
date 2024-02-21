export function showLoader() {
  const loaderElement = document.getElementById('loader');
  if (loaderElement) {
    loaderElement.style.display = 'inline-block';
  }
}

export function hideLoader() {
  const loaderElement = document.getElementById('loader');
  if (loaderElement) {
    loaderElement.style.display = 'none';
  }
}
