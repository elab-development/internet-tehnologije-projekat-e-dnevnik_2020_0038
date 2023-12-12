<?php

namespace App\Http\Controllers;

use App\Http\Resources\TipKorisnikaCollection;
use App\Models\TipKorisnika;
use Illuminate\Http\Request;

class TipKorisnikaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipovi = TipKorisnika::all();
        return new TipKorisnikaCollection($tipovi);
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
     * @param  \App\Models\TipKorisnika  $tipKorisnika
     * @return \Illuminate\Http\Response
     */
    public function show(TipKorisnika $tipKorisnika)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TipKorisnika  $tipKorisnika
     * @return \Illuminate\Http\Response
     */
    public function edit(TipKorisnika $tipKorisnika)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TipKorisnika  $tipKorisnika
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipKorisnika $tipKorisnika)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TipKorisnika  $tipKorisnika
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipKorisnika $tipKorisnika)
    {
        //
    }
}
