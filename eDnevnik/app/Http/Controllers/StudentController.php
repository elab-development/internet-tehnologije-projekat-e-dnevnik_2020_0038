<?php

namespace App\Http\Controllers;

use App\Http\Resources\GradeCollection;
use App\Http\Resources\StudentCollection;
use App\Models\Grade;
use App\Models\SchoolGrade;
use App\Models\Student;
use App\Models\StudentParent;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Student::all();
        return new StudentCollection($students);
    }

    public function getChildren($parent_id){
        $students = Student::where('student_parent_id', $parent_id)->get();
        return new StudentCollection($students);
    }

    public function getPieChart($student_id){
        $grades = Grade::where('students_id', $student_id)->get();
        return new GradeCollection($grades);
    }
    
    // public function getAllStudentsForSubject($subject_id){
    //     //mozda join fja da probas
    //     $subject = Subject::where('id',$subject_id)->first();
    //     $schoolGrade = SchoolGrade::where('id', $subject->school_grade_id)->first();
    //     $students = Student::where('school_grade_id', $schoolGrade->id)->get();
    //     $grades = Grade::where('student_id', $students->id)->get() 
    //     return new GradeCollection($grades);
    // }

    public function getAllGradesForSubject($subject_id) {
        $grades = Grade::join('students', 'grades.student_id', '=', 'students.id')
                    ->join('subjects', 'grades.subject_id', '=', 'subjects.id')
                    ->join('school_grades', 'subjects.school_grade_id', '=', 'school_grades.id')
                    ->where('subjects.id', $subject_id)
                    ->get(['grades.*']);
        
        return new GradeCollection($grades);
    }

    public function getAllStudentsForSubject($subject_id) {
        $students = Student::join('school_grades', 'students.school_grade_id', '=', 'school_grades.id')
                            ->join('subjects', 'school_grades.id', '=', 'subjects.school_grade_id')
                            ->where('subjects.id', $subject_id)
                            ->get(['students.*']);

        return new StudentCollection($students);
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
    public function store(Request $request, $student_parent_id)
    {
        $student = new Student;
        //$student->studentParent = StudentParent::where('id',$student_parent_id)->get();
        $student->student_parent_id = $student_parent_id;
        $data = json_decode($request->getContent(), true);
        $rules = [
            'name_surname' => 'required|max:50',
            'email' => 'required|email|unique:student_parents,email',
            'password' => 'required|min:6',
            'school_grade' => 'required',
            'age' => 'required'
        ];

        $validator = Validator::make($data, $rules);
        if($validator->fails()){
            return response()->json('Niste pravilno uneli podatke za ucenika', 404);
        }else{
            $student->name_surname = $data["name_surname"];
            $student->email = $data["email"];
            $student->password = Hash::make($data["password"]);
            $student->school_grade_id = $data["school_grade"];
            $student->age = $data["age"];

            $res = $student->save();
            return $res ? response()->json('Student je uspesno unet', 200) : response()->json('Student nije unet', 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $subject = Student::where('id', $request->student_id)->get();
        return new StudentCollection($subject);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $student_id)
    {
        $data = json_decode($request->getContent(), true);
        $rules = [
            'name_surname' => 'required|max:50'
        ];

        $validator = Validator::make($data, $rules);
        if($validator->fails()){
            return response()->json('Ime studenta mora da bude uneto', 404);
        }else{
            $grade= Student::find($student_id)->update(['name_surname' => $data["name_surname"]]);
            return response()->json('Student je uspesno azuriran', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($student_id)
    {
        $res = Student::where('id', $student_id)->delete();
        return $res ? response()->json('Student je uspesno izbrisan', 200) : response()->json('Student nije izbrisan', 404);
    }
}
