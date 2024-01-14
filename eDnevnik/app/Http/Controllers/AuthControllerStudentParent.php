<?php

namespace App\Http\Controllers;

use App\Models\StudentParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Laravel\Sanctum\PersonalAccessToken;

class AuthControllerStudentParent extends Controller
{
    function register(Request $request) 
    {
        //if($request->isMethod('get')) kda bude gotov front
        $data = json_decode($request->getContent(), true);
        $rules = [
            'name_surname' => 'required',
            'email' => 'required|email|unique:student_parents,email',
            'password' => 'required|min:6',
            
        ];

        $validator = FacadesValidator::make($data, $rules);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
/*
        $parent = new StudentParent;
        $parent->name_surname = $data[0]["name_surname"];
        $parent->email = $data[0]["email"];
        $parent->password = Hash::make($data[0]["password"]);
*/
        $parent = StudentParent::create([
            'name_surname' => $data["name_surname"],
            'email' => $data["email"],
            'password' => Hash::make($data["password"])
        ]);

        $token = $parent->createToken('auth_token')->plainTextToken;
        //$res = $parent->save();

        return response()->json(['data' => $parent, 'access_token' => $token]);
        //return $res ? response()->json("Uspesno ste se registrovali",200) : response()->json("Niste ste se registrovali",400);
    }

    function login(Request $request) 
    {
        $data = json_decode($request->getContent(), true);
        $rules = [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ];

        $validator = FacadesValidator::make($data, $rules);
        if($validator->fails()){
            return response()->json("Niste uneli ispravne podatke",400);
        }

        $email = $data["email"];
        $pass = $data["password"];

        if(Auth::guard('student_parent')->attempt(['email' => $email, 'password' => $pass])){
            //$parent = Auth::guard('student_parent')->user();
        
            $parent = StudentParent::where('email',$email)->firstOrFail();
            $token = $parent->createToken('auth_token')->plainTextToken;

            return response()->json([
            'success' => 'Uspesno ste se ulogovali',
            'data' => $parent,
            'access_token' => $token,
            ], 200);
        }
        //return redirect()->route('')->with('success', 'Uspesno ste se ulogovali');
        return response()->json(['message' => 'Niste se uspešno ulogovali'],401);
        //return redirect()->route('')->withErrors('success', 'Uspesno ste se ulogovali');
    }

    function logout(Request $request) 
    {
        $student = auth()->user();
        $student->currentAccessToken()->delete();
        // auth()->guard('student_parent')->logout();
        return response()->json(['message' => 'Dovidjenja ' . $student->name_surname .'!']);
    }
}
