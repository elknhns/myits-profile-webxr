<a-entity id="academics" class="menu-button" mixin="menu-section" position="-0.75 1.5 0">
    <a-cylinder mixin="button">
        <a-image src="#graduation-hat" mixin="icon" scale="0.4 0.4 0.4"></a-image>
    </a-cylinder>
    <a-plane mixin="detail-card" position="0 0.2 0.2" height="1.4" visible="false">
        <a-box id="detailTitle" mixin="detail-title" position="0 0.75 0">
            <a-text mixin="raleway-bold detail-title-text" value="AKADEMIK" position="0 -0.04 0.06"></a-text>
        </a-box>
        <a-entity id="detailText">
            <a-entity position="-0.7 0.4 0.051" id="nrp">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="NRP"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="-0.7 0.15 0.051" id="prodi">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="PRODI"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="-0.7 -0.1 0.051" id="gpa">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="IPK"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="0.1 0.4 0.051" id="entryYear">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="TAHUN MASUK"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="0.1 0.15 0.051" id="credits">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="SKS LULUS"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="0.1 -0.1 0.051" id="semester">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="SEMESTER"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="0 -0.35 0.051" id="doswal">
                <a-text mixin="roboto-bold detail-text align-center" position="0 0 0" value="DOSEN WALI"></a-text>
                <a-text mixin="roboto-regular detail-text query align-center" position="0 -0.1 0" value="Wajah tidak dikenal" width="0.938" baseline="top" text="wrapCount: 25; lineHeight: 54"></a-text>
            </a-entity>
        </a-entity>
    </a-plane>
</a-entity>