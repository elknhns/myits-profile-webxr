<a-entity id="biodata" class="menu-button" mixin="menu-section" position="-1.25 0.4 0">
    <a-cylinder mixin="button">
        <a-image src="#user" mixin="icon"></a-image>
    </a-cylinder>
    <a-plane height="1.8" width="1.7" position="-0.3 -0.2 0.2" visible="false">
        <a-box id="detailTitle" mixin="detail-title" height="0.33" width="1.72" position="0 0.75 0">
            <a-text mixin="raleway-bold detail-title-text" value="BIODATA" position="0 -0.04 0.06"></a-text>
        </a-box>
        <a-entity id="detailText">
            <a-entity position="-0.7 0.4 0.051" id="name">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="NAMA LENGKAP"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="-0.7 0.15 0.051" id="email">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="EMAIL"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="-0.7 -0.1 0.051" id="phone">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="NO TELP"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="0.1 0.4 0.051" id="gender">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="JENIS KELAMIN"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="0.1 0.15 0.051" id="religion">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="AGAMA"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="0.1 -0.1 0.051" id="blood">
                <a-text mixin="roboto-bold detail-text" position="0 0 0" value="GOLONGAN DARAH"></a-text>
                <a-text mixin="roboto-regular detail-text query" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="0 -0.35 0.051" id="birthday">
                <a-text mixin="roboto-bold detail-text align-center" position="0 0 0" value="TTL"></a-text>
                <a-text mixin="roboto-regular detail-text query align-center" position="0 -0.1 0" value="Wajah tidak dikenal"></a-text>
            </a-entity>
            <a-entity position="0 -0.6 0.051" id="address">
                <a-text mixin="roboto-bold detail-text align-center" position="0 0 0" value="ALAMAT SURABAYA"></a-text>
                <a-text mixin="roboto-regular detail-text query align-center" position="0 -0.1 0" value="Wajah tidak dikenal" width="0.938" baseline="top" text="wrapCount: 25; lineHeight: 54"></a-text>
            </a-entity>
        </a-entity>
    </a-plane>     
</a-entity>