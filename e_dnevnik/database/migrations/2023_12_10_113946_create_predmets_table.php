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
        Schema::create('predmets', function (Blueprint $table) {
            $table->unsignedBigInteger('predmet_id');
            $table->string('NazivPredmeta');
            $table->unsignedBigInteger('razred_id');
            $table->timestamps();
            $table->foreign('razred_id')->references('id')->on('razreds');
            $table->primary(['predmet_id', 'razred_id']);   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('predmets');
    }
};
