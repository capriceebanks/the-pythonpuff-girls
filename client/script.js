const apiDomain = "http://localhost:8008/";


// gif selectors
const gifSearchButton = document.getElementById("gifSearchButton");
const addGifButton = document.querySelector("#addGif");

const textArea = document.getElementById("textArea");
const charCounter = document.getElementById("charCounter");
const addPostButton = document.getElementById("formSubmit");

// load all posts on start up
window.addEventListener('load', (e) => {
    fetch(`${apiDomain}posts`).then((res) => res.json()).then((data) => {
        addAllGifPlusComments(data);
    })
    .catch((error) => console.log(error));
})


// characters remaining 
textArea.addEventListener("input", (e) => {
    const target = e.target;
    const maxLength = target.getAttribute("maxlength");
    let currentLength = target.value.length;
    charCounter.textContent = `${maxLength - currentLength} characters remaining`;
    
    // button on because textarea isnt empty
    addPostButton.disabled = false;
  });


// add gif button
addGifButton.addEventListener("click", (e) => {
    document.getElementById("gifBox").style.display = "block";
});

// search for a gif
gifSearchButton.addEventListener("click", (e) => {
    let search = document.getElementById("gifSearch").value;
  
    //Replace any spaces with +
    search = search.replace(/\s/g, "+");

    // fetch results
    fetch(`${apiDomain}gifs/${search}`)
    .then((response) => response.json())
    .then((obj) => {

        const gifDisplay = document.getElementById("gifs");
        
        for (let i = 0; i < obj.length; i++) {
            // make temp an image and set its source to the current image
            const temporaryImage = document.createElement("img");
            temporaryImage.classList.add("gif-img");
            temporaryImage.src = obj[i].images.original.url;
            
            // Add an event listener to each photo
            temporaryImage.addEventListener("click", (e) => {
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
        gifDisplay.append(temporaryImage);
    }
})
  .catch((error) => console.log(error));
});


// close gif window buton
document.getElementById("closeButton").addEventListener("click", () => {
    document.getElementById("gifBox").style.display = "none";
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
      
    window.location.reload()
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


 












    // function createPosts(object) {
    //     for (let i = object.length - 1; i >= 0; i--) {
    //       const newSection = document.createElement("section");
    //       newSection.classList.add("newSection");
    //       const post = document.createElement("div");
    //       post.classList.add("post");
    //       post.textContent = object[i].message;
    //       newSection.append(post);
    //       if (object[i].gifUrl) {
    //         const gifArea = document.createElement("div");
    //         gifArea.classList.add("GifAreaInPost");
    //         const img = document.createElement("img");
    //         img.classList.add("gifInPost");
    //         img.src = object[i].gifUrl;
    //         gifArea.append(img);
    //         newSection.append(gifArea);
    //       }
    //         const newCommentSection = document.createElement("section");
    //         newCommentSection.classList.add("newSection");
    //         const newCommentForm = document.createElement("form");
    //         newCommentForm.classList.add("newCommentForm");
    //         const newCommentLabel = document.createElement("label");
    //         newCommentLabel.classList.add("newCommentLabel")
    //         newCommentLabel.textContent = "Add your comments here!"
    //         newCommentForm.append(newCommentLabel);
    //         const newCommentTextArea = document.createElement("textarea")
    //         newCommentTextArea.id = "newCommentTextArea"
    //         newCommentForm.append(newCommentTextArea);
    //         const addCommentButton = document.createElement("button");
    //         addCommentButton.textContent = "Post Comment"
    //         addCommentButton.id = "addCommentButton"
    //         addCommentButton.classList.add("addCommentButton")
    //         newCommentForm.append(addCommentButton);
    //         const listOfComments = document.createElement("div")
    //         newCommentForm.append(listOfComments)
    //         newCommentSection.append(newCommentForm);
    //         newSection.append(newCommentSection);
    //         newCommentSection.id = object[i].id;
    //         newSection.id = object[i].id;
    //         document.querySelector("main").append(newSection);
    //     }
    //   }
    // addPostButton.addEventListener("click", (e) => {
    //     e.preventDefault()
    //     const data = {
    //       message: document.getElementById("textArea").value,
    //     };
    //     if (data.message === "") {
    //       return
    //     }
    //     // add gif
    //     if (document.getElementById("gifToAdd") === null) {
    //       data.gifUrl = null;
    //     } else {
    //       data.gifUrl = document.getElementById("gifToAdd").src;
    //     }
    //     const options = {
    //       method: "POST",
    //       body: JSON.stringify(data),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };
    //     fetch(`${apiDomain}posts/new`, options)
    //       .then((response) => response.json())
    //       .then((obj) => {
    //         createPosts(obj);
    //         textArea.value = "";
    //         if (document.getElementById("gifToAdd")) {
    //           document.getElementById("gifToAdd").remove();
    //         }
    //         //only needed if init is being called
    //         // window.location.reload()
    //       })
    //       .catch((error) => console.log(error));
    //   });


    
// load all of the posts so they stay there when the page refreshes - stops gif button working???
// function init() {
//     fetch(`${apiDomain}posts`).then((res) => res.json()).then((data) => {
//         createPosts(data);
//     })
//     .catch((error) => console.log(error));
// }
// init()


//comments stuff
// addCommentButton.addEventListener("click", (e) => {
      
//     const data = {
//         comments: document.getElementById("newCommentTextArea").value,
//       };
  
//       if (data.comments === "") {
//         return
//       }

//       const options = {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

      
//       fetch(`${apiDomain}posts/comments/new/${newSection.id}`, options)
//         .then((response) => response.json())
//         .then((obj) => {
//           listOfComments.textContent = document.getElementById("newCommentTextArea").value
//           newCommentTextArea.value = "";
//         })
//   });

// //test
// function addComment(e) {
//     e.preventDefault();
//     const commentEntry = document.getElementById("newCommentTextArea").value

//     const options = {
//         method: "POST",
//         body: JSON.stringify({
//             comments: commentEntry
//         }),
//         headers: {
//         "Content-Type": "application/json",
//         },
//     }
//     fetch(`${apiDomain}posts/comments/new`, options)
//     setTimeout( () => {
//         window.location.reload()
//     }, 500);
// }

// newCommentForm.addEventListener('submit', addComment(e))
