<a-entity id="career" class="menu-button" mixin="menu-section" position="0.75 1.5 0">
    <a-cylinder mixin="button">
        <a-image src="#suitcase" mixin="icon"></a-image>
    </a-cylinder>
    <a-plane mixin="detail-card" position="0.4 -0.35 0.2" height="0.4" visible="false">
        <a-box id="detailTitle" mixin="detail-title" position="0 0.4 0">
            <a-text mixin="raleway-bold detail-title-text" value="KARIR" position="0 -0.04 0.06"></a-text>
        </a-box>
        <a-entity id="detailText">
            <a-text mixin="roboto-italic detail-text align-center" position="0 -0.03 0.051" value="Coming soon"></a-text>
        </a-entity>
    </a-plane>
</a-entity>