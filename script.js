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

let startY = 0;
let endY = 0;

function scroll(event) {
    console.log("Scroll event detected", event);
    // Your scroll event logic here
}

document.addEventListener('touchstart', function(event) {
    startY = event.touches[0].clientY;
});

document.addEventListener('touchmove', function(event) {
    endY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    let deltaY = endY - startY;
    console.log(deltaY);
    if (deltaY > 100) { // Swipe down
        scroll({type: 'swipe', direction: 'down', deltaY: -deltaY});
    }
    else if(deltaY < -100) {
        scroll({type: 'swipe', direction: 'down', deltaY: -deltaY});
    }
});

function scroll(event){
    if(!isTransitioning){
        
        if(event.deltaY < 0) {
            changePage(false);
        }
        else {
            changePage(true);
        }
        isTransitioning = true;
        setTimeout(() => {
            isTransitioning = false;
        }, 1500);

        

        
        
    }
}


function updateBlips() {
    const blips = document.querySelectorAll('.blip');
    blips.forEach((blip, index) => {
        if (index + 1 === current_page) {
            blip.classList.remove('off');
            blip.classList.add('on');
        } else {
            blip.classList.remove('on');
            blip.classList.add('off');
        }
    });

    
}

function changePage(down){
    if (down) {
        if (current_page < MAX_PAGE) {
            let curr = document.querySelector(`#page${current_page}`);
            let next = document.querySelector(`#page${current_page + 1}`);
            if (curr && next) {
                curr.style.transform = "translateY(-125%)";
                next.style.transform = "translateY(0%)";
                current_page += 1;
                updateURLFragment();
            }
        }
    }
    else {
        if (current_page > MIN_PAGE) {
            let curr = document.querySelector(`#page${current_page}`);
            let next = document.querySelector(`#page${current_page - 1}`);
            if (curr && next) {
                curr.style.transform = "translateY(125%)";
                next.style.transform = "translateY(0%)";
                current_page -= 1;
                updateURLFragment();
            }
            
        }
    }
    updateNavigationUnderline();
    updateBlips();
    let downarrows = document.querySelectorAll(".down-arrow");
    if(downarrows) {
        downarrows.forEach(downarrow => downarrow.remove());
    }
    
}

document.addEventListener('keydown', async (event) => {

    // if(isRotating) {
    //     return;
    // }

    if (event.key === 'ArrowDown') {
        changePage(true);
        console.log("hi")
    }
    if (event.key === 'ArrowUp') {
        changePage(false);
    }
});
function updateURLFragment() {
    let sectionName;
    switch(current_page) {
        case HOME:
            sectionName = "home";
            break;
        case PROJECTS:
            sectionName = "projects";
            break;
        case ABOUTME:
            sectionName = "aboutme";
            break;
        case CONTACT:
            sectionName = "contact";
            break;
    }
    history.pushState(null, null, `#${sectionName}`);
}


function updateNavigationUnderline() {
    const buttons = {
        home: document.querySelector("#home"),
        projects: document.querySelector("#projects"),
        aboutme: document.querySelector("#aboutme"),
        contact: document.querySelector("#contact")
    };
    
    // Remove underline class from all buttons
    Object.values(buttons).forEach(button => button.classList.remove("underline"));

    // Add underline class to the current page's button
    switch(current_page) {
        case HOME:
            buttons.home.classList.add("underline");
            break;
        case PROJECTS:
            buttons.projects.classList.add("underline");
            break;
        case ABOUTME:
            buttons.aboutme.classList.add("underline");
            break;
        case CONTACT:
            buttons.contact.classList.add("underline");
            break;
    }
}

let logo_button = document.querySelector("#logo");

logo_button.addEventListener("click", (e) => {
    executeDelayed(current_page, HOME);
});



let home_button = document.querySelector("#home");

home_button.addEventListener("click", (e) => {
    executeDelayed(current_page, HOME);
});

let home_blip = document.querySelector("#homeblip");
home_blip.addEventListener("click", (e) => {
    executeDelayed(current_page, HOME);
});



let projects_button = document.querySelector("#projects")

projects_button.addEventListener("click", (e) => {
    executeDelayed(current_page, PROJECTS);
});

let project_blip = document.querySelector("#projects-blip");
project_blip.addEventListener("click", (e) => {
    executeDelayed(current_page, PROJECTS);
});

let aboutme_button = document.querySelector("#aboutme")

aboutme_button.addEventListener("click", (e) => {
    executeDelayed(current_page, ABOUTME);
});

let aboutme_blip = document.querySelector("#aboutme-blip");
aboutme_blip.addEventListener("click", (e) => {
    executeDelayed(current_page, ABOUTME);
});

let contact_button = document.querySelector("#contact")

contact_button.addEventListener("click", (e) => {
    executeDelayed(current_page, CONTACT);
});

let contact_blip = document.querySelector("#contact-blip");
contact_blip.addEventListener("click", (e) => {
    executeDelayed(current_page, CONTACT);
});

function executeDelayed(curr, dest) {
    current_page = curr;

    // scroll up
    if(curr > dest) {
        setTimeout(() => {
            changePage(false);
            executeDelayed(curr-1, dest);
        }, 100 * Math.abs(4-curr-dest));
    }

    if(curr < dest) {
        setTimeout(() => {
            changePage(true);
            executeDelayed(curr+1, dest);
        }, 100 * Math.abs(-6+curr+dest));
    }
    updateNavigationUnderline();
}
function navigateToSectionFromURL() {
    const fragment = window.location.hash.substring(1);
    switch(fragment) {
        case "home":
            current_page = HOME;
            break;
        case "projects":
            current_page = PROJECTS;
            break;
        case "aboutme":
            current_page = ABOUTME;
            break;
        case "contact":
            current_page = CONTACT;
            break;
        default:
            current_page = HOME;
    }
    const homePage = document.querySelector(`#page1`);
    if (homePage) {
        // homePage.style.transition = 'none'; // Disable transition
        homePage.style.transform = "translateY(-125%)";
        // homePage.style.transform = 'transform 0.75s ease-in-out';
    }

    if(current_page === ABOUTME) {
        const projectPage = document.querySelector(`#page2`);
        if (projectPage) {
            // homePage.style.transition = 'none'; // Disable transition
            projectPage.style.transform = "translateY(-125%)";
            // homePage.style.transform = 'transform 0.75s ease-in-out';
        }
    }

    if(current_page === CONTACT) {
        const projectPage = document.querySelector(`#page2`);
        if (projectPage) {
            // homePage.style.transition = 'none'; // Disable transition
            projectPage.style.transform = "translateY(-125%)";
            // homePage.style.transform = 'transform 0.75s ease-in-out';
        }
        const aboutmePage = document.querySelector(`#page3`);
        if (aboutmePage) {
            // homePage.style.transition = 'none'; // Disable transition
            aboutmePage.style.transform = "translateY(-125%)";
            // homePage.style.transform = 'transform 0.75s ease-in-out';
        }
    }

    const targetPage = document.querySelector(`#page${current_page}`);
    if (targetPage) {
        targetPage.style.transform = "translateY(0%)";
    }
}

navigateToSectionFromURL();
updateNavigationUnderline();
updateBlips();


// for rubik cube

let app = document.getElementById("app");
app.width = 360;
app.height = 360;
let ctx = app.getContext("2d");
let w = null;

let A = 0.0;
let B = 0.0;
let C = 0.0;

let dt = 0;
let mode = 0;
let dimension= 3;

app.addEventListener("click", function() {
    dimension += 1;

    if(dimension === 7){
        dimension = 2;
    }
});

let toRotate= 0;
let direction = 0;

let magnitude = 0.5

let angleJump = 20;
let turnSpeed = 5;

let speed = 0.01;

let spinning = false;

let isRotating = false;

let loc = 0;

const MAX_DIMENSION = 10;
const MAX_CUBES = (MAX_DIMENSION * MAX_DIMENSION * MAX_DIMENSION - (MAX_DIMENSION-2) * (MAX_DIMENSION-2) * (MAX_DIMENSION-2));

startDemo();
let intervalID;

function spin(instance, dt) {
        dt += 1; // Increment dt by 1 every second
        A += speed;
        B += speed;
        C += speed/4;
        render(instance, dt, A, B, C, dimension, mode, loc); // Interval set to 1000ms (1 second)
}
async function startDemo() {
    const response = await fetch('abcd.wasm');
    const bytes = await response.arrayBuffer();
    const {instance} = await WebAssembly.instantiate(bytes);
    // instance.exports.resetFaces(1);
    render(instance, dt, A, B, C, dimension, mode, loc);

    setInterval(() => {
        if(!isRotating) {
            spin(instance, dt);
            dt += 1;
        }
    }, 150); 
    
    mode_count = 0
    loc_count = 0
    dir = 0

    var interv = setInterval(() => {
        spin(instance, dt);
        randomMove(instance, mode_count, loc_count, dir);

        mode_count = !mode_count;
        
        if(mode_count != dir){
            dir = !dir;
        }

        console.log("spin")

        // if(loc_count == 1) {
        //     loc_count += 1;
        // }

    }, 1500); 


    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
async function scramble(instance) {
    for(let i=0; i<100; i++) {
        let rand_mode = getRandomInt(3);
        let rand_loc = getRandomInt(dimension);
        render(instance, dt, A, B, C, dimension, rand_mode, rand_loc, 1, direction, 0);
        await new Promise(resolve => setTimeout(resolve, turnSpeed));
    }
}

async function randomMove(instance, mode, loc, direction) {
    if(!direction) {
        isRotating = true;
        for (let i = 1; i < 90; i += angleJump){
            render(instance, dt, A, B, C, dimension, mode, loc, toRotate, direction, i);
            await new Promise(resolve => setTimeout(resolve, turnSpeed));
        }
        toRotate = 1;
        direction = 0;
        render(instance, dt, A, B, C, dimension, mode, loc, toRotate, direction, 0);
        isRotating = false;
        toRotate = 0;
    }
    else {
        isRotating = true;
        for (let i = -1; i > -90; i -= angleJump){
            render(instance, dt, A, B, C, dimension, mode, loc, toRotate, direction, i);
            await new Promise(resolve => setTimeout(resolve, turnSpeed));
        }
        toRotate = 1;
        direction = 1;
        render(instance, dt, A, B, C, dimension, mode, loc, toRotate, direction, 0);
        isRotating = false;
        toRotate = 0;
    }
}

function render(instance, dt, A, B, C, dimension, mode, loc, toRotate, direction, angle) {
    const pixels = instance.exports.render(dt, A, B, C, dimension, mode, loc, toRotate, direction, angle);
    const buffer = instance.exports.memory.buffer;
    const imageData = new ImageData(new Uint8ClampedArray(buffer, pixels, app.width * app.height * 4), app.width);
    ctx.putImageData(imageData, 0, 0);
}

function takeControl(instance) {
    document.addEventListener('keydown', async (event) => {

        // if(isRotating) {
        //     return;
        // }

        if (event.key === 'w') {
            A += magnitude;
            dt++;
        } else if (event.key === 's') {
            A -= magnitude;
        } else if (event.key === 'd') {
            B += magnitude;
        } else if (event.key === 'a') {
            B -= magnitude;
        } else if (event.key === 'j') {
            C += magnitude;
        } else if (event.key === 'k') {
            C -= magnitude;
        } else if (event.key === 'p') {
            if (!spinning) {
                spinning = true;
                spin(instance, dt);
            } else {
                spinning = false;
                clearInterval(intervalID);
            }
        } else if (event.key === 'i') {
            speed *= 2;
        } else if (event.key === 'o') {
            speed /= 2;
        } else if (event.key === ',') {
            if (loc < dimension - 1) loc += 1;
        } else if (event.key === '.') {
            if (loc > 0) loc -= 1;
        } else if (event.key === 'm') {
            mode = (mode + 1) % 3;
        } else if (event.key === 'r') {
            if(dimension === 1) {
                return;
            }
            isRotating = true;
            for (let i = 1; i < 90; i += angleJump){
                render(instance, dt, A, B, C, dimension, mode, loc, toRotate, direction, i);
                await new Promise(resolve => setTimeout(resolve, turnSpeed));
            }
            toRotate = 1;
            direction = 0;
            isRotating = false;
        } else if (event.key === 'R') {
            if(dimension === 1) {
                return;
            }
            isRotating = true;
            for (let i = -1; i > -90; i -= angleJump){
                render(instance, dt, A, B, C, dimension, mode, loc, toRotate, direction, i);
                await new Promise(resolve => setTimeout(resolve, turnSpeed));
            }
            toRotate = 1;
            direction = 1;
            isRotating = false;
        } else if (event.key === '-') {
            loc = 0;
            dimension -= 1;
            if(dimension < 1) {
                dimension = 1;
            }
        } else if (event.key === '=') {
            loc = 0;
            dimension += 1;
        } else if (event.key === 'S') {
            await scramble(instance);
        } else if (event.key === 'c') {
            A = 0;
            B = 0;
            C = 0;
        }
        render(instance, dt, A, B, C, dimension, mode, loc, toRotate, direction, 0);
        toRotate = 0;
    });
}

