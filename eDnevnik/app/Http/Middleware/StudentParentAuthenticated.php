<?php

namespace App\Http\Middleware;

use App\Models\StudentParent;
use Closure;
use Illuminate\Http\Request;

class StudentParentAuthenticated
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
        $user = auth()->user();
        if ($user instanceof StudentParent) {
            return $next($request);
        }

        abort(403, 'Pristup odbijen!');
    }
}
