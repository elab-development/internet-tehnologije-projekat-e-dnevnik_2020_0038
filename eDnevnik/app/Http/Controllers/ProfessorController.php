<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfessorCollection;
use App\Http\Resources\SubjectCollection;
use App\Models\Professor;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfessorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $professors = Professor::all();
        return new ProfessorCollection($professors);
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
        $type = new Professor;
        $data = json_decode($request->getContent(), true);
        $rules = [
            'name_surname' => 'required|max:50',
            'email' => 'required|email|unique:student_parents,email',
            'password' => 'required|min:6'
        ];

        $validator = Validator::make($data, $rules);
        if($validator->fails()){
            return response()->json('Ime profesora ocene mora da bude uneto', 404);
        }else{
            $type->name_surname = $data["name_surname"];
            $type->email = $data["email"];
            $type->password = Hash::make($data["password"]);

            $res = $type->save();
            return $res ? response()->json('Profesor je uspesno unet', 200) : response()->json('Profesor nije unet', 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Professor  $professor
     * @return \Illuminate\Http\Response
     */
    public function show($professor_id)
    {
        $professor = Professor::where('id', $professor_id)->get();
        return new ProfessorCollection($professor); 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Professor  $professor
     * @return \Illuminate\Http\Response
     */
    public function edit(Professor $professor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Professor  $professor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $professor_id)
    {
        $data = json_decode($request->getContent(), true);
        $rules = [
            'name_surname' => 'required|max:50'
        ];

        $validator = Validator::make($data, $rules);
        if($validator->fails()){
            return response()->json('Ime profesora mora da bude uneto', 404);
        }else{
            $grade= Professor::find($professor_id)->update(['name_surname' => $data["name_surname"]]);
            return response()->json('Profesor je uspesno azuriran', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Professor  $professor
     * @return \Illuminate\Http\Response
     */
    public function destroy($professor_id)
    {
        $res = Professor::where('id', $professor_id)->delete();
        return $res ? response()->json('Profesor je uspesno izbrisan', 200) : response()->json('Profesor nije izbrisan', 404);
    }
}
