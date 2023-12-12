<?php

namespace App\Http\Resources;

use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TipKorisnikaCollection extends ResourceCollection
{
    public static $wrap = 'tipovi_korisnika';
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
