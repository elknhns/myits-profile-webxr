@extends('layouts.app')

@section('content')
    @include('assets.index')

    <a-camera zappar-camera></a-camera>
    <a-entity id="menu" zappar-face>
        <a-entity zappar-head-mask="face:#menu"></a-entity>

        <a-text id="nrp" value="" mixin="label font-bold" visible="false"></a-text>

        <a-entity id="profile" mixin="menuSection" position="-1.25 0.4 0">
            <a-cylinder class="button" mixin="button">
                <a-image src="#user" mixin="icon"></a-image>
            </a-cylinder>
        </a-entity>

        <a-entity id="academic" mixin="menuSection" position="-0.75 1.5 0">
            <a-cylinder class="button" mixin="button">
                <a-image src="#graduation-hat" mixin="icon" scale="0.4 0.4 0.4"></a-image>
            </a-cylinder>
        </a-entity>
        
        <a-entity id="occupation" mixin="menuSection" position="0.75 1.5 0">
            <a-cylinder class="button" mixin="button">
                <a-image src="#suitcase" mixin="icon"></a-image>
            </a-cylinder>
        </a-entity>

        <a-entity id="family" mixin="menuSection" position="1.25 0.4 0">
            <a-cylinder class="button" mixin="button">
                <a-image src="#family" mixin="icon" scale="0.4 0.3 0.3"></a-image>
            </a-cylinder>
        </a-entity>
    </a-entity>
@endsection