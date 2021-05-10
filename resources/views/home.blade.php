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

        <a-entity id="academic" class="menu-button" mixin="menu-section" position="-0.75 1.5 0">
            <a-cylinder mixin="button">
                <a-image src="#graduation-hat" mixin="icon" scale="0.4 0.4 0.4"></a-image>
            </a-cylinder>
        </a-entity>
        
        <a-entity id="occupation" class="menu-button" mixin="menu-section" position="0.75 1.5 0">
            <a-cylinder mixin="button">
                <a-image src="#suitcase" mixin="icon"></a-image>
            </a-cylinder>
        </a-entity>

        <a-entity id="family" class="menu-button" mixin="menu-section" position="1.25 0.4 0">
            <a-cylinder mixin="button">
                <a-image src="#family" mixin="icon" scale="0.4 0.3 0.3"></a-image>
            </a-cylinder>
        </a-entity>
    </a-entity>
@endsection