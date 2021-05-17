<a-mixin
    id="shrink"
    animation__scale="
        property: scale;
        to: 0 0 0;
        dur: 300;
        easing: easeOutCubic
    "
></a-mixin>

<a-mixin
    id="pop-in"
    animation__scale="
        property: scale;
        from: 0 0 0;
        to: 1 1 1;
        dur: 300;
        easing: easeOutCubic
    "
></a-mixin>

<a-mixin
    id="unfolded"
    animation__xscale="
        property: scale;
        to: 0 1 1;
        dur: 300;
        dir: reverse;
        easing: easeInCubic
    "
></a-mixin>

<a-mixin
    id="opened"
    animation__height="
        property: geometry.height;
        to: 0;
        dur: 300;
        dir: reverse;
        easing: easeInCubic
    "
></a-mixin>

<a-mixin
    id="fade-in"
    animation__fadeIn="
        property: text.opacity;
        from: 0;
        to: 1;
        dur: 500;
    "
></a-mixin>
