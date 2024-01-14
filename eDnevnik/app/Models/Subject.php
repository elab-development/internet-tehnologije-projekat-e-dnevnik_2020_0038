<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_name',
        'professor_id',
        'school_grade_id'
    ];

    public function schoolGrade() 
    {
        return $this->belongsTo(SchoolGrade::class); 
    }

    public function grade() 
    {
        return $this->hasMany(Grade::class); 
    }

    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }
}
