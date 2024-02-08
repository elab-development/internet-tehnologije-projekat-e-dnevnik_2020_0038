<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CsrfTokenControler extends Controller
{
    public function generateCsrfToken()
    {
        $csrfToken = csrf_token();

        return response()->json(['csrf_token' => $csrfToken]);
    }
}
