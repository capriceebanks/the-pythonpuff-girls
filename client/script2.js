
const btn = document.querySelector('#btn')
const newPostText = document.querySelector('#newPostText');

btn.addEventListener('click', showDiv)
btn.addEventListener('click', postText)

function showDiv(e) {
    e.preventDefault();
    let newPost = document.getElementById('newPost');
    newPost.style.display = 'block';
    
}
function postText(e) {
    e.preventDefault();
    let inputVal = document.querySelectorAll('.newPostText').value;
    let newPost = document.getElementById('newPost')
    newPost.append(inputVal);
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
