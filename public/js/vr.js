var menu = document.querySelector("#menu")
var buttons = document.querySelectorAll(".menu-button")

setButtonVisibility()

document.addEventListener('keydown', function (event) {
    // Use 'Q' to toggle biodata details
    if (event.key === 'q') {
        toggleDetailVisibility(biodata)
        toggleDetailVisibility(academics, true)
    }

    // Use 'W' to toggle academics details
    if (event.key === 'w') {
        toggleDetailVisibility(academics)
        toggleDetailVisibility(biodata, true)
    }
})

function setButtonVisibility() {
    menu.addEventListener('zappar-visible', function () {
        buttons.forEach((button) => {
            button.setAttribute('visible', 'true')
            button.setAttribute('mixin', 'menu-section pop-in')
        })
        label.setAttribute('visible', 'true')
        toggleDetailVisibility(biodata, true)
        toggleDetailVisibility(academics, true)
    })
    menu.addEventListener('zappar-notvisible', function () {
        buttons.forEach((button) => {
            button.setAttribute('visible', 'false')
            button.setAttribute('mixin', 'menu-section')
        })
        label.setAttribute('visible', 'false')
        currentLabel = ""
    })
}

function toggleDetailVisibility(menu, toggleOff = false) {
    const details = menu.lastElementChild
    const titleBox = details.firstElementChild
    const detailText = details.lastElementChild
    
    if (details.getAttribute('visible') || toggleOff) {
        details.setAttribute('visible', 'false')
        details.setAttribute('mixin', 'detail-card')
        details.previousElementSibling.setAttribute('mixin', 'button pop-in')
        titleBox.setAttribute('mixin', 'detail-title')
        titleBox.firstElementChild.setAttribute('mixin', 'raleway-bold detail-title-text')
    } else {
        details.setAttribute('visible', 'true')
        details.setAttribute('mixin', 'detail-card opened')
        details.previousElementSibling.setAttribute('mixin', 'button shrink')
        titleBox.setAttribute('mixin', 'detail-title unfolded')
        titleBox.firstElementChild.setAttribute('mixin', 'raleway-bold detail-title-text fade-in')
    }
}