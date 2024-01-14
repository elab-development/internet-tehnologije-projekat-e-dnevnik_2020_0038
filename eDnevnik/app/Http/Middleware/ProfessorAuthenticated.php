<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use App\Models\Professor;
use Closure;
use Illuminate\Http\Request;

class ProfessorAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check()) {
        $user = auth()->user();

        if ($user instanceof Professor || $user instanceof Admin) {
            return $next($request);
        } else {
            dd('Nije instanca Professor klase.');
        }
        } else {
        dd('Korisnik nije autentifikovan.');
    }

        //abort(403, 'Pristup odbijen!');
    }
}
