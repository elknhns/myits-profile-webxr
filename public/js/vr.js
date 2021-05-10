var menu = document.querySelector("#menu")
var buttons = document.querySelectorAll(".menu-button")

setButtonVisibility()

document.addEventListener('keydown', function (event) {
    let details = profile.children[1]
    if (event.key === 'q') {
        if (details.getAttribute('visible')) {
            details.setAttribute('visible', 'false')
            details.previousElementSibling.setAttribute('visible', 'true')
        } else {
            details.setAttribute('visible', 'true')
            details.previousElementSibling.setAttribute('visible', 'false')
        }
    }
})

function setButtonVisibility() {
    menu.addEventListener('zappar-visible', function () {
        buttons.forEach((button) => {
            button.setAttribute('visible', 'true')
            button.setAttribute('mixin', 'menu-section animated')
            label.setAttribute('visible', 'true')
        })
    })
    menu.addEventListener('zappar-notvisible', function () {
        buttons.forEach((button) => {
            button.setAttribute('visible', 'false')
            button.setAttribute('mixin', 'menu-section')
            label.setAttribute('visible', 'false')
        })
    })
}