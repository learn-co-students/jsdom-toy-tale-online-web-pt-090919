const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false;
let divCollect = document.querySelector('#toy-collection')

function getToys(){
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
}

function postToy(toy_data){
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
       "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then( res => res.json())
  .then((obj_toy) => {
    let new_toy = renderToys(obj_toy)
    divCollect.append(new_toy)
  })
}

function likes(e){
  // Prevent the button from refreshing the page by default
  // Line 'let more' to be defined . . . after testing
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  // Sending data through fetch to /toys/:id
  // Running our PATCH request as our second argument
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(res => res.json())
  .then((like_obj => {
    e.target.previousElementSibling.innerText = `${more} likes`;
  }))

}

function renderToys(toy){
  // For all toys index:

  // Create h2 and set the innerText to the toy.name
  let h2 = document.createElement('h2')
  h2.innerText = toy.name 

  // Create an img tag.
  // Set the img 'src' to the toy.image URL
  // Set the img 'class' to 'toy-avatar'
  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  // Create a p tag
  // Set the innerText of p to the likes COUNT of toy
  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  // Create a button tag 'btn'
  // Set 'btn' attribute 'class' to 'like-btn'
  // Set 'btn' attribute 'id' to the toy.id
  // Set the innerText of btn to "like"
  // Add an event listener that waits for a click
  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}

addBtn.addEventListener('click', () => {
  addToy = !addToy 
  if (addToy){
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
}) 
