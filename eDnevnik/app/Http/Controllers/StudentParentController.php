<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentParentCollection;
use App\Models\StudentParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = StudentParent::all();
        return new StudentParentCollection($students);
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
        $parent = new StudentParent;
        $data = json_decode($request->getContent(), true);
        $rules = [
            'NameSurname' => 'required|max:50'
        ];

        $validator = Validator::make($data[0], $rules);
        if($validator->fails()){
            return response()->json('Ime roditelja mora da bude uneto', 404);
        }else{
            $parent->name = $data[0]["NameSurname"];

            $res = $parent->save();
            return $res ? response()->json('Roditelj je uspesno unet', 200) : response()->json('Roditelj nije unet', 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentParent  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $subject = StudentParent::where('id', $request->parent_id)->get();
        return new StudentParentCollection($subject);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StudentParent  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function edit(StudentParent $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StudentParent  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $parent_id)
    {
        $data = json_decode($request->getContent(), true);
        $rules = [
            'NameSurname' => 'required|max:50'
        ];

        $validator = Validator::make($data[0], $rules);
        if($validator->fails()){
            return response()->json('Ime roditelja mora da bude uneto', 404);
        }else{
            $grade= StudentParent::find($parent_id)->update(['name' => $data[0]["NameSurname"]]);
            return response()->json('Roditelj je uspesno azuriran', 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StudentParent  $studentParent
     * @return \Illuminate\Http\Response
     */
    public function destroy($parent_id)
    {
        $res = StudentParent::where('id', $parent_id)->delete();
        return $res ? response()->json('Roditelj je uspesno izbrisan', 200) : response()->json('Roditelj nije izbrisan', 404);
    }
}
