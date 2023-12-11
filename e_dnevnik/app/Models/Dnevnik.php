<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dnevnik extends Model
{
    use HasFactory;

    protected $primaryKey = ['Datum','predmet_id','ucenik_id'];

    public $incrementing = false;
}
