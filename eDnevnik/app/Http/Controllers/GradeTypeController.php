<?php

namespace App\Http\Controllers;

use App\Http\Resources\GradeTypeCollection;
use App\Http\Resources\SchoolGradeCollection;
use App\Models\GradeType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GradeTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $types = GradeType::all();
        return new GradeTypeCollection($types);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $type = new GradeType;
        $data = json_decode($request->getContent(), true);
        $rules = [
            'GradeType' => 'required|max:50'
        ];

        $validator = Validator::make($data, $rules);
        if($validator->fails()){
            return response()->json('Ime tipa ocene mora da bude uneto', 404);
        }else{
            $type->grade_type_name = $data["GradeType"];

            $res = $type->save();
            return $res ? response()->json('Tip ocene je uspesno unet', 200) : response()->json('Tip ocene nije unet', 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GradeType  $gradeType
     * @return \Illuminate\Http\Response
     */
    public function show($grade_type_id)
    {
        $type = GradeType::where('id', $grade_type_id)->get();
        return new GradeTypeCollection($type); 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GradeType  $gradeType
     * @return \Illuminate\Http\Response
     */
    public function edit(GradeType $gradeType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GradeType  $gradeType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $grade_type_id)
    {
        $data = json_decode($request->getContent(), true);
        $rules = [
            'GradeType' => 'required|max:50'
        ];

        $validator = Validator::make($data, $rules);
        if($validator->fails()){
            return response()->json('Ime tipa ocene mora da bude uneto', 404);
        }else{
            $grade= GradeType::find($grade_type_id)->update(['grade_type_name' => $data["GradeType"]]);
            return response()->json('Tip ocene je uspesno azuriran', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GradeType  $gradeType
     * @return \Illuminate\Http\Response
     */
    public function destroy($grade_type_id)
    {
        $res = GradeType::where('id', $grade_type_id)->delete();
        return $res ? response()->json('Tip ocene je uspesno izbrisan', 200) : response()->json('Tip ocene nije izbrisan', 404);
    }
}
