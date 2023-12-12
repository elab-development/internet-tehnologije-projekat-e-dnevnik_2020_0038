<?php

namespace App\Http\Controllers;

use App\Http\Resources\PredmetCollection;
use App\Http\Resources\RazredCollection;
use App\Models\Razred;
use Illuminate\Http\Request;

class RazredController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $razred = Razred::all();
        return new RazredCollection($razred);
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
     * @param  \App\Models\Razred  $razred
     * @return \Illuminate\Http\Response
     */
    public function show($razred_id)
    {
        $razred = Razred::find(1);
        $predmeti = $razred->predmeti()->get();
        return new PredmetCollection($predmeti);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Razred  $razred
     * @return \Illuminate\Http\Response
     */
    public function edit(Razred $razred)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Razred  $razred
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Razred $razred)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Razred  $razred
     * @return \Illuminate\Http\Response
     */
    public function destroy(Razred $razred)
    {
        //
    }
}
