// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyForm = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyForm.style.display = "block";
//     } else {
//       toyForm.style.display = "none";
//     }
//   });
// });

let addToy = false;

const toysURL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });


  toyForm.addEventListener("submit", postToy);

  function getToys(){
    fetch(toysURL)
    .then(response => response.json())
    .then(json => {
      json.forEach(toy => {
        toyCard(toy)
      })
    .catch(function(error) {
      alert("Sorry something went wrong!");
      console.log(error.message);
      });
    })
  }

  function postToy(){
    let toyName = document.querySelector('input[name=name]')
    let toyImage = document.querySelector('input[name=image]')

    e.preventDefault();
    fetch(toysURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({
        "name": toyName.value,
        "image": toyImage.value,
        "likes": 0
      })
    })
    .then(resp => resp.json())
    .then(json => {
      let newToyCard = toyCard(json)
      toyCollection.append(newToyCard)
    })
  }


  function toyCard(toyData){
    toyCardCollectionContainer = document.createElement('div');
      toyCardCollectionContainer.setAttribute('class', 'card');
      toyCardCollectionContainer.innerHTML = `
        <h2>${toyData.name}</h2>
        <img src=${toyData.image} class="toy-avatar" />
        <p>${toyData.likes}</p>
        <button data-id=${toyData.id} class="like-btn">Like</button>
      `
      toyCollection.appendChild(toyCardCollectionContainer);
      const likeBtn = document.querySelector(`[data-id="${toyData.id}"]`)
      // likeBtn.addEventListener("click", addLike)
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
getToys();
})