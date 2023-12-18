<?php

namespace App\Http\Controllers;

use App\Http\Resources\GradeCollection;
use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $grades = Grade::with([ 'subject', 'student', 'professor'])->get();;
        return new GradeCollection($grades);
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
    public function store(Request $request, $proffesor_id)
    {
        $grade = new Grade;
        //$student->studentParent = StudentParent::where('id',$student_parent_id)->get();
        $grade->professor_id = $proffesor_id;
        $data = json_decode($request->getContent(), true);
        $rules = [
            'grade' => 'required|integer|between:1,5',
            'student_id' => 'required|integer',
            'subject_id' => 'required|integer',
            'date'=> 'required|date'
            //dodaj posle za gradetype
        ];

        $validator = Validator::make($data[0], $rules);
        if($validator->fails()){
            return response()->json('Ocena, predmet, student mora da bude izabrano', 404);
        }else{
            $grade->grade = $data[0]["grade"];
            $grade->student_id = $data[0]["student_id"];
            $grade->subject_id = $data[0]["subject_id"];
            $grade->date = $data[0]["date"];

            $res = $grade->save();
            return $res ? response()->json('Ocena je uspesno uneta', 200) : response()->json('Ocena nije uneta', 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function show($student_id)
    {
        $grade = Grade::where('student_id', $student_id)->get();
        return new GradeCollection($grade);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function edit(Grade $grade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $professor_id)
    {
        $data = json_decode($request->getContent(), true);
        $rules = [
            'grade' => 'required|integer|between:1,5',
        ];

        $validator = Validator::make($data[0], $rules);
        if($validator->fails()){
            return response()->json('Ime roditelja mora da bude uneto', 404);
        }else{
            $date = $data[0]['date'];
            $student = $data[0]['student_id'];
            $subject = $data[0]['subject_id'];

            $grade = Grade::where('date', $date)
            ->where('subject_id', $subject)
            ->where('student_id', $student)
            ->where('professor_id', $professor_id)
            ->first();

        if ($grade) {
            $grade->grade = $data[0]['grade'];
            $grade->save();

            return response()->json('Ocena je uspešno ažurirana', 200);
        } else {
            return response()->json('Zapis nije pronađen', 404);
        }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $professor_id)
    {
        $data = json_decode($request->getContent(), true);

        $date = $data[0]['date'];
        $student = $data[0]['student_id'];
        $subject = $data[0]['subject_id'];
        
        $res = $grade = Grade::where('date', $date)
            ->where('subject_id', $subject)
            ->where('student_id', $student)
            ->where('professor_id', $professor_id)
            ->delete();
        
        return $res ? response()->json('Ocena je uspesno izbrisana', 200) : response()->json('Ocena nije izbrisana', 404);
    }
}
