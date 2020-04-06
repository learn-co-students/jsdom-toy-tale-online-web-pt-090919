let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  // add event listener to "Add toy" button to show/hide form
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  toyForm.addEventListener('submit', event => {
    event.preventDefault();
    postToy(event.target);
  })

  let toyCollection = document.getElementById("toy-collection");
  fetchToys();

  function fetchToys() {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(json => {
        json.forEach(toy => {
          renderToy(toy)
        })
      })
  };

  function postToy(formData){
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({ 
        //form data
        'name': formData.name.value,
        'image': formData.image.value,
        'likes': 0
      })
    }) // send post request and persist data to db.json
    .then (resp => resp.json())
    .then (json => {
      renderToy(json)
    })
  };

  function renderToy(toy) {
    console.log(toy);
    let h2 = document.createElement('h2');
    h2.innerText = `${toy.id}. ${toy.name}`;

    let img = document.createElement('img');
    img.src = toy.image;
    img.className = "toy-avatar";

    let p = document.createElement('p');
    p.innerText = `${toy.likes}`;

    let btn = document.createElement('button');
    btn.className = 'like-btn';
    btn.id = toy.id;
    btn.innerText = 'Like <3'
    btn.addEventListener('click', addLike);
    // console.log(e.target.dataset) //DOMStringMap

    let toyCard = document.createElement('div');
    toyCard.className = 'card'
    // ParentNode.append() can append several nodes and strings
    // whereas Node.appendChild() can only append one node.
    toyCard.append(h2, img, p, btn);
    console.log(toyCard);
    toyCollection.append(toyCard);
  };

  function addLike(e){
    e.preventDefault();
    let likes = parseInt(e.target.previousElementSibling.innerText++)

    // send patch request to the server
    // updating the number of likes of specific toy
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      // convert obj to str -  JSON 
      // JSON allows us to preseve key/value pairs of obj within str
      body: JSON.stringify({
        "likes": likes
      })
    });
  };
});

