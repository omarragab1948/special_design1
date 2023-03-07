let mainColor = localStorage.getItem("color-option");
if(mainColor !== null){
    document.documentElement.style.setProperty("--main-color", mainColor);
}
let backgroundOption = true;
let backgroundLocalItem = localStorage.getItem("background_option");
if(backgroundLocalItem !== null){
    document.querySelectorAll(".random-background span").forEach(element =>{
        element.classList.remove("active");
    })
    if(backgroundLocalItem === "true"){
        backgroundOption = true;
        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".random-background .no").classList.add("active");
    }
}
//create bullets scroll
let bullets = document.querySelectorAll(".nav-bullets .bullet");
let links = document.querySelectorAll(".navbar .navbar-nav a")
function scrolling(element){
    element.forEach(el =>{
        el,addEventListener("click", (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrolling(bullets);
scrolling(links);

function handleActive(el){       
    //Remove Active Class From All Children
    el.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active")
    });
    // Add Active Class On Self
    el.target.classList.add("active");
}

document.querySelector(".setting-box .fa-gear").onclick = function(){
    //Toggle Class Fa-spin For Rotation On Self
    this.classList.toggle("fa-spin");
    //Toggle Class Open On Main Setting Box
    document.querySelector(".setting-box").classList.toggle("open")
 }

 // Switch Colors
let colorlList = document.querySelectorAll(".color-list li");
// Loop On All List Items
colorlList.forEach(li => {
    // Click On Every List Items
    li.addEventListener("click", (e) => {
        // Set Color On Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        //Set Color On Local Storage
        localStorage.setItem("color-option", e.target.dataset.color);

        //Remove Active Class From All Children
        handleActive(e); 
    })
})

let  backgroundState = true;

let backgroundInterval;

// Switch Backgrounds Randomly
const randBackEl = document.querySelectorAll(".random-background span");
// Loop On All List Items
randBackEl.forEach(span => {
    // Click On Every Span
    span.addEventListener("click", (el) => {
       
        handleActive(el);

        if(el.target.dataset.background === "yes"){
            backgroundState = true;
            randomizeImages();
            localStorage.setItem("background_option", true);
        }else{
           backgroundState = false;
           clearInterval(backgroundInterval);
           localStorage.setItem("background_option", false);
       }
    })

})

//Select Landing Page Element 
let landPage = document.querySelector(".landing-page");
    
// Get Array Of Images 
let imgArray = ["01.jpg" , "02.png" , "03.jpg" , "04.jpg" , "05.jpg"];


function randomizeImages(){

    if(backgroundState === true){
    
        backgroundInterval = setInterval( () =>{
    
            //Get Random Number  
            let randomNumber = Math.floor(Math.random() * imgArray.length);
        
            //Change Background Image Url
            landPage.style.backgroundImage = `url(/images/${imgArray[randomNumber]})`;
          
        }, 6000);
    } 
}

randomizeImages()
// create pop up with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        //create overlay element
        let overlay = document.createElement("div");
        //add class to overlay
        overlay.className = "popup-overlay";
        //add overlay to the body
        document.body.appendChild(overlay);
        // create popup box
        let popupBox = document.createElement("div");
        //add class to popupBox
        popupBox.className = "popup-box col-8 ";
        if(img.alt !== null){
            //create heading
            let imageHeading = document.createElement("h2");
            //create image text
            let imageText = document.createTextNode(img.alt);
            //add image alt to heading 
            imageHeading.appendChild(imageText);
            //add heading in popup box
            popupBox.appendChild(imageHeading)
        }
        //create span to close popup
        let closePopup = document.createElement("span");
        //add class to span
        closePopup.className = "close-popup";
        //create span text
        let spanText = document.createTextNode("X");
        //add text to span
        closePopup.appendChild(spanText);
        //add span to popup box
        popupBox.appendChild(closePopup);
        //create popup image 
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        //add popup image in popup box
        popupBox.appendChild(popupImage);
        //add popup box in the body 
        document.body.appendChild(popupBox);

    })
}) 
document.addEventListener("click", (e) =>{
    if(e.target.className === "close-popup"){
        document.querySelector(".popup-overlay").remove();
        document.querySelector(".popup-box").remove();
    }
})

// Show & Hide Bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
bulletsSpan.forEach(span =>{
    span.addEventListener("click", (e) => {
        if(span.dataset.display === "show"){
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets-option", "block")
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", "none")

        }
        handleActive(e);
    })
})

// local storage of bullets
let bulletLocalStorage = localStorage.getItem("bullets-option");
if(bulletLocalStorage !== null){
    bulletsSpan.forEach(span =>{
         span.classList.remove("active");
    });
    if(bulletLocalStorage === "block"){
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}
// create reset
document.querySelector(".reset-options").onclick = function(){
    localStorage.removeItem("color-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");

    window.location.reload();
}
//Toggle Menu
let toggleMenu = document.querySelector(".links-container .fa-solid");
let tLinks = document.querySelector(".links-container .links");

toggleMenu.onclick = function(){
    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");
    // Toggle Class "menu-active" On Links
    tLinks.classList.toggle("open");
}

//Click Anywhere Outside Menu & Toggle Button
document.addEventListener("click", (e) =>{
    if(e.target !== toggleMenu && e.target !== tLinks){
    // Toggle Class "menu-active" On Button
    toggleMenu.classList.remove("menu-active");
    // Toggle Class "menu-active" On Links
    tLinks.classList.remove("open");
    }

});

//stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}
 