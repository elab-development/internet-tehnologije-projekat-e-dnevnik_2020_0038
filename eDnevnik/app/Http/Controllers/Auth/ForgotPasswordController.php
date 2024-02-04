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

        $prom = true;
        switch($guard){
            case 'admin': 
                $request->validate(['email' => 'required|email']);
                break;
            case 'student_parent': 
                $request->validate(['email' => 'required|email']);
                break;
            case 'student':
                $request->validate(['email' => 'required|email']);
                break;
            case 'professor':
                $request->validate(['email' => 'required|email']);
                break;
            default:
                $prom = false;
                break;
        }
        if($prom){
            $response = $this->broker($guard)->sendResetLink(
                $request->only('email')
            );

            return $response === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($response)])
            : back()->withErrors(['email' => __($response)]);
        }

        return response()->json(['errorMessage' => 'Ne postoji mejl!'], 404);
    }

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
                    'email' => 'required|email|exists:admins',
                    'password' => 'required|min:6'
                ]);
                break;
            case 'student_parent': 
                $request->validate([
                    'email' => 'required|email|exists:student_parents',
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
                    'email' => 'required|email|exists:professors',
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
