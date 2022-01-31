// ********************************************
// SETUP

const form = document.querySelector('#new-post-form');

// Bind event listeners

form.addEventListener('submit', submitPost);

// Fetch all posts as soon as app is loaded
getAllPosts();
// ********************************************


// gif stuff
const gifSearchButton = document.getElementById("gifSearchButton");
const addGifButton = document.querySelector("#addGif");

// call Giphy api and display results
gifSearchButton.addEventListener("click", (e) => {
    let search = document.getElementById("gifSearch").value;
  
    //Replace spaces in the search term with a plus so the giphy api can handle multi word entries.
  
    search = search.replace(/\s/g, "+");
  
    fetch(`http://localhost8008/gifs/${search}`)
      .then((response) => response.json())
      .then((obj) => {
        const gifDisplay = document.getElementById("gifs");
  
        for (let i = 0; i < obj.length; i++) {
          // Create an image and set its source to the current image
          const tempImg = document.createElement("img");
          tempImg.classList.add("gif-img");
          tempImg.src = obj[i].images.original.url;
  
          // Add an event listener to each photo
          tempImg.addEventListener("click", (e) => {
            // store the source of the clicked image
            const imgSource = e.target.src;
  
            // close the popup
            document.getElementById("gifPopup").style.display = "none";
  
            // Add it to the dom
            if (document.getElementById('gifToAdd')) {
              document.getElementById('gifToAdd').remove()
            }
            const gif = document.createElement("img");
            gif.src = imgSource;
            gif.id = "gifToAdd";
  
            document.querySelector("form").append(gif);
          });
          gifDisplay.append(tempImg);
        }
      })
      .catch((error) => console.log(error));
  });
  
  // makes the gif search div display
  addGifButton.addEventListener("click", (e) => {
    document.getElementById("gifPopup").style.display = "block";
  });
  
  // Closes the Giphy search Div when the close button is pressed.
  document.getElementById("closeButton").addEventListener("click", () => {
    document.getElementById("gifPopup").style.display = "none";
  });

  function getAllPosts(){
    fetch('http://localhost:8008/posts')
        .then(r => r.json())
        .then(appendPosts)
        .catch(console.warn)
};

// create
function submitPost(e){
  e.preventDefault();

  const postData = {
      name: e.target.name.value,
      title: e.target.title.value,
      message: e.target.newPostText.value,
      //comments: e.target.comments.value
  };

  const options = { 
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
          "Content-Type": "application/json"
      }
  };

  fetch('http://localhost:3000/posts', options)
      .then(r => r.json())
      .then(appendPost)
      .catch(console.warn)
};

// helpers
function appendPosts(posts){
  posts.forEach(appendPost);
};

function appendPost(postData){
  const newLi = document.createElement('li');
  newLi.textContent = `Name: ${postData.name} || Title: ${postData.title} || Message: ${postData.message} || Comments: ${postData.comments}`
  const postsList = document.querySelector('.post-message');
  postsList.append(newLi);
};

getAllPosts();