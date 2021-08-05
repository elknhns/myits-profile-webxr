<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->char('id', 10);
            $table->string('nrp');
            $table->char('kode_prodi', 5);
            $table->string('nama');
            $table->string('nama_lengkap');
            $table->char('jenis_kelamin', 1);
            $table->string('dosen_wali');
            $table->string('tanggal_lahir')->nullable();
            $table->string('tempat_lahir');
            $table->string('agama');
            $table->char('status_kawin', 1)->nullable();
            $table->string('alamat_surabaya');
            $table->char('kode_pos', 5)->nullable();
            $table->string('no_telp');
            $table->string('email');
            $table->string('golongan_darah');
            $table->string('kewarganegaraan')->nullable();
            $table->string('prodi');
            $table->float('ipk');
            $table->integer('sks_lulus');
            $table->string('tahun_masuk');
            $table->integer('semester_ke');
            $table->string('foto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
