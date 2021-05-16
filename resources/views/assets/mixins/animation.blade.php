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
        dir: reverse
        easing: easeInCubic
    "
></a-mixin>

<a-mixin
    id="opened"
    animation__height="
        property: geometry.height;
        to: 0;
        dir: reverse;
        dur: 300;
        easing: easeInCubic
    "
></a-mixin>

<a-mixin
    id="fade-in"
    animation__fadeIn="
        property: text.opacity;
        to: 0.75;
        dur: 300;
        delay: 200;
        easing: easeOutCubic
    "
></a-mixin>
