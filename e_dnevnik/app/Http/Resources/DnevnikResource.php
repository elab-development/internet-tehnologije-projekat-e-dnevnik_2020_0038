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
            'Predmet' => $this->resource->predmet,
            'Ucenik' => $this->resource->ucenik,
            'Tip_opisa' => $this->resource->tipOpisa,
            'Profesor'=> $this->resource->profesor,
            'Opis' => $this->resource->Opis
        ];
    }
}
