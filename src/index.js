let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toyParser();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function toyParser() {
  fetch("http://localhost:3000/toys/")
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    for (const toy of json) {
      console.log(toy.name);
      cardMaker(toy);
    };
  });
};

function cardMaker(toy) {
  const div = document.createElement("div");
  div.classList.add("card");
  const h2 = document.createElement("h2");
  h2.textContent = toy.name;
  const img = document.createElement("img");
  img.src = toy.image;
  img.classList.add("toy-avatar");
  const p = document.createElement("p");
  p.textContent = `${toy.likes} Likes`;
  const button = document.createElement("button");
  button.classList.add("like-btn");
  button.textContent = "<3";
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  document.querySelector("body").appendChild(div)
};