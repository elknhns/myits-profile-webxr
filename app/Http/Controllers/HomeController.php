<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{   
    public function index()
    {   
        return view('home');
    }

    public function requestMyPhoto($nrp, $filename) {
        return asset('photos/'.$nrp.'/'.$filename.'.jpg');
    }

    public function getRegisteredLabels() {
        $photoAddresses = Storage::disk('public')->allDirectories('photos');
        $labels = array();
        foreach ($photoAddresses as $address) {
            $label = substr($address, 7);
            array_push($labels, $label);
        }
        return $labels;
    }

    public function saveResults(Request $request) {
        Storage::disk('public')->put('json/results.json', $request->content);
    }

    public function saveDescriptors(Request $request) {
        Storage::disk('public')->put('json/face-descriptors.json', $request->content);
    }

    public function getPhotoAddress() {
        return asset('photos');
    }

    public function getDescriptors() {
        return asset('json/face-descriptors.json');
    }
}
