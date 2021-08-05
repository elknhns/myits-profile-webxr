@extends('layouts.app')

@section('content')
    @include('assets.index')

    <a-camera zappar-camera="userFacing: true"></a-camera>
    <a-entity id="menu" zappar-face>
        <a-entity zappar-head-mask="face:#menu"></a-entity>

        <a-entity id="labelSection" position="0 1 1" scale="0.6 0.6 1" visible="false">
            <a-image id="photo" mixin="label-photo" visible="false"></a-image>
            <a-text id="name" value="" mixin="label label-name raleway-bold align-center" position="0 -0.5 0"></a-text>
            <a-text id="nrp" value="" mixin="label raleway-regular align-center" position="0 -0.4 0"></a-text>
            <a-plane id="confidence" geometry="height: 0.5; width: 0.5" material="color: #053b82" position="-0.25 0 0" visible="false">
                <a-text value="CONFIDENCE VALUE" mixin="label raleway-bold align-center" text="width: 0.6; wrapCount: 15" position="0 -0.15 0"></a-text>
                <a-text id="confidence-value" value="" mixin="label raleway-bold align-center" width="4.5" position="0 -0.05 0"></a-text>
            </a-plane>
        </a-entity>

        @include('menus.biodata')
        @include('menus.academics')
        @include('menus.career')
        @include('menus.family')
    </a-entity>
@endsection