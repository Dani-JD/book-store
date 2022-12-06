// Form image uplad show
const loadFile = function (event) {
  const image = document.getElementById('output');
  const imageView = document.getElementById('image-view');

  imageView.style.display = 'flex';
  image.src = URL.createObjectURL(event.target.files[0]);
};
