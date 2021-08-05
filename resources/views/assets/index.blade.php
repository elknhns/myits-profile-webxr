<a-assets>
    @include('assets.mixins.image')
    @include('assets.mixins.font')
    @include('assets.mixins.align')
    @include('assets.mixins.animation')

    <a-mixin id="menu-section" visible="false"></a-mixin>

    <a-mixin id="detail-card" geometry="width: 1.7" material="opacity: 0.75"></a-mixin>

    <a-mixin id="detail-title" material="color: #053b82" geometry="depth: 0.02; height: 0.33; width: 1.72;"></a-mixin>

    <a-mixin id="detail-title-text" text="anchor: center; width: 2; align: center; baseline: top; opacity: 0;"></a-mixin>

    <a-mixin id="detail-text" text="color: #053b82; width: 1.3; anchor: left;"></a-mixin>

    <a-mixin id="query" text="color: black; width: 1.5;"></a-mixin>

    <a-mixin id="label" text="align: left; width: 2"></a-mixin>

    <a-mixin id="label-name" text="baseline: top; width: 1; wrapCount: 21"></a-mixin>

    <a-mixin id="label-photo" position="0.25 0 0" scale="0.45 0.5 1"></a-mixin>
</a-assets>