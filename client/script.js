const apiDomain = "https://pythonpuff-girls.herokuapp.com/";


// gif selectors
const gifSearchButton = document.getElementById("gifSearchButton");
const addGifButton = document.querySelector("#addGif");

const textArea = document.getElementById("textArea");
const charCounter = document.getElementById("charCounter");
const addPostButton = document.getElementById("formSubmit");

//load all posts
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

    //whole emoji section
    const emojiSection = document.createElement("div");
    emojiSection.classList.add("emojiSection");
    newSection.append(emojiSection)

    // emoji buttons
    const heartEmojiButton = document.createElement("button");
    heartEmojiButton.id = `heartEmojiButton_${jsonData.id}`
    const heartEmoji = document.createElement("img");
    heartEmoji.classList.add("heartEmoji");
    heartEmojiButton.append(heartEmoji);
    emojiSection.append(heartEmojiButton)
    heartEmoji.src="images/emoji1.png";

    const celebrateEmojiButton = document.createElement("button");
    celebrateEmojiButton.id = `celebrateEmojiButton_${jsonData.id}`
    const celebrateEmoji = document.createElement("img");
    celebrateEmoji.classList.add("celebrateEmoji");
    celebrateEmojiButton.append(celebrateEmoji);
    emojiSection.append(celebrateEmojiButton)
    celebrateEmoji.src="images/emoji2.png";

    const laughEmojiButton = document.createElement("button");
    laughEmojiButton.id = `laughEmojiButton_${jsonData.id}`
    const laughEmoji = document.createElement("img");
    laughEmoji.classList.add("laughEmoji");
    laughEmojiButton.append(laughEmoji);
    emojiSection.append(laughEmojiButton)
    laughEmoji.src="images/emoji3.png";


    // emoji counter list
    const emojiCounterList = document.createElement("ul")
    emojiCounterList.classList.add("emojiCounterList");
    emojiSection.append(emojiCounterList)

    const heartEmojiCounter = document.createElement("li");
    heartEmojiCounter.id = `heartEmojiCounter_${jsonData.id}`
    heartEmojiCounter.classList.add("heartEmojiCounter");
    emojiCounterList.append(heartEmojiCounter)
    heartEmojiCounter.textContent = jsonData.emojis.heart



    const celebrateEmojiCounter = document.createElement("li");
    celebrateEmojiCounter.id = `celebrateEmojiCounter_${jsonData.id}`
    celebrateEmojiCounter.classList.add("celebrateEmojiCounter");
    emojiCounterList.append(celebrateEmojiCounter)
    celebrateEmojiCounter.textContent = jsonData.emojis.celebrate

    const laughEmojiCounter = document.createElement("li");
    laughEmojiCounter.id = `laughEmojiCounter_${jsonData.id}`
    laughEmojiCounter.classList.add("laughEmojiCounter");
    emojiCounterList.append(laughEmojiCounter)
    laughEmojiCounter.textContent = jsonData.emojis.laugh

    
    heartEmojiButton.addEventListener('click', () => {    
        heartEmojiCounter.textContent ++
        const data = {
            id: jsonData.id,
            emojis: jsonData.emojis.heart,
          };
          const options = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };
          const emojiUrl = `${apiDomain}posts/emojis/update/heart`;
          fetch(emojiUrl, options)      
          .catch((error) => console.log(error));
    }, { once: true }
);

    celebrateEmojiButton.addEventListener('click', () => {
        celebrateEmojiCounter.textContent ++
        const data = {
            id: jsonData.id,
            emojis: jsonData.emojis.celebrate,
          };
          const options = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };
          const emojiUrl = `${apiDomain}posts/emojis/update/celebrate`;
          fetch(emojiUrl, options)      
          .catch((error) => console.log(error));
    }, { once: true }
)

    laughEmojiButton.addEventListener('click', () => {
        laughEmojiCounter.textContent ++
        const data = {
            id: jsonData.id,
            emojis: jsonData.emojis.laugh,
          };
          const options = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };
          const emojiUrl = `${apiDomain}posts/emojis/update/laugh`;
          fetch(emojiUrl, options)      
          .catch((error) => console.log(error));
    }, { once: true }
)

    let heartCounter = 0 
    heartEmojiButton.addEventListener('click', () => {
      console.log(heartCounter++);
    })


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
    recentComments.id = `recentComments_${jsonData.id}`

    const recentCommentsComment = document.createElement("p")
    recentCommentsComment.textContent= jsonData.comments


    addCommentButton.addEventListener('click', (e) => {
        window.location.reload()
    })
    
    
    newCommentDiv.append(recentComments);
    newCommentSection.append(newCommentDiv);
    newSection.append(newCommentSection);
    recentComments.append(recentCommentsComment);
    newCommentSection.id = jsonData.id;
    newSection.id = jsonData.id;
    document.querySelector("main").append(newSection);
    // Add a listener to our new 'add comment' button
    addCommentButton_addEventListener(jsonData.id);
  }


  // adds event listener to the post comment button
  function addCommentButton_addEventListener(id) {

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
      .then((data) => {
        newCommentTextArea.value = "";
      })
      .catch((error) => console.log(error));
  });
  }

  // adds a post to the main feed
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
