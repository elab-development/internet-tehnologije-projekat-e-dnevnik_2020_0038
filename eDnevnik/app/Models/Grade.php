<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'subject_id', 'student_id','grade','professor_id', 'grade_type_id'];

    protected $primaryKey = ['date','subject_id','student_id'];

    public $incrementing = false;

    public function student() 
    {
        return $this->belongsTo(Student::class); 
    }

    public function subject() 
    {
        return $this->belongsTo(Subject::class); 
    }

    public function gradeType() 
    {
        return $this->belongsTo(GradeType::class); 
    }

    public function professor() 
    {
        return $this->belongsTo(Professor::class); 
    }
}
