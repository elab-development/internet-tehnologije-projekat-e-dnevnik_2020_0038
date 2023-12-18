<?php

namespace App\Http\Controllers;

use App\Models\Korisnik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function register(Request $request) 
    {
        //if($request->isMethod('get')) kda bude gotov front

        $request->validate([
            'ImePrezima' => 'required',
            'Email' => 'required|email|unique:korisniks',
            'Sifra' => 'required|min:6'
        ]);

        //moze jer postoji fillabel za ta polja u modelu
        $korisnik = Korisnik::create([
            'ImePrezime'=> $request->input('imePrezime'),
            'Email' => $request->input('Email'),
            'Sifra' => Hash::make($request->input('Sifra')),
            'roditelj_id' => null,
            'tip_korisnika_id' => 4
        ]);

        $request = json_decode($request->getContent(), true);
        $korisnik =new Korisnik;
        $korisnik->ImePrezime = $request[0]['ImePrezime'];
        $korisnik->Email = $request[0]['Email'];
        $korisnik->Sifra = $request[0]['Sifra'];
        $korisnik->roditelj_id = $request[0]['roditelj_id'];
        $korisnik->tip_korisnika_id = $request[0]['tip_korisnika_id'];

        $korisnik->save();

        //return redirect()->route('/tipoviKorisnika')->with('success','Uspenso ste se registrovali');
        return response()->json("Uspesno ste se registrovali",200);
    }

    function login(Request $request) 
    {
        $credentials = $request->validate([
            'Email' => 'required',
            'Sifra' => 'required|min:6'
        ]);

        if(Auth::attempt($credentials)){
            return redirect()->route('')->with('success', 'Uspesno ste se ulogovali');
        }
        return redirect()->route('')->withErrors('success', 'Uspesno ste se ulogovali');
    }

    function logout(Request $request) 
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
