@extends('layouts.app')

@section('content')
    @include('assets.index')

    <a-camera zappar-camera></a-camera>
    <a-entity id="menu" zappar-face>
        <a-entity zappar-head-mask="face:#menu"></a-entity>

        <a-entity id="labelSection" position="0 -1 0.6" visible="false">
            <a-text id="name" value="" mixin="label raleway-bold" width="3"></a-text>
            <a-text id="nrp" value="" mixin="label raleway-regular" position="0 -0.1 0"></a-text>
        </a-entity>

        @include('menus.biodata')
        @include('menus.academics')
        @include('menus.occupation')
        @include('menus.family')
    </a-entity>
@endsection