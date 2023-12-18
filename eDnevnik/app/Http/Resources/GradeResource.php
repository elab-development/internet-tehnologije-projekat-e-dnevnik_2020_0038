<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GradeResource extends JsonResource
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
            'date' => $this->resource->date,
            //'gradeType' => $this->resource->gradeType->toArray(),
            'grade' => $this->resource->grade,
            'subject' => $this->resource->subject->toArray(),
            'student' => $this->resource->student->toArray(),
            'professor' => $this->resource->professor->toArray()
        ];
    }
}
