const apiDomain = "http://localhost:8008/";


// gif selectors
const gifSearchButton = document.getElementById("gifSearchButton");
const addGifButton = document.querySelector("#addGif");

const textArea = document.getElementById("textArea");
const counterPost = document.getElementById("charCounterPost");
const addPostButton = document.getElementById("formSubmit");


// calls the Giphy api and displays the results
gifSearchButton.addEventListener("click", (e) => {
    let search = document.getElementById("gifSearch").value;
  
    //Replace spaces in the search term with a plus so the giphy api can handle multi word entries.
    
    search = search.replace(/\s/g, "+");

    fetch(`${apiDomain}gifs/${search}`)
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
            document.getElementById("gifBox").style.display = "none";
            
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
    document.getElementById("gifBox").style.display = "block";
});

// Closes the Giphy search Div when the close button is pressed.
document.getElementById("closeButton").addEventListener("click", () => {
    document.getElementById("gifBox").style.display = "none";
});


// Calculate remaining characters
textArea.addEventListener("input", (e) => {
    const target = e.target;
    const maxLength = target.getAttribute("maxlength");
    let currentLength = target.value.length;
    charCounterPost.textContent = `${maxLength - currentLength} characters remaining`;
    
    // Button is enabled since textarea has text:
    addPostButton.disabled = false;
  });





// TEST POST BUTTON





function addAllGifPlusComments(newPostArray) {

  for (let i = newPostArray.length - 1; i >= 0; i--) {
    addGifPlusComments(newPostArray[i]);
  }
}

function addGifPlusComments(jsonData) {
  const newSection = document.createElement("section");
  newSection.classList.add("newSection");

  const post = document.createElement("div");
  post.classList.add("post");
  post.textContent = jsonData.message;

  newSection.append(post);


  if (jsonData.gifUrl) {
    const gifArea = document.createElement("div");
    gifArea.classList.add("GifAreaInPost");

    const img = document.createElement("img");
    img.classList.add("gifInPost");
    img.src = jsonData.gifUrl;

    gifArea.append(img);

    newSection.append(gifArea);
  }

  const newCommentSection = document.createElement("section");
  newCommentSection.classList.add("newCommentSection");
    
  const newCommentDiv = document.createElement("div");
  newCommentDiv.classList.add("newCommentDiv");
    
  const newCommentLabel = document.createElement("label");
  newCommentLabel.classList.add("newCommentLabel")
  newCommentLabel.textContent = "Add your comments here!"
  newCommentDiv.append(newCommentLabel);
    
  const newCommentTextArea = document.createElement("textarea")
  newCommentTextArea.id = `newCommentTextArea_${jsonData.id}`
  newCommentDiv.append(newCommentTextArea);
    
  const addCommentButton = document.createElement("button");
  addCommentButton.textContent = "Post Comment"
  addCommentButton.id = `addCommentButton_${jsonData.id}`
  addCommentButton.classList.add("addCommentButton")
  newCommentDiv.append(addCommentButton);

  const recentComments = document.createElement("div")
  newCommentDiv.append(recentComments)

  newCommentSection.append(newCommentDiv);
  newSection.append(newCommentSection);

  newCommentSection.id = jsonData.id;

  newSection.id = jsonData.id;

  document.querySelector("main").append(newSection);
  
  // Add a listener to our new 'add comment' button
  addCommentButton_addEventListener(jsonData.id);
}

function addCommentButton_addEventListener(id)
{
  const addCommentButton = document.querySelector(`#addCommentButton_${id}`);
  addCommentButton.addEventListener("click", (e) => {
  
    const data = {
      id: id,
      comments: document.querySelector(`#newCommentTextArea_${id}`).value,
    
    };

    // if text area was empty when submitting nothing is posted
    if (data.comments === "") {
      return
    }

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const commentUrl = `${apiDomain}posts/comments/new`;
    fetch(commentUrl, options)      
    .then((response) => response.json())
    .then((newPostArray) => {
      addAllGifPlusComments(newPostArray);
      newCommentTextArea.value = "";
    })
    .catch((error) => console.log(error));
});

      
             

}


addPostButton.addEventListener("click", (e) => {

    const data = {
      message: document.getElementById("textArea").value,
    };

    // if text area was empty when submitting nothing is posted
    if (data.message === "") {
      return
    }
    // add the gif
    if (document.getElementById("gifToAdd") === null) {
      data.gifUrl = null;
    } else {
      data.gifUrl = document.getElementById("gifToAdd").src;
    }


    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiDomain}posts/new`, options)
      .then((response) => response.json())
      .then((newPostArray) => {
        addAllGifPlusComments(newPostArray);
        textArea.value = "";
        if (document.getElementById("gifToAdd")) {
          document.getElementById("gifToAdd").remove();
        }
      })
      .catch((error) => console.log(error));
  });



