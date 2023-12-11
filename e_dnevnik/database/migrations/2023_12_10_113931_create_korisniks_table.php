<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('korisniks', function (Blueprint $table) {
            $table->id();
            $table->string('Ime');
            $table->string('Prezime');
            $table->string('Email')->unique();
            $table->string('Sifra');
            $table->unsignedBigInteger('roditelj_id')->nullable();
            $table->timestamps();

            $table->foreign('roditelj_id')->references('id')->on('korisniks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('korisniks');
    }
};
