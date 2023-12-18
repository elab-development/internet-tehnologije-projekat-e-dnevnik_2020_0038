<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GradeType extends Model
{
    use HasFactory;

    protected $fillable = [
        'grade_type_name'
    ];

    public function grade() 
    {
        return $this->hasMany(Grade::class); 
    }
}
