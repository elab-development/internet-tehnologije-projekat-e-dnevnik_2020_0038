<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Psy\sh;

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
            Schema::table('korisniks', function (Blueprint $table){
                $table->foreignId('tip_korisnika_id')->after('roditelj_id');
            });
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
            $table->dropForeign('tip_korisnika_id');
        });
    }
};
