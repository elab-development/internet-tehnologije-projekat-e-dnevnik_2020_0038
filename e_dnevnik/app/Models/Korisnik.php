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
        'roditelj_id',
        'tip_korisnika_id'
    ];


    protected $hidden = [
        'Sifra',
        'roditelj_id',
        'tip_korisnika_id'
    ];

    public function tipKorisnika()
    {
        return $this->belongsTo(TipKorisnika::class);
    }

    public function roditelj() 
    {
        return $this->belongsTo(Korisnik::class);
    }

    function dnevnik() 
    {
        return $this->hasMany(Dnevnik::class);    
    }
}
