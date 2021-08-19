let body = document.body;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;

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

// When the body loses scrolling, the page may shift.
// To fix this, it will be padded in the size of the scrollbar.
function returnScrollbarWidth() {
    let scrollbarWidth = innerWindowWidth() - document.querySelector('html').clientWidth;
    
    return scrollbarWidth;
}

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
}

document.addEventListener('keydown', function (key) {
    if (key.code === 'Escape') {
        let activeModal = document.querySelector('.modal-window.active');
        closeModal(activeModal, true);
    }
});

;
let spoilerButtons = document.querySelectorAll('[data-spoiler-button]');
let spoilerContentElements = document.querySelectorAll('[data-spoiler-content]');

function toggleToSpoilers(e) {
    if (spoilerContentElements.length > 0 &&
        spoilerButtons.length == spoilerContentElements.length) {
        for (let index = 0; index < spoilerContentElements.length; index++) {

            if (innerWindowHeight() <= 500) {
                spoilerContentElements[index].classList.add('spoiler-content');
                spoilerButtons[index].classList.add('spoiler-button');
            } else {
                spoilerContentElements[index].classList.remove('spoiler-content');
                spoilerButtons[index].classList.remove('spoiler-button');
            }
        }

        for (let spoilerButton of spoilerButtons) {
            spoilerButton.addEventListener('click', toggleSpoilerState);
        }
    }
}

function toggleSpoilerState(event) {
    let targetSpoilerButton = event.target;
    let spoilerContainer = targetSpoilerButton.nextElementSibling;

    targetSpoilerButton.classList.toggle('active');
    spoilerContainer.classList.toggle('active');
}

// Determines spoilers when the page is loaded and when it is resized.
toggleToSpoilers();
window.addEventListener(`resize`, toggleToSpoilers);;


function appendInfoModalMenu(e) {
    let targetContentPreview = e.currentTarget;
    let modalElementClone = modalElement.cloneNode(true);

    modalElementClone.classList.remove('_non-active');

    targetContentPreview.append(modalElementClone);
    setTimeout(function () {
        modalElementClone.classList.add('_active');
    }, 30)
}
function removeInfoModalMenu(e) {
    // Try to get modal block.
    let modalMenu = e.currentTarget.lastElementChild;

    if (modalMenu.classList.contains("modal-content-info")) {
        modalMenu.classList.remove("_active")
        setTimeout(function () {
            modalMenu.remove();
        }, 200)
    }
}
const contentElements = document.querySelectorAll('.album-element__preview');
const modalElement = document.querySelector('.modal-content-info');

contentElements.forEach(element => {
    element.addEventListener("mouseenter", appendInfoModalMenu);
    element.addEventListener("mouseleave", removeInfoModalMenu);
});

function changeContentWidthByWheel(inputEvent) {
    let elementsWasResized = albumElements[0].style.width !== "";
    let scrollFactor = -0.01;
    if (inputEvent.deltaY < 100 && inputEvent.deltaY > 0 || inputEvent.deltaY > -100 && inputEvent.deltaY < 0) {
        scrollFactor = -0.1;
    }
    // Takes resize (scroll) value and rounding to the integer.
    // You can change the step by changing the value scrollFactor.
    
    let changeSize = parseInt(inputEvent.deltaY * scrollFactor);

    let oldContentWidth = albumContentWidth;
    if (elementsWasResized) {
        oldContentWidth = parseInt(albumElements[0].style.width.replace("px", ""));
    }
    let newContentWidth;

    if (changeSize >= 0) {
        newContentWidth = oldContentWidth + changeSize;
    } else {
        newContentWidth = oldContentWidth - Math.abs(changeSize);
    }
    // Does not allow you to change the size 
    // if it is below the permissible values of min and max in the range input.
    if (newContentWidth <= albumContentWidth + 102 && newContentWidth >= albumContentWidth - 102) {
        albumElements.forEach(element => {
            element.style.width = newContentWidth + "px";
        });
        // Changes the position of the slider.
        if (changeSize <= 0) {
            inputEvent.target.value = parseInt(inputEvent.target.value) - Math.abs(changeSize);
        } else {
            inputEvent.target.value = parseInt(inputEvent.target.value) + changeSize;
        }
    }
}

function changeContentWidthByClick(inputEvent) {
    let changeSize = parseInt(inputEvent.currentTarget.value);
    let newContentWidth;

    if (changeSize >= 0) {
        newContentWidth = albumContentWidth + changeSize;
    } else {
        changeSize = Math.abs(changeSize)
        newContentWidth = albumContentWidth - changeSize;
    }

    albumElements.forEach(element => {
        element.style.width = newContentWidth + "px";
    });
}
let albumContentWidth = 260;
const albumElements = document.querySelectorAll('.album-element');
const rangeInput = document.querySelector('#blockSizer');

rangeInput.addEventListener('input', changeContentWidthByClick);
rangeInput.onwheel = (arg) => {
    changeContentWidthByWheel(arg);
    return false;
}
rangeInput.oncontextmenu = (event) => {
    if (event.which == 3) {
        albumElements.forEach(element => {
            element.style.width = '';
        });
        rangeInput.value = 0;
    }
    return false;
}