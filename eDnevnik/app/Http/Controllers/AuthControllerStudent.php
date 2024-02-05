<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\StudentParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\HasApiTokens;
class AuthControllerStudent extends Controller
{
    use HasApiTokens;

    //TODO: NIJE IZMENJENA JER JE ISTA KAO STORE
    function register(Request $request) 
    {
        //if($request->isMethod('get')) kda bude gotov front
        $data = json_decode($request->getContent(), true);
        $rules = [
            'name_surname' => 'required',
            'email' => 'required|email|unique:student_parents,email',
            'password' => 'required|min:6',
            'age' => 'required|min:15',
            'student_paren_id' => 'required'
        ];

        $validator = FacadesValidator::make($data, $rules);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }

        $parent = Student::create([
            'name_surname' => $data["name_surname"],
            'email' => $data["email"],
            'password' => Hash::make($data["password"]),
            'student_parent_id' => $data["student_parent_id"],
            'age' => $data["age"]
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

        if(Auth::guard('student')->attempt(['email' => $email, 'password' => $pass])){
            //$parent = Auth::guard('student')->user();
        
            $parent = Student::where('email',$email)->firstOrFail();
            $token = $parent->createToken('auth_token')->plainTextToken;

            return response()->json([
            'success' => 'Uspesno ste se ulogovali',
            'data' => $parent,
            'token' => $token,
            ], 200);
        }
        //return redirect()->route('')->with('success', 'Uspesno ste se ulogovali');
        return response()->json(['message' => 'Niste se uspešno ulogovali'],401);
        //return redirect()->route('')->withErrors('success', 'Uspesno ste se ulogovali');
    }

    function logout(Request $request) 
    {
        // /** @var Student */
        $student = auth()->user();
        //$student = Auth::guard('student')->user();
        // Auth::logout();
        // $request->session()->invalidate();
        // $request->session()->regenerateToken();
        $student->currentAccessToken()->delete();
        // auth()->guard('student')->logout();
        return response()->json(['message' => 'Dovidjenja ' . $student->name_surname .'!']);
    }
}
