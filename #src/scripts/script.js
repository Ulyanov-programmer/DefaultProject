'use strict'

let body = document.body;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerWidth;


// ? If you see an error here, it's normal.
@@include('_modalWindow.js');
@@include('_fsNavmenu.js');
@@include('_spoiler.js');

function showOrHideSubmenu(e) {
    const menuButton = e.target;
    const allSubmenu = document.querySelectorAll('.navmenu__submenu');
    const allMenuButtons = document.querySelectorAll('.submenu-open-button');

    // Hides all previously active menus and menu buttons.
    for (let i = 0; i < allSubmenu.length; i++) {

        if (allSubmenu[i] !== menuButton &&
            allMenuButtons[i] !== menuButton.firstElementChild) {

            allMenuButtons[i].classList.remove('show');
            allSubmenu[i].classList.remove('show');
        }
    }

    if (menuButton.firstElementChild !== undefined) {
        menuButton.classList.toggle('active');
        menuButton.firstElementChild.classList.toggle('show');
    }
}
const activateSubmenuButtons = document.querySelectorAll('.submenu-open-button');
for (let submenuButton of activateSubmenuButtons) {
    submenuButton.addEventListener('click', showOrHideSubmenu);
}

// ? Use this if you have scroll buttons.
function scrollToElement(eventData) {
    let scrollElement = document.querySelector('.' + eventData.target.dataset.scrollTo);

    if (scrollElement !== undefined) {
        let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;

        window.scrollTo({
            top: scrolltop - 50,
            behavior: "smooth"
        });
    }
}
let scrollButtons = document.querySelectorAll('[data-scroll-to]');
for (let scrollButton of scrollButtons) {
    scrollButton.addEventListener('click', scrollToElement);
}

/* ? the headerToFixed function
function headerToFixed(e) {
    // Calculating the degree of scrolling in pixels,
    // multiply the innerWindowHeight by the desired scrolling percentage as 0.percent.
    // Example:
    //  25 percent of innerWindowHeight = innerWindowHeight * 0.25
    //  5 percent of 700 = 700 * 0.05

    var scrollPercentage = innerWindowHeight * 0.15;

    if (pageYOffset > scrollPercentage) {
        burger.classList.add('burger-black');
        header.classList.add('fixed-header');
    } else {
        burger.classList.remove('burger-black');
        header.classList.remove('fixed-header');
    }
}
const header = document.querySelector('.header__body');
window.addEventListener('scroll', headerToFixed);
*/
