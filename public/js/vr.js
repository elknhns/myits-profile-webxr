var menu = document.querySelector("#menu")
var buttons = document.querySelectorAll(".button")

setButtonVisibility()

function setButtonVisibility() {
    menu.addEventListener('zappar-visible', function () {
        buttons.forEach((button) => {
            button.setAttribute('visible', 'true')
            button.setAttribute('mixin', 'button animated')
        })
    })
    menu.addEventListener('zappar-notvisible', function () {
        buttons.forEach((button) => {
            button.setAttribute('visible', 'false')
            button.setAttribute('mixin', 'button')
        })
    })
}