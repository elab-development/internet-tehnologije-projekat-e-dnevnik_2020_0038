<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Predmet extends Model
{
    use HasFactory;

    protected $fillable = [
        'NazivPredmeta',
    ];

    public function razred() 
    {
        return $this->belongsTo(Razred::class);
    }

    function unesen() 
    {
        return $this->hasMany(Dnevnik::class);    
    }
}
