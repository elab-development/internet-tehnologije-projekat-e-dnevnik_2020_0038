<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_surname',
        'email',
        'password',
        'student_parent_id'
    ];


    protected $hidden = [
        'password',
        'student_parent_id'
    ];

    public function grade() 
    {
        return $this->hasMany(Grade::class); 
    }

    public function studentParent() 
    {
        return $this->belongsTo(StudentParent::class); 
    }
}
