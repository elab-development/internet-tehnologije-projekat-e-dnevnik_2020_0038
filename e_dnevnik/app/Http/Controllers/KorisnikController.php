<?php

namespace App\Http\Controllers;

use App\Http\Resources\DnevnikCollection;
use App\Http\Resources\DnevnikResource;
use App\Http\Resources\KorisnikCollection;
use App\Http\Resources\KorisnikResource;
use App\Models\Korisnik;
use Illuminate\Http\Request;

class KorisnikController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($korisnik_id)
    {
        $korisnik = Korisnik::find($korisnik_id);
        $dnevnik = $korisnik->dnevnik()->get();
        return new DnevnikCollection($dnevnik);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Korisnik  $korisnik
     * @return \Illuminate\Http\Response
     */
    public function show($korisnik_id)
    {
        $korisnik = Korisnik::find($korisnik_id);
        if(is_null($korisnik)){
            return response()->json('User is not found', 404);
        }
        return new KorisnikResource($korisnik);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Korisnik  $korisnik
     * @return \Illuminate\Http\Response
     */
    public function edit(Korisnik $korisnik)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Korisnik  $korisnik
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Korisnik $korisnik)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Korisnik  $korisnik
     * @return \Illuminate\Http\Response
     */
    public function destroy(Korisnik $korisnik)
    {
        //
    }
}
