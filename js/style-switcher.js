/*=============== TOGGLE STYLE SWITCHER ====================*/

const styleToggler = document.querySelector(".style-toggler");

styleToggler.addEventListener("click", ()=>{
    document.querySelector(".style-switcher").classList.toggle("active");
})

// HIDE STYLE SWITCHER ON SCROLLING
window.addEventListener("scroll", ()=>{
    if (document.querySelector(".style-switcher").classList.contains("active")) {
        document.querySelector(".style-switcher").classList.remove("active");
    }
})


/*========================= THEME COLORS ===========================*/

const alternateStyle = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyle.forEach((style)=>{
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        }
        else{
            style.setAttribute("disabled", "true");
        }
    })
}

/*=================== DARK AND LIGHT THEME ========================*/

const dayNight = document.querySelector(".day-night");

    dayNight.addEventListener("click", ()=>{
        dayNight.querySelector("i").classList.toggle("fa-sun");
        dayNight.querySelector("i").classList.toggle("fa-moon");

        document.body.classList.toggle("dark");
    })

window.addEventListener("load", ()=>{
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-sun")
    }
    else{
        dayNight.querySelector("i").classList.add("fa-moon")
    }
})