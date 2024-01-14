<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
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
            'id' =>$this->resource->id,
            'subject_name'=>$this->resource->subject_name,
            'professor' => $this->resource->professor,
            'grade'=> $this->resource->schoolGrade
        ];
    }
}
