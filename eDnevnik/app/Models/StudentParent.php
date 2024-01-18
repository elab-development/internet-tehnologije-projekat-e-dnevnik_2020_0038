<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;

class StudentParent extends Model implements Authenticatable, CanResetPassword
{
    use HasApiTokens, Notifiable, HasFactory;

    function getEmailForPasswordReset(){
        return $this->email;
    }

    /**
    * Send the password reset notification.
    *
    * @param  string  $token
    * @return void
    */
    function sendPasswordResetNotification($token){
        $this->notify(new ResetPasswordNotification($token));
    }
    function getAuthIdentifierName(){
        return 'id';
    }
    function getAuthIdentifier(){
        return $this->{$this->getAuthIdentifierName()};
    }
    function getAuthPassword(){
        return $this->password;
    }
    function getRememberToken(){
        return null;
    }
    function setRememberToken($value){
        
    }
    function getRememberTokenName(){
        return null;
    }

    protected $fillable = [
        'name_surname',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    public function students() 
    {
        return $this->hasMany(Student::class); 
    }
}
