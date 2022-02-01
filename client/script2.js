
const addPostBtn = document.querySelector('#add-button')
const newPost = document.querySelector('#newPost');

// btn.addEventListener('click', showDiv)
// btn.addEventListener('click', postText)
addPostBtn.addEventListener('click', createPost)

// function showDiv(e) {
//     e.preventDefault();
//     let newPost = document.getElementById('showDiv');
//     newPost.style.display = 'block';
    
// }
// function postText(e) {
//     e.preventDefault();
//     let inputVal = document.querySelector('.newPostText').value;
//     console.log(newPost.append(inputVal));
// }

function createPost(data) {
    e.preventDefault();
    fetch()
    for(let i = 0; i <= data.length; i++){
        const newDiv = document.createElement('div');
        newDiv.textContent = data[i].message;
    }
}

function appendPost(postData){
    const newDiv = document.createElement('div');
    // newDiv.textContent = ;
    const postsList = document.querySelector('.post-message');
    postsList.append(newLi);
} 

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



// 1) we need to add a card/div with the styling of existing cards/divs
// 2) we need to append the written data from textarea to newly made div
// 3) we need to adjust the layout so when a new div is made, existing divs move along to the right 
