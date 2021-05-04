var menu = document.querySelector("#menu")
var buttons = document.querySelectorAll(".button")

setButtonVisibility()

AFRAME.registerComponent('profile', {
    schema: {
        name: {},
        nrp: {},
        doswal: {}
    },

    init: function () {
        // Do something when component first attached.
    },
});


function setButtonVisibility() {
    menu.addEventListener('zappar-visible', function () {
        buttons.forEach((button) => {
            button.parentNode.setAttribute('visible', 'true')
            button.setAttribute('mixin', 'button animated')
            nrp.setAttribute('visible', 'true')
        })
    })
    menu.addEventListener('zappar-notvisible', function () {
        buttons.forEach((button) => {
            button.parentNode.setAttribute('visible', 'false')
            button.setAttribute('mixin', 'button')
            nrp.setAttribute('visible', 'false')
        })
    })
}