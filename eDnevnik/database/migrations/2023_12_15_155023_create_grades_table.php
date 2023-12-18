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
        Schema::create('grades', function (Blueprint $table) {
            $table->date("date");
            $table->string("grade");
            $table->unsignedBigInteger("subject_id");
            $table->unsignedBigInteger("student_id");
            $table->unsignedBigInteger("grade_type_id");
            $table->foreignId("professor_id")->constrained();
            $table->timestamps();

            $table->foreign("student_id")->references("id")->on("students");
            $table->foreign("subject_id")->references("id")->on("subjects");
            $table->foreign("grade_type_id")->references("id")->on("grade_types");
            $table->primary(["date", "student_id", "subject_id"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('grades');
    }
};
