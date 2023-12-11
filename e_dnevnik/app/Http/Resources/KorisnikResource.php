<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class KorisnikResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'ImePrezime' => $this->resource->ImePrezime,
            'Email' => $this->resource->Email,
            'Sifra' => $this->resource->Sifra,
            'IDRoditelja' => new KorisnikResource($this->resource->IDRoditelja),
            'IDTipaKorisnika' => new TipKorisnikaResource($this->resource->IDTipaKorisnika)
        ];
    }
}
