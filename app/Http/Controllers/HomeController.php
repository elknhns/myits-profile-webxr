<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{   
    public function index()
    {   
        // dd($this->recognizeFace('05111740000127'));
        $this->setAccessToken();
        return view('home');
    }

    public function recognizeFace($nrp)
    {
        // $accessToken = $this->getAccessToken();
        // $response = Http::withToken($accessToken)->get('https://api.its.ac.id:8443/akademik-sandbox/1.5/mahasiswa/' . $nrp);
        return json_encode(json_decode(Storage::disk('local')->get('public/json/biodata/'.$nrp.'.json'))[0]);
    }

    public function requestAllNRP()
    {
        $accessToken = $this->getAccessToken();

        $response = Http::withToken($accessToken)->get('https://api.its.ac.id:8443/akademik-sandbox/1.5/mahasiswa/list-nrp', [
            // 'per-page' => 21600
            'page' => 9,
            'per-page' => 10
        ]);
        $labels = [];
        foreach ($response->json() as $item) {
            array_push($labels, $item['nrp_baru']);
        }

        return $labels;
    }

    public function requestPhoto($nrp)
    {
        if (Storage::disk('local')->missing('public/'.$nrp.'.jpg')) {
            $accessToken = $this->getAccessToken();
            $response = Http::withToken($accessToken)
                            ->get('https://api.its.ac.id:8443/akademik-sandbox/1.5/mahasiswa/'.$nrp.'/foto');
            if ($response->getStatusCode() == 200) {
                Storage::put('public/'.$nrp.'.jpg', $response);
                return asset('storage/'.$nrp.'.jpg');
            }
            return null;
        }
        return asset('storage/'.$nrp.'.jpg');
    }

    public function requestMyPhoto($nrp, $filename) {
        return asset('storage/photos/'.$nrp.'/'.$filename.'.jpg');
    }

    public function getRegisteredLabels() {
        $photoAddresses = Storage::allDirectories('public/photos');
        $labels = array();
        foreach ($photoAddresses as $address) {
            $label = substr($address, 14);
            array_push($labels, $label);
        }
        return $labels;
    }

    public function getPhotoAddress() {
        return asset('storage');
    }

    public function saveDescriptors(Request $request) {
        Storage::put('public/json/face-descriptors.json', $request->content);
    }

    public function getDescriptors() {
        return asset('storage/json/face-descriptors.json');
    }

    private function setAccessToken() {
        $response = Http::post('https://dev-my.its.ac.id/token', [
            'client_id'     => 'A7600479-013E-4377-A320-602281F8D286',
            'client_secret' => 'f131c93eeb600f4a2d8b2e5b329245fd',
            'grant_type'    => 'client_credentials'
        ]);
        $content = $response->getBody();
        
        $content = explode(',', $content);
        $content = explode(':', $content[0]);
        $content = explode('"', $content[1]);

        Storage::put('public/json/access-token.json', $content[1]);
    }

    private function getAccessToken() {
        return Storage::disk('local')->get('public/json/access-token.json');
    }
}
