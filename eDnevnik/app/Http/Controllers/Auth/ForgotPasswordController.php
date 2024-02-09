<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Professor;
use App\Models\Student;
use App\Models\StudentParent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    protected function credentials(Request $request)
    {
        return $request->only('email', 'password', 'token');
    }
    public function showLinkRequestForm()
    {
        //treba da vrati pogled za unos emaila
    }

    public function showLinkResetPass(){
        //da unese mejl i password
    }

    public function broker($guard)
    {
        return Password::broker($guard);
    }
    //samo za roditelja trenutno
    public function sendResetLinkEmail(Request $request)
    {
        $guard = request()->guard;
        $email = request()->email;
        $data = json_decode($request->getContent(), true);
        $rules = [
            'guard'=>'required',
            'email' => 'required|email'
        ];
        $prom = true;

        $validator = Validator::make($data, $rules);
        if(!$validator->fails()){
            $response = $this->broker($guard)->sendResetLink(
                $request->only('email')
            );

            return $response === Password::RESET_LINK_SENT
            ? (['status' => (200)])
            : (['email' => __($response)]);
        }

        return response()->json(['errorMessage' => 'Ne postoji mejl!'], 404);
    }

    // public function sendResetLinkEmail(Request $request)
    // {
    //     $guard = $request->guard;
    //     $email = $request->email;

    //     $data = $request->validate([
    //         'guard' => 'required',
    //         'email' => 'required|email',
    //     ]);

    //     $response = Password::broker($guard)->sendResetLink(
    //         $data
    //     );

    //     return $response === Password::RESET_LINK_SENT
    //         ? response()->json(['status' => 200])
    //         : response()->json(['email' => __($response)], 400);
    // }

    

    protected function resetPassword($user, $password, $request)
    {
        $guard = $request->guard;
        $prom = true;
        switch($guard){
            case 'admin': 
                $user = Admin::where('email',$user->email)->first();
                $user->update([
                    'password' => Hash::make($password)
                ]);
                break;
            case 'student_parent': 
                $user = StudentParent::where('email',$user->email)->first();
                $user->update([
                    'password' => Hash::make($password)
                ]);
                break;
            case 'student':
                $user = Student::where('email',$user->email)->first();
                $user->update([
                    'password' => Hash::make($password)
                ]);
                break;
            case 'professor':
                $user = Professor::where('email',$user->email)->first();
                $user->update([
                    'password' => Hash::make($password)
                ]);
                break;
            default:
                $prom = false;
                break;
        }
    }


    public function reset(Request $request)
    {
        $req = $request;
        $guard = $request->guard;

        $prom = true;
        switch($guard){
            case 'admin': 
                $request->validate([
                    'email' => 'required|email',
                    'password' => 'required|min:6'
                ]);
                break;
            case 'student_parent': 
                $request->validate([
                    'email' => 'required|email',
                    'password' => 'required|min:6'
                ]);
                break;
            case 'student':
                $request->validate([
                    'email' => 'required|email',
                    'password' => 'required|min:6'
                ]);
                break;
            case 'professor':
                $request->validate([
                    'email' => 'required|email',
                    'password' => 'required|min:6'
                ]);
                break;
            default:
                $prom = false;
                break;
        }
        
        if($prom){
            $response = $this->broker($guard)->reset(
            $this->credentials($request),
            function ($user, $password) use($req) {
                $this->resetPassword($user, $password, $req);
            }
        );

        return $response === Password::PASSWORD_RESET
            ? back()->with(['status' => __($response)])
            : back()->withErrors(['email' => __($response)]);
        }

        return response()->json(['errorMessage' => 'Niste pravilno uneli kredencijale, sifra mora da ima minimum 6 karaktera!'], 401);
    }

}
