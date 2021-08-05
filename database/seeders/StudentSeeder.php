<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\{DB, Storage};

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $studentFiles = Storage::disk('public')->allFiles('json/biodata');
        foreach ($studentFiles as $studentFile) {
            $student = json_decode(Storage::disk('public')->get($studentFile))[0];
            DB::table('students')->insert([
                'id' => $student->id,
                'nrp' => $student->nrp,
                'kode_prodi' => $student->kode_prodi,
                'nama' => $student->nama,
                'nama_lengkap' => $student->nama_lengkap,
                'jenis_kelamin' => $student->jenis_kelamin,
                'dosen_wali' => $student->dosen_wali,
                'tanggal_lahir' => $student->tanggal_lahir,
                'tempat_lahir' => $student->tempat_lahir,
                'agama' => $student->agama,
                'status_kawin' => $student->status_kawin,
                'alamat_surabaya' => $student->alamat_surabaya,
                'kode_pos' => $student->kode_pos,
                'no_telp' => $student->no_telp,
                'email' => $student->email,
                'golongan_darah' => $student->golongan_darah,
                'kewarganegaraan' => $student->kewarganegaraan,
                'prodi' => $student->prodi,
                'ipk' => $student->ipk,
                'sks_lulus' => $student->sks_lulus,
                'tahun_masuk' => $student->tahun_masuk,
                'semester_ke' => $student->semester_ke,
                'foto' => $student->foto,
            ]);
        }
    }
}
