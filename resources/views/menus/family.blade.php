<a-entity id="family" class="menu-button" mixin="menu-section" position="1.2 0.4 0" scale="0.6 0.6 1">
    {{-- <a-cylinder mixin="button">
        <a-image src="#family-icon" mixin="icon" scale="0.4 0.3 0.3"></a-image>
    </a-cylinder> --}}
    <a-plane mixin="detail-card" position="0 -0.35 0.2" height="0.4" visible="false">
        <a-box id="detailTitle" mixin="detail-title" position="0 0.4 0">
            <a-text mixin="raleway-bold detail-title-text" value="KELUARGA" position="0 -0.04 0.06"></a-text>
        </a-box>
        <a-entity id="detailText">
            <a-text mixin="roboto-italic detail-text align-center" position="0 -0.03 0.051" value="Coming soon"><a-text>
        </a-entity>
    </a-plane>
</a-entity>