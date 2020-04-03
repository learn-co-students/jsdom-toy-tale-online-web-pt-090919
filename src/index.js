let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

  toyForm.addEventListener("submit", postToy)

  const toyCollection = document.querySelector('#toy-collection')
  const url = "http://localhost:3000/toys"

  getToys();
  
  function getToys() {
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(toy => {
        buildCard(toy)
      })
    })
  }
  
  function postToy(e) {
    e.preventDefault();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({
        "name": e.target.elements[0].value,
        "image": e.target.elements[1].value,
        "likes": 0
      })
    })
    .then(resp => resp.json())
    .then(json => {
      let newToy = buildCard(json)
      toyCollection.append(newToy)
    })
  }
  
  function buildCard(toy) {
    let card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('id', `${toy.id}`)
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button data-id=${toy.id} class="like-btn">Like</button>`
    toyCollection.appendChild(card)
    const likeBtn = document.querySelector(`[data-id="${toy.id}"]`)
    likeBtn.addEventListener("click", addLike)
  }

  function addLike(e) {
    let card = document.getElementById(`${e.target.dataset.id}`)
    let likes = card.children[2].innerText++;
    console.log(likes)
    fetch(`http://localhost:3000/toys/${card.id}`, {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
      "likes": likes + 1
        })
    })
  }
});
