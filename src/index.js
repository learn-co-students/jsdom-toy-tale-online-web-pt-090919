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
  
  function submitData(toyForm, addBtn){
    return fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type":
        "application/json", "Accept": "application/json"
      },
      body: JSON.stringify({toyForm, addBtn})
    })
    .then(function(response){
      return response.json()
    })
    .then(function(object){
      console.log(object)
    })
    .catch(function(error){
      document.body.innerHTML = error.message
    })
  }
  
});
