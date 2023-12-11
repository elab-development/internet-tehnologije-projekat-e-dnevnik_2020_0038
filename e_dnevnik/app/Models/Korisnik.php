<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Korisnik extends Model
{
    use HasFactory;

    protected $fillable = [
        'ImePrezime',
        'Email',
        'Sifra',
    ];


    protected $hidden = [
        'Sifra',
        
    ];
}
