var menu = document.querySelector("#menu")
var buttons = document.querySelectorAll(".button")

setButtonVisibility()

function setButtonVisibility() {
    menu.addEventListener('zappar-visible', function () {
        buttons.forEach(function (button) {
            button.setAttribute('visible', 'true')
        })
    })
    menu.addEventListener('zappar-notvisible', function () {
        buttons.forEach(function (button) {
            button.setAttribute('visible', 'false')
        })
    })
}