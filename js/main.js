
// CAMELCASING

/*=========== NAVIGATION MENU =========================*/

(()=>{
    const hamburgerBtn = document.querySelector('.hamburger-btn'),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = document.querySelector(".close-nav");

    hamburgerBtn.addEventListener('click', showNav);
    closeNavBtn.addEventListener('click', closeNav);

    function showNav(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    function closeNav(){
        navMenu.classList.remove("open");
        fadeOutEffect()
        bodyScrollingToggle();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }

    document.addEventListener("click", (event)=>{
        if (event.target.classList.contains('link-item')) {

            if (event.target.hash !== ""){

                event.preventDefault();
                const hash = event.target.hash;

                // DEACTIVATE EXISTING SECTION
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                // ACTIVATE NEW SECTION
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                // DEACTIVATING NAVIGATION MENU ITEM
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                if (navMenu.classList.contains("open")) {

                    // ACTIVATE NEW NAVIGATION MENU ITEM
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");

                    // HIDE NAVIGATION MENU
                    closeNav();
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item)=>{
                        if (hash === item.hash) {
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // ADD # TO URL
                window.location.hash = hash;
            }
        }
    })

})();

(()=>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) =>{

        // CHECKS IF TARGET CONTAINS 'TAB-ITEM' CLASS AND DOES NOT CONTAIN 'ACTIVE' CLASS

        if(event.target.classList.contains("tab-item") &&
        !event.target.classList.contains("active")){

            const target = event.target.getAttribute("data-target");

            // DEACTIVATING EXISTING TAB ITEM
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            // ACTIVATING NEW TAB ITEM
            event.target.classList.add("active", "outer-shadow");

            // DEACTIVATING EXISTING ACTIVE TAB CONTENT
            aboutSection.querySelector(".tab-content.active").classList.remove("active");

            // ACTIVATING NEW TAB CONTENT
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}

/* ============================== PORTFOLIO FILTER AND POPUP ===========================*/

(() =>{
    const filterCount = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = document.querySelector(".pp-prev"),
    nextBtn = document.querySelector(".pp-next"),
    closeBtn = document.querySelector(".pp-close"),
    projectDetailContainer = document.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    // FILTER PORTFOLIO ITEMS
    filterCount.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") &&
        !event.target.classList.contains("active")){
             // DEACTIVATING EXISTING FILTER ITEM
             filterCount.querySelector(".active").classList.remove("outer-shadow", "active");

             // ACTIVATING NEW FILTER ITEM
             event.target.classList.add("active", "outer-shadow");
             const target = event.target.getAttribute("data-heading");
             portfolioItems.forEach((item) =>{
                 if(target === item.getAttribute("data-category") || target === 'all'){
                     item.classList.remove("hide");
                     item.classList.add("show");
                 }
                 else{
                     item.classList.remove("show");
                     item.classList.add("hide");
                 }
             })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) =>{
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);

            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshot");

            // CONVERT SCREENSHOTS INTO ARRAY

            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display= "none";
                nextBtn.style.display= "none";
            }else{
                prevBtn.style.display= "block";
                nextBtn.style.display= "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if (projectDetailContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // ACTIVATE LOADER UNTIL THE POPUPIMG  LOADES
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // DEACTIVATE LOADER AFTER THE POPUPIMG LOADS
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    nextBtn.addEventListener('click', () =>{
        if (slideIndex === screenshots.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        popupSlideshow();

    })

    prevBtn.addEventListener('click', () =>{
        if (slideIndex === 0){
            slideIndex = screenshots.length-1
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails(){
        // IF PROJECT HAS NO DETAILS
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display="none";
            return;
        }
        projectDetailsBtn.style.display="block";
        // GET THE PROJECT DETAILS
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category;
    }

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if (projectDetailContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailContainer.classList.remove('active');
            projectDetailContainer.style.maxHeight = 0 + "px";
        }else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailContainer.classList.add('active');
            projectDetailContainer.style.maxHeight = projectDetailContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailContainer.offsetTop);
        }
    }
})();

/*============================ TESTIMONIAL SLIDER ===============================*/

(() =>{
    const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item");
    slideWidth = sliderContainer.offsetWidth;
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = document.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    // SET WIDTH OF ALL SIDES

    slides.forEach((slide) =>{
        slide.style.width = slideWidth + "px";
    })

    // SET WIDTH OF SLIDECONTAINER

    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", ()=>{
        if (slideIndex === slides.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        slider()
    })

    prevBtn.addEventListener("click", ()=>{
        if (slideIndex === 0){
            slideIndex = slides.length-1;
        }
        else{
            slideIndex--;
        }
        slider()
    })
    
    function slider(){
        // DEACTIVATE EXISTING SLIDE
        sliderContainer.querySelector(".testi-item.active").classList.remove('active');
        // ACTIVATE NEW SLIDE
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();

})();

/*==========================HIDE ALL SECTIONS EXCEPT ACTIVE ================================= */

(()=>{
    const sections = document.querySelectorAll(".section");
    sections.forEach((section)=>{
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })
})();

window.addEventListener("load", ()=> {
    // PRELOADER
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(()=>{
        document.querySelector(".preloader").style.display="none";
    },600)
})