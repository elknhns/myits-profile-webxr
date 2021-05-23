@extends('layouts.app')

@section('content')
    @include('assets.index')

    <a-camera zappar-camera></a-camera>
    <a-entity id="menu" zappar-face>
        <a-entity zappar-head-mask="face:#menu"></a-entity>

        <a-entity id="labelSection" position="0 -1 0.8" visible="false">
            <a-image id="photo" mixin="label-photo" visible="false"></a-image>
            <a-text id="name" value="" mixin="label label-name raleway-bold" position="-0.2 -0.1 0"></a-text>
            <a-text id="nrp" value="" mixin="label raleway-regular" position="-0.2 0 0"></a-text>
        </a-entity>

        @include('menus.biodata')
        @include('menus.academics')
        @include('menus.occupation')
        @include('menus.family')
    </a-entity>
@endsection