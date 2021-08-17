let body = document.body;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;

// ? If you see an error here, it's normal.
@@include('_modalWindow.js');
@@include('_spoiler.js');


function appendInfoModalMenu(e) {
    let targetContentPreview = e.currentTarget;
    let modalElementClone = modalElement.cloneNode(true);

    modalElementClone.classList.remove('_non-active');

    targetContentPreview.append(modalElementClone);
    modalElementClone.classList.add('_active');
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

function changeContentWidth(inputEvent) {
    let albumContentWidth = 260;
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
const albumElements = document.querySelectorAll('.album-element');
const rangeInput = document.querySelector('#blockSizer');

rangeInput.addEventListener('input', changeContentWidth);

rangeInput.oncontextmenu = function (event) {
    if (event.which == 3) {
        albumElements.forEach(element => {
            element.style.width = '';
        });
        rangeInput.value = 0;
    }
    return false;
}