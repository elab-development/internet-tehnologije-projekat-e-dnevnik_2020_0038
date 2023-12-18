<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentParent extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password'
    ];


    protected $hidden = [
        'password'
    ];

    public function student() 
    {
        return $this->hasMany(Student::class); 
    }
}
