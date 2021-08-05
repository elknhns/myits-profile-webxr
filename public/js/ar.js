var menu = document.querySelector("#menu")
var buttons = document.querySelectorAll(".menu-button")

const UIButtons = document.querySelector('.buttons')

const biodataButton = document.querySelector('#button-biodata')
const academicsButton = document.querySelector('#button-academics')
const careerButton = document.querySelector('#button-career')
const familyButton = document.querySelector('#button-family')

setButtonVisibility()

biodataButton.addEventListener('click', () => {
    toggleDetailVisibility(biodata)
    toggleDetailVisibility(academics, true)
    toggleDetailVisibility(career, true)
    toggleDetailVisibility(family, true)
})

academicsButton.addEventListener('click', () => {
    toggleDetailVisibility(academics)
    toggleDetailVisibility(biodata, true)
    toggleDetailVisibility(career, true)
    toggleDetailVisibility(family, true)
})

careerButton.addEventListener('click', () => {
    toggleDetailVisibility(career)
    toggleDetailVisibility(biodata, true)
    toggleDetailVisibility(academics, true)
    toggleDetailVisibility(family, true)
})

familyButton.addEventListener('click', () => {
    toggleDetailVisibility(family)
    toggleDetailVisibility(biodata, true)
    toggleDetailVisibility(academics, true)
    toggleDetailVisibility(career, true)
})

function setButtonVisibility() {
    menu.addEventListener('zappar-visible', function () {
        buttons.forEach((button) => {
            button.setAttribute('visible', 'true')
        })
        label.setAttribute('visible', 'true')
        UIButtons.style.visibility = 'visible'
        toggleDetailVisibility(biodata, true)
        toggleDetailVisibility(academics, true)
        toggleDetailVisibility(career, true)
        toggleDetailVisibility(family, true)
    })
    menu.addEventListener('zappar-notvisible', function () {
        buttons.forEach((button) => {
            button.setAttribute('visible', 'false')
        })
        label.setAttribute('visible', 'false')
        UIButtons.style.visibility = 'hidden'
        currentLabel = ""
    })
}

function toggleDetailVisibility(menu, toggleOff = false) {
    const details = menu.lastElementChild
    const titleBox = details.firstElementChild
    
    if (details.getAttribute('visible') || toggleOff) {
        details.setAttribute('visible', 'false')
        details.setAttribute('mixin', 'detail-card')
        titleBox.setAttribute('mixin', 'detail-title')
        titleBox.firstElementChild.setAttribute('mixin', 'raleway-bold detail-title-text')
    } else {
        details.setAttribute('visible', 'true')
        details.setAttribute('mixin', 'detail-card opened')
        titleBox.setAttribute('mixin', 'detail-title unfolded')
        titleBox.firstElementChild.setAttribute('mixin', 'raleway-bold detail-title-text fade-in')
    }
}