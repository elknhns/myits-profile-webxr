<a-assets>
    @include('assets.mixins.image')

    @include('assets.mixins.font')

    <a-mixin
        id="menuSection"
        visible="false"
    ></a-mixin>
    
    <a-mixin
        id="button"
        material="color: #053b82"
        rotation="-90 0 0"
        geometry="radius: 0.3; height: 0.2"
    ></a-mixin>

    <a-mixin
        id="animated"
        animation="
            property: position;
            to: 0 0 0;
            dir: reverse;
            dur: 500;
            easing: easeInCubic
        "
    ></a-mixin>

    <a-mixin
        id="icon"
        rotation="90 0 0"
        position="0 -0.11 0"
        scale="0.3 0.3 0.3"
    ></a-mixin>

    <a-mixin
        id="label"
        position="0 1.2 0.3"
        text="
            align: center;
            width: 2
        "
    ></a-mixin>
</a-assets>