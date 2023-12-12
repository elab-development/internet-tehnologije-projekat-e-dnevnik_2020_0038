<?php

namespace App\Http\Controllers;

use App\Http\Resources\PredmetCollection;
use App\Models\Predmet;
use Illuminate\Http\Request;

class PredmetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($razred_id)
    {
        $predmeti_razreda = Predmet::find($razred_id)->razred;
        return new PredmetCollection($predmeti_razreda);
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
        $predmet = new Predmet;

        $predmet->razred_id = $request->razred_id;
        $predmet->NazivPredmeta = $request->NazivPredmeta;

        $predmet->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Predmet  $predmet
     * @return \Illuminate\Http\Response
     */
    public function show(Predmet $predmet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Predmet  $predmet
     * @return \Illuminate\Http\Response
     */
    public function edit(Predmet $predmet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Predmet  $predmet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Predmet $predmet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Predmet  $predmet
     * @return \Illuminate\Http\Response
     */
    public function destroy($predmet_id)
    {
        $res = Predmet::where('predmet_id',$predmet_id)->delete();
        return $res;
    }
}
