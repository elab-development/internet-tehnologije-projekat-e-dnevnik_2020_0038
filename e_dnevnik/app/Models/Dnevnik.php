<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dnevnik extends Model
{
    use HasFactory;

    protected $primaryKey = ['Datum','predmet_id','ucenik_id'];

    public $incrementing = false;

    function ucenik()
    {
        return $this->belongsTo(Korisnik::class);    
    }

    function profesor()
    {
        return $this->belongsTo(Korisnik::class);    
    }

    function tipOpisa()
    {
        return $this->belongsTo(TipOpisa::class);    
    }

    function predmet()
    {
        return $this->belongsTo(Predmet::class);    
    }
}
