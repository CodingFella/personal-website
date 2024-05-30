let home_button = document.querySelector("#home1")

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