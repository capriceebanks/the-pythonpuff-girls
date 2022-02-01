// ********************************************
// SETUP

const form = document.querySelector('.main-form');

// Bind event listeners

form.addEventListener('submit', submitPost);


// Fetch all posts as soon as app is loaded
getAllPosts();
// ********************************************

function getAllPosts(){
    fetch('http://localhost:8008/posts')
        .then(r => r.json())
        .then(appendPosts)
        .catch(console.warn)
};

// create
function submitPost(e){
//   e.preventDefault();

  const postData = {
    message: e.target.querySelector("#newPostText").value,

  };

  const options = { 
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
          "Content-Type": "application/json"
      }
  };

  fetch('http://localhost:8008/posts/new', options)
      .then(r => r.json())
      .then(appendPost)
      .catch(console.warn)
};

// helpers
function appendPosts(posts){
  posts.forEach(appendPost);
};


function appendPost(postData){
  const newPara = document.createElement('p');
  newPara.textContent = `${postData.message}`
  const postsList = document.querySelector('.post-message');
  postsList.append(newPara);
};



const btn = document.querySelector('#btn')
const newPost = document.querySelector('#newPost');

btn.addEventListener('click', showDiv)
btn.addEventListener('click', postText)

function showDiv(e) {
    e.preventDefault();
    let newPost = document.getElementById('showDiv');
    newPost.style.display = 'block';
    
}
function postText(e) {
    e.preventDefault();
    let inputVal = document.querySelector('.newPostText').value;
    console.log(newPost.append(inputVal));
}

function createPost(data) {
    e.preventDefault();
    fetch()
    for(let i = 0; i <= data.length; i++){
        const newDiv = document.createElement('div');
        newDiv.textContent = data[i].message;
    }
}

// function appendPost(postData){
//     const newDiv = document.createElement('div');
//     // newDiv.textContent = ;
//     const postsList = document.querySelector('.post-message');
//     postsList.append(newLi);
// } 

// function addElement(e) {
//   // create a new div element
//   e.preventDefault();
//   const newDiv = document.createElement("div");

//   // and give it some content
//   const newContent = document.createTextNode(newPostText);

//   // add the text node to the newly created div
//   newDiv.appendChild(newContent);

//   // add the newly created element and its content into the DOM
//   const currentDiv = document.getElementById("div1");
//   document.body.insertBefore(newDiv, currentDiv);
// }

