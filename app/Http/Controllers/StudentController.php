<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function recognizeFace($nrp)
    {
        return Student::where('nrp', $nrp)->first();
    }
}
