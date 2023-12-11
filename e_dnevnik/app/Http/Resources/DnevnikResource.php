<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DnevnikResource extends JsonResource
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
            'Datum' => $this->resource->Datum,
            'predmet_id' => new PredmetResource($this->resource->predmet_id),
            'NazivPredmeta' => $this->resource->NazivPredmeta,
            'tip_opisa_id' => new TipOpisaResource($this->resource->tip_opisa_id),
            'profesor_id'=> new KorisnikResource($this->resource->profesor_id),
            'Opis' => $this->resource->Opis
        ];
    }
}
