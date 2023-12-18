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
    Schema::table('korisniks', function (Blueprint $table) {
        $table->renameColumn('Ime', 'ImePrezime');
    });
}

/**
 * Reverse the migrations.
 *
 * @return void
 */
public function down()
{
    Schema::table('korisniks', function (Blueprint $table) {
        $table->renameColumn('ImePrezime', 'Ime');
    });
}

};
