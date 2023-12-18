<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_surname',
        'email',
        'password',
    ];


    protected $hidden = [
        'password'
    ];

    public function grade() 
    {
        return $this->hasMany(Grade::class); 
    }
}
