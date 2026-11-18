
function publish() {
  const username = document.getElementById("username").value.trim();
  const photo = document.getElementById("photo").value.trim();
  const caption = document.getElementById("caption").value.trim();

  if (!username || !photo) {
    alert("Preencha seu nome e o link da imagem!");
    return;
  }

  try {
    const url = new URL(photo);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("URL inválida");
    }
  } catch {
    alert("Coloque um link válido de imagem!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  const name = document.createElement("h3");
  name.textContent = username;

  const image = document.createElement("img");
  image.src = photo;
  image.alt = "Imagem publicada";
  image.onerror = () => image.remove();

  const description = document.createElement("p");
  description.textContent = caption;

  const actions = document.createElement("div");
  actions.className = "actions";

  const like = document.createElement("button");
  like.textContent = "♡ Curtir (0)";

  let likes = 0;

  like.onclick = () => {
    likes++;
    like.textContent = `♥ Curtir (${likes})`;
  };

  actions.appendChild(like);
  post.append(name, image, description, actions);

  document.getElementById("feed").prepend(post);

  document.getElementById("username").value = "";
  document.getElementById("photo").value = "";
  document.getElementById("caption").value = "";
}
