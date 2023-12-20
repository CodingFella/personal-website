let current_page = 1;
const MIN_PAGE = 1;
const MAX_PAGE = 4;
const HOME = 1;
const PROJECTS = 2;
const ABOUTME = 3;
const CONTACT = 4;

let lastScrollTop = 0;
let isTransitioning = false;

document.onwheel = scroll;

function scroll(event){
    if(!isTransitioning){
        console.log(event.deltaY)
        if(event.deltaY < 0) {
            console.log("scroll up");
            changePage(false);
        }
        else {
            console.log("scroll down");
            changePage(true);
        }
        isTransitioning = true;
        setTimeout(() => {
            isTransitioning = false;
        }, 1500);
    }
}

function changePage(down){
    if (down) {
        if (current_page < MAX_PAGE) {
            let curr = document.querySelector(`#page${current_page}`);
            let next = document.querySelector(`#page${current_page + 1}`);
            console.log(curr);
            if (curr && next) {
                console.log("wassupp")
                curr.style.transform = "translateY(-100%)";
                next.style.transform = "translateY(0%)";
                current_page += 1;
            }
            setTimeout(() => {
                let downarrow = document.querySelector(".down-arrow");
                if(downarrow) {
                    downarrow.remove();
                }
            }, 1500);
        }
    }
    else {
        if (current_page > MIN_PAGE) {
            let curr = document.querySelector(`#page${current_page}`);
            let next = document.querySelector(`#page${current_page - 1}`);
            console.log(curr);
            if (curr && next) {
                curr.style.transform = "translateY(100%)";
                next.style.transform = "translateY(0%)";
                current_page -= 1;
            }
        }
    }
}

let logo_button = document.querySelector("#logo")

logo_button.addEventListener("click", (e) => {
    console.log("logo");
    executeDelayed(current_page, HOME);
});



let home_button = document.querySelector("#home")

home_button.addEventListener("click", (e) => {
    console.log("home");
    executeDelayed(current_page, HOME);
});

let projects_button = document.querySelector("#projects")

projects_button.addEventListener("click", (e) => {
    console.log("projects")
    executeDelayed(current_page, PROJECTS);
});

let aboutme_button = document.querySelector("#aboutme")

aboutme_button.addEventListener("click", (e) => {
    console.log("aboutme")
    executeDelayed(current_page, ABOUTME);
});

let contact_button = document.querySelector("#contact")

contact_button.addEventListener("click", (e) => {
    console.log("contact")
    executeDelayed(current_page, CONTACT);
});

function executeDelayed(curr, dest) {
    current_page = curr;

    // scroll up
    if(curr > dest) {
        setTimeout(() => {
            console.log("hi");
            changePage(false);
            executeDelayed(curr-1, dest);
        }, 100 * Math.abs(4-curr-dest));
    }

    if(curr < dest) {
        setTimeout(() => {
            console.log("hi");
            changePage(true);
            executeDelayed(curr+1, dest);
        }, 100 * Math.abs(4-curr-dest));
    }
}