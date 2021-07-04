<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>myITS Profile WebXR</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://libs.zappar.com/zappar-aframe/0.3.5/zappar-aframe.js"></script>
    <style>
        video {
            visibility: hidden;
        }

        .buttons {
            position: absolute;
            bottom: 20px;
            visibility: hidden;
        }

        .btn {
            font-family: 'Raleway', sans-serif;
        }

        button > img {
            height: 20px;
        }
    </style>
</head>
<body>
    <video id="video" width="960" height="540" autoplay muted></video>

    <a-scene>
        @yield('content')
    </a-scene>

    <div class="buttons container m-2">
        <div class="row d-flex justify-content-center">
            <button id="button-academics" type="button" class="btn btn-primary col-4 m-1 p-2 fw-bold">
                <img src="{{ secure_asset('img/graduation-hat.png') }}"> &nbsp; AKADEMIK
            </button>
            <button id="button-career" type="button" class="btn btn-primary col-4 m-1 p-2 fw-bold">
                <img src="{{ secure_asset('img/suitcase.png') }}"> &nbsp; KARIR
            </button>
            <button id="button-biodata" type="button" class="btn btn-primary col-4 m-1 p-2 fw-bold">
                <img src="{{ secure_asset('img/user.png') }}"> &nbsp; BIODATA
            </button>
            <button id="button-family" type="button" class="btn btn-primary col-4 m-1 p-2 fw-bold">
                <img src="{{ secure_asset('img/family.png') }}"> &nbsp; KELUARGA
            </button>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    <script src="{{ secure_asset('js/vr.js') }}" defer></script>
    <script src="{{ secure_asset('js/face-api.min.js') }}" defer></script>
    <script src="{{ secure_asset('js/face.js') }}" defer></script>
</body>

</html>