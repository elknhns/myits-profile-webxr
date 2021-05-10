var menu = document.querySelector("#menu")
var buttons = document.querySelectorAll(".menu-button")

setButtonVisibility()

document.addEventListener('keydown', function (event) {
    let details = biodata.children[1]

    // Use 'Q' to toggle biodata details
    if (event.key === 'q') {
        toggleDetailVisibility(details)
    }
})

function setButtonVisibility() {
    menu.addEventListener('zappar-visible', function () {
        buttons.forEach((button) => {
            button.setAttribute('visible', 'true')
            button.setAttribute('mixin', 'menu-section animated')
            label.setAttribute('visible', 'true')
            toggleDetailVisibility(details, true)
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

function toggleDetailVisibility(details, makeInvisible = false) {
    if (details.getAttribute('visible') || makeInvisible) {
        details.setAttribute('visible', 'false')
        details.previousElementSibling.setAttribute('visible', 'true')
    } else {
        details.setAttribute('visible', 'true')
        details.previousElementSibling.setAttribute('visible', 'false')
    }
}