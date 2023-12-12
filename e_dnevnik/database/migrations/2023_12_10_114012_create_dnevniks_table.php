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
        Schema::create('dnevniks', function (Blueprint $table) {
            $table->date('Datum');
            $table->string('Opis');
            $table->unsignedBigInteger('predmet_id');
            $table->foreignId('tip_opisa_id')->constrained();
            $table->unsignedBigInteger('ucenik_id');
            $table->unsignedBigInteger('profesor_id');
            $table->timestamps();

            $table->foreign('predmet_id')->references('predmet_id')->on('predmets');
            $table->foreign('ucenik_id')->references('id')->on('korisniks');
            $table->foreign('profesor_id')->references('id')->on('korisniks');
            $table->primary(['Datum', 'predmet_id','ucenik_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dnevniks');
    }
};
