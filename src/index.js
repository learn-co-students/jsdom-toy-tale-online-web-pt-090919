let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  // Good for future referance---let createBtn = document.querySelector('input.submit') 
  // querySelector in the event
  let toyF = document.querySelector('.add-toy-form') 
  toyF.addEventListener('submit',newToy)
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
        alert('Error in fetchToys')
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
   // Good for future referance--console.log(joy) 
    putToy(joy)
  })
 .catch((error) => {
   alert('Fix newToy')
   document.body.innerHTML = error.message
 })
}

  function putToy(joy) {
    let toyCollection = document.querySelector("#toy-collection");
    // create Elements
    let cardDiv = document.createElement('div')
    let toyName = document.createElement('h2')
    let toyImage = document.createElement('img')
    // create elements for like and like btn
    let likes = document.createElement('p')
    // add eventListener for like btn
    let likeBtn = document.createElement('button')
    likeBtn.addEventListener('click', updateLike)
    // set card ID and names
    cardDiv.setAttribute('data-id', `${joy.id}`)
    cardDiv.classList.add('card')
    toyName.textContent = `${joy.name}`
    // set Image and class
    toyImage.setAttribute('src', `${joy.image}`)
    toyImage.classList.add('toy-avatar')
    // display likes 
    likes.textContent = `${joy.likes} Likes`
    // like btn set up
    likeBtn.id = joy.id
    likeBtn.textContent = 'Like'
    likeBtn.classList.add("like-btn")
    // append
    cardDiv.append(toyName, toyImage, likes, likeBtn)
    toyCollection.appendChild(cardDiv)
  }

  function updateLike(event) {
    // console.log(event.currentTarget)
    // console.log(event.currentTarget.parentElement.querySelector('p')) same as previousSibling
      // console.log(id)
      //console.log(paragraph) 
    let paragraph = event.currentTarget.previousSibling
    let id = event.currentTarget.id
    let currentLike = event.currentTarget.previousSibling.innerText
    currentLike = parseInt(currentLike.split(" ")[0])
    currentLike += 1
     
   return fetch(`http://localhost:3000/toys/${id}`, {
     method: 'PATCH',
     headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': currentLike
    }) 
   })
    .then(response => response.json())
    .then(data => {
      paragraph.innerText = `${data.likes} Likes`
    })
    //  console.log(currentLike)
  }



