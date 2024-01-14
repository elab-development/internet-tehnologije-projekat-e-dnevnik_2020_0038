<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use App\Models\Student;
use App\Models\StudentParent;
use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class StudentAuthenticated
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
        // $token = PersonalAccessToken::where('token', $request->all()['access_token'])->first();
        // $user = $token->tokenable;
        $user = auth()->user();
        if ($user instanceof Student || $user instanceof Admin || $user instanceof StudentParent) {
            return $next($request);
        }

        abort(403, 'Pristup odbijen!');
    }
}
