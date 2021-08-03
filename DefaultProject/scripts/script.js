'use strict'

let body = document.body;
let innerWindowWigth = window.innerWidth;
let innerWindowHeight = window.innerWidth;


// ? If you see an error here, it's normal.
// Variables for work modal window 
// ! I don`t recommend to use references for open and close modal windows.

let modalLinks = document.querySelectorAll('[data-modal-link]');
for (let modalLink of modalLinks) {
    modalLink.addEventListener("click", function (e) {
        let popupId = modalLink.dataset.modalLink;

        if (popupId !== undefined) {
            let modal = document.getElementById(popupId);
            showOrHideModal(modal);
        }
    });
}

let modalClosers = document.querySelectorAll('.modal-closer');
for (const modalCloser of modalClosers) {
    modalCloser.addEventListener("click", function (e) {
        closeModal(modalCloser.closest('.modal-window'), true);
    });
}

// When the body loses scrolling, the page may shift.
// To fix this, it will be padded in the size of the scrollbar.
let scrollbarWidth = window.innerWidth - document.querySelector('html').clientWidth;

// This is to prevent the new modal from opening too quickly.
let unlock = true;

// Transition time FROM modal window style (in seconds or .number).
const transitionTimeout = 0.5;


function showOrHideModal(modalElement) {
    if (modalElement && unlock) {
        let activeModal = document.querySelector('.modal-window.active');

        if (activeModal) {
            closeModal(activeModal, false);
        } else {
            toggleBodyScroll(false);
        }

        modalElement.classList.add("active");
    }
    modalElement.addEventListener("click", function (e) {

        // Checks if the pressed element has a CONTENT parent, if not, closes the modal.
        if (!e.target.closest('.modal-window__content')) {
            closeModal(modalElement, true);
        }
    })
}

function closeModal(modalWindow, bodyIsScrollable) {
    if (unlock) {
        modalWindow.classList.remove("active");

        if (bodyIsScrollable) {
            toggleBodyScroll(true);
        }
    }
}
function toggleBodyScroll(toggleScrollOn) {

    if (toggleScrollOn) {
        // Prevents the modal shifting after it is closed.
        setTimeout(function () {
            body.style.paddingRight = 0;
            body.classList.remove("fixed");
        }, transitionTimeout * 1000);
    } else {
        body.style.paddingRight = scrollbarWidth + 'px';
        body.classList.add('fixed');
    }

    unlock = false;
    // Prevents a new window from opening too quickly.
    setTimeout(function () {
        unlock = true;
    }, transitionTimeout * 1000);
}

document.addEventListener('keydown', function (key) {
    if (key.code === 'Escape') {
        let activeModal = document.querySelector('.modal-window.active');
        closeModal(activeModal, true);
    }
});

;

function showOrHideFullscreenNav(e) {
    const fsNavmenu = document.querySelector('.fullscreen-navmenu');

    if (fsNavmenu !== undefined) {
        burger.classList.toggle('active');
        body.classList.toggle('fixed');
        fsNavmenu.classList.toggle('active');
    }
}
const burger = document.querySelector('#burgerButton');
burger.addEventListener('click', showOrHideFullscreenNav);

function showOrHideSubmenu(e) {
    const submenu = document.querySelector('.navmenu__submenu');

    if (submenu !== undefined) {
        activateSubmenuButton.classList.toggle('active');
        submenu.classList.toggle('show');
    }
}
const activateSubmenuButton = document.getElementById('submenu-open-button');
activateSubmenuButton.addEventListener('click', showOrHideSubmenu);

<<<<<<< HEAD
// function headerToFixed(e) {
//     // Calculating the degree of scrolling in pixels, 
//     // multiply the innerWindowHeight by the desired scrolling percentage as 0.percent.
//     /* Example:
//         25 percent of innerWindowHeight = innerWindowHeight * 0.25 
//         5 percent of 700 = 700 * 0.05
//     */
//     var scrollPercentage = innerWindowHeight * 0.15;

//     if (pageYOffset > scrollPercentage) {
//         burger.classList.add('burger-black');
//         header.classList.add('fixed-header');
//     } else {
//         burger.classList.remove('burger-black');
//         header.classList.remove('fixed-header');
//     }
// }
// const header = document.querySelector('.header__body');
// window.addEventListener('scroll', headerToFixed);
=======
// ? Use this if you have scroll buttons.
function scrollToElement(eventData) {
    let scrollElement = document.querySelector('.' + eventData.target.dataset.scrollTo);

    if (scrollElement !== undefined) {
        scrollElement.scrollIntoView({ block: "start", behavior: "smooth" });
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
>>>>>>> DefaultTemplate
