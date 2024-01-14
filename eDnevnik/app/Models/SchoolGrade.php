<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolGrade extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_of_school_grade'
    ];

    public function subject() 
    {
        return $this->hasMany(Subject::class); 
    }

    public function students(){
        return $this->hasMany(Student::class);
    }
}
