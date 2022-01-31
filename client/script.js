
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
