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
        Schema::table('razreds', function (Blueprint $table) {
            $table->integer('BrojPredmeta')->default(0)->after('Naziv');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('razreds', function (Blueprint $table) {
            $table->dropColumn('BrojPredmeta');
        });
    }
};
