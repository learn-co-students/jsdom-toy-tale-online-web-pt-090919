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

  
  let toyF = document.querySelector('.add-toy-form')
   //let createBtn = document.querySelector('input.submit') Good for future referance
  toyF.addEventListener('submit',newToy)
  toyF.reset()
  fetchToys();
});
  
function fetchToys() {
       return fetch('http://localhost:3000/toys') 
      .then((reps) => {
        return reps.json()
      })
      .then((json) => {
        json.forEach(joy => {
          if (joy.name) {
          putToy(joy)
          }
        })
      })
      .catch((error) => {
        alert('fix it!')
        document.body.innerHTML = error.message
      })
}  
// let nameElement = document.querySelector('input[name="name"]') Good for future referance
// let imageElement = document.querySelector('input[name="image"]') Good for future referance

function newToy(event) {
  event.preventDefault();
  return fetch('http://localhost:3000/toys', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json'
   },
   body: JSON.stringify({
     'name': event.target.name.value,
     'image': event.target.image.value,
     'likes': 0
   })
 })
 .then((reps) => {
  
   return reps.json()
 })
  .then(joy => {
   //  console.log(joy) Good for future referance
    putToy(joy)
  })
 .catch((error) => {
   alert('Fix it Now!')
   document.body.innerHTML = error.message
 })
}

  function putToy(joy) {
    let toyCollection = document.querySelector("#toy-collection");
    let cardDiv = document.createElement('div')
    let toyName = document.createElement('h2')
    let toyImage = document.createElement('img')
    let likes = document.createElement('p')
    let likeBtn = document.createElement('button')
    cardDiv.setAttribute('data-id', `${joy.id}`)
    cardDiv.classList.add('card')
    toyName.textContent = `${joy.name}`
    toyImage.setAttribute('src', `${joy.image}`)
    toyImage.classList.add('toy-avatar')
    likes.textContent = `${joy.likes}`
    likeBtn.textContent = 'Like'
    likeBtn.classList.add("like-btn")
    cardDiv.append(toyName, toyImage, likes, likeBtn)
    toyCollection.appendChild(cardDiv)
  }





