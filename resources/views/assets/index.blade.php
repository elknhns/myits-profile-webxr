<a-assets>
    @include('assets.mixins.image')

    @include('assets.mixins.font')

    @include('assets.mixins.align')

    <a-mixin
        id="menu-section"
        visible="false"
    ></a-mixin>
    
    <a-mixin
        id="button"
        material="color: #053b82"
        rotation="-90 0 0"
        geometry="radius: 0.3; height: 0.2"
    ></a-mixin>

    <a-mixin
        id="detail-card"
        geometry="width: 1.7"
        material="opacity: 0.75"
    ></a-mixin>

    <a-mixin
        id="detail-title"
        material="color: #053b82"
        geometry="
            depth: 0.02;
            height: 0.33;
            width: 1.72;
        "
    ></a-mixin>

    <a-mixin
        id="detail-title-text"
        text="
            anchor: center;
            width: 2;
            align: center;
            baseline: top;
        "
    ></a-mixin>

    <a-mixin
        id="detail-text"
        text="
            color: #053b82;
            width: 1.3;
            anchor: left;
        "
    ></a-mixin>

    <a-mixin
        id="query"
        text="
            color: black;
            width: 1.5;
        "
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
        text="
            align: center;
            width: 2
        "
    ></a-mixin>
</a-assets>