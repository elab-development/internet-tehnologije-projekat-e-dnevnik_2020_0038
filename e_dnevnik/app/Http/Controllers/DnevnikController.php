<?php

namespace App\Http\Controllers;

use App\Http\Resources\DnevnikCollection;
use App\Models\Dnevnik;
use App\Models\Korisnik;
use Illuminate\Http\Request;

class DnevnikController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //printf($ucenik_id);
        //$korisnik_id = $ucenik_id;
        //$korisnik = Korisnik::find($korisnik_id);
        //$dnevnik = $korisnik->dnevnik()->get();
        $dnevnik = Dnevnik::all();
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
     * @param  \App\Models\Dnevnik  $dnevnik
     * @return \Illuminate\Http\Response
     */
    public function show(Dnevnik $dnevnik)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Dnevnik  $dnevnik
     * @return \Illuminate\Http\Response
     */
    public function edit(Dnevnik $dnevnik)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Dnevnik  $dnevnik
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dnevnik $dnevnik)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dnevnik  $dnevnik
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dnevnik $dnevnik)
    {
        //
    }
}
