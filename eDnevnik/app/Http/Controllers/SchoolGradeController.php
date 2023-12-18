<?php

namespace App\Http\Controllers;

use App\Http\Resources\SchoolGradeCollection;
use App\Http\Resources\SubjectCollection;
use App\Models\SchoolGrade;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SchoolGradeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $grades = SchoolGrade::all();
        return new SchoolGradeCollection($grades);
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
        $request = json_decode($request->getContent(), true);
        $grade = new SchoolGrade;
        $grade->name_of_school_grade = $request[0]["Name"];

        $res = $grade->save();
        return $res ? response()->json('Razred je uspesno unet', 200) : response()->json('Razred nije unet', 404);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SchoolGrade  $schoolGrade
     * @return \Illuminate\Http\Response
     */
    public function show($school_grade_id)
    {
        $subjects = Subject::where('school_grade_id', $school_grade_id)->get();
        return new SubjectCollection($subjects);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SchoolGrade  $schoolGrade
     * @return \Illuminate\Http\Response
     */
    public function edit(SchoolGrade $schoolGrade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SchoolGrade  $schoolGrade
     * @return \Illuminate\Http\Response
     */
    public function update($school_grade_id, Request $request)
    {
        $grade = new SchoolGrade;
        $data = json_decode($request->getContent(), true);
        $rules = [
            'Name' => 'required|max:50'
        ];

        $validator = Validator::make($data[0], $rules);
        if($validator->fails()){
            //$grade= SchoolGrade::find($school_grade_id)->update(['name_of_school_grade' => $data[0]["Name"]]);
            return response()->json('Ime razreda mora da bude pravilno uneto', 404);
        }else{
            $grade= SchoolGrade::find($school_grade_id)->update(['name_of_school_grade' => $data[0]["Name"]]);
            return response()->json('Razred je uspesno azuriran', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SchoolGrade  $schoolGrade
     * @return \Illuminate\Http\Response
     */
    public function destroy($school_grade_id)
    {
        $res = SchoolGrade::where('id',$school_grade_id)->delete();
        return $res ? response()->json('Razred je uspesno izbrisan', 200) : response()->json('Razred nije izbrisan', 404);
    }
}
