<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipKorisnika extends Model
{
    use HasFactory;

    public function korisnika()
    {
        return $this->hasMany(Korisnik::class);
    }
}
