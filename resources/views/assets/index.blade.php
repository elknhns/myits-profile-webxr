<a-assets>
    {{-- <video id="video" width="960" height="540" autoplay muted></video> --}}
    <img src="{{ asset('img/user.png') }}" id="user">
    <img src="{{ asset('img/graduation-hat.png') }}" id="graduation-hat">
    <img src="{{ asset('img/suitcase.png') }}" id="suitcase">
    <img src="{{ asset('img/family.png') }}" id="family">

    <a-mixin
        id="button"
        material="color: #053b82"
        rotation="-90 0 0"
        geometry="radius: 0.3; height: 0.2"
        visible="false"
    ></a-mixin>

    <a-mixin
        id="icon"
        rotation="90 0 0"
        position="0 -0.11 0"
        scale="0.3 0.3 0.3"
    ></a-mixin>
</a-assets>