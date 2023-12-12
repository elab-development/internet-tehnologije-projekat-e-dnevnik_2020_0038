<?php

namespace App\Http\Controllers;

use App\Http\Resources\TipOpisaCollection;
use App\Models\TipOpisa;
use Illuminate\Http\Request;

class TipOpisaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipoviOpisa = TipOpisa::all();
        return new TipOpisaCollection($tipoviOpisa);
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
     * @param  \App\Models\TipOpisa  $tipOpisa
     * @return \Illuminate\Http\Response
     */
    public function show(TipOpisa $tipOpisa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TipOpisa  $tipOpisa
     * @return \Illuminate\Http\Response
     */
    public function edit(TipOpisa $tipOpisa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TipOpisa  $tipOpisa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipOpisa $tipOpisa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TipOpisa  $tipOpisa
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipOpisa $tipOpisa)
    {
        //
    }
}
