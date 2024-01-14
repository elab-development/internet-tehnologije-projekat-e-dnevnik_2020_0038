<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubjectCollection;
use App\Models\SchoolGrade;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subjects = Subject::all();
        return new SubjectCollection($subjects);
    }

    public function getAllSubjects($professor_id){
        $subjects = Subject::where('professor_id',$professor_id)->get();
        return new SubjectCollection($subjects);
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
    public function store(Request $request, $school_grade_id)
    {
        $subject = new Subject;
        $subject->school_grade_id = $school_grade_id;
        $data = json_decode($request->getContent(), true);
        $rules = [
            'SubjectName' => 'required|max:50',
            'Professor' => 'required'
        ];

        $validator = Validator::make($data, $rules);
        if($validator->fails()){
            return response()->json('Ime predmeta mora da bude uneto', 404);
        }else{
            $subject->subject_name = $data["SubjectName"];
            $subject->professor_id = $data["Professor"];

            $res = $subject->save();
            return $res ? response()->json('Predmet je uspesno unet', 200) : response()->json('Predmet nije unet', 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $subject = Subject::where('id', $request->subject_id)->get();
        return new SubjectCollection($subject);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function edit(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $subject_id)
    {
        $data = json_decode($request->getContent(), true);
        $rules = [
            'SubjectName' => 'required|max:50'
        ];

        $validator = Validator::make($data[0], $rules);
        if($validator->fails()){
            return response()->json('Ime predmeta mora da bude uneto', 404);
        }else{
            //$request = json_decode($request->getContent(), true);
            //$subject->name_of_school_grade = $request[0]["SubjectName"];

            $grade= Subject::find($subject_id)->update(['subject_name' => $data[0]["SubjectName"]]);
            return response()->json('Predmet je uspesno azuriran', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function destroy($subject_id)
    {
        $res = Subject::where('id', $subject_id)->delete();
        return $res ? response()->json('Predmet je uspesno izbrisan', 200) : response()->json('Predmet nije izbrisan', 404);
    }
}
