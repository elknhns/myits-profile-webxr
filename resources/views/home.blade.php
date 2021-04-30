@extends('layouts.app')

@section('content')
    @include('assets.index')

    <a-camera zappar-camera></a-camera>
    <a-entity id="menu" zappar-face>
        <a-entity zappar-head-mask="face:#menu"></a-entity>

        <a-text id="labelText" value="" mixin="label font-bold"></a-text>

        <a-cylinder id="profile" class="button" mixin="button" position="-1.25 0.4 0">
            <a-image src="#user" mixin="icon"></a-image>
        </a-cylinder>
        <a-cylinder id="academic" class="button" mixin="button" position="-0.75 1.5 0">
            <a-image src="#graduation-hat" mixin="icon" scale="0.4 0.4 0.4"></a-image>
        </a-cylinder>
        <a-cylinder id="occupation" class="button" mixin="button" position="0.75 1.5 0">
            <a-image src="#suitcase" mixin="icon"></a-image>
        </a-cylinder>
        <a-cylinder id="family" class="button" mixin="button" position="1.25 0.4 0">
            <a-image src="#family" mixin="icon" scale="0.4 0.3 0.3"></a-image>
        </a-cylinder>
    </a-entity>
@endsection