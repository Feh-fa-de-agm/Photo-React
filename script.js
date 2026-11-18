
let selectedPhoto = null;
let photoURL = null;

const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");

photoInput.addEventListener("change", function() {
  const file = this.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Escolha uma imagem válida!");
    this.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert("A imagem deve ter no máximo 10 MB.");
    this.value = "";
    return;
  }

  selectedPhoto = file;

  if (photoURL) {
    URL.revokeObjectURL(photoURL);
  }

  photoURL = URL.createObjectURL(file);
  preview.src = photoURL;
  preview.style.display = "block";
});

function openCreator() {
  document.getElementById("creator").scrollIntoView({
    behavior: "smooth"
  });
}

function showFeed() {
  document.getElementById("feed").scrollIntoView({
    behavior: "smooth"
  });
}

function publish() {
  const username = document
    .getElementById("username")
    .value.trim();

  const caption = document
    .getElementById("caption")
    .value.trim();

  if (!username || !selectedPhoto) {
    alert("Coloque seu nome e escolha uma foto!");
    return;
  }

  const imageURL = URL.createObjectURL(selectedPhoto);

  const post = document.createElement("article");
  post.className = "post";

  const name = document.createElement("h3");
  name.textContent = username;

  const image = document.createElement("img");
  image.src = imageURL;
  image.alt = "Foto publicada";

  const description = document.createElement("p");
  description.textContent = caption;

  const like = document.createElement("button");
  like.className = "like";
  like.textContent = "♡ Curtir (0)";

  let likes = 0;

  like.addEventListener("click", function() {
    likes++;
    like.textContent = `♥ Curtir (${likes})`;
  });

  post.append(name, image, description, like);

  const posts = document.getElementById("posts");
  const empty = posts.querySelector(".empty");

  if (empty) empty.remove();

  posts.prepend(post);

  document.getElementById("username").value = "";
  document.getElementById("caption").value = "";
  photoInput.value = "";

  selectedPhoto = null;
  preview.style.display = "none";
  preview.removeAttribute("src");

  if (photoURL) {
    URL.revokeObjectURL(photoURL);
    photoURL = null;
  }

  showFeed();
}
