<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Razred extends Model
{
    use HasFactory;

    protected $fillable = [
        'Naziv'
    ];

    public function predmeti()
    {
        return $this->hasMany(Predmet::class);
    }
}
