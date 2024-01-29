<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;

class Student extends Model implements Authenticatable, CanResetPassword
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
        'student_parent_id',
        'school_grade_id',
        'age'
    ];

    protected $hidden = [
        'password',
    ];

    public function grade() 
    {
        return $this->hasMany(Grade::class); 
    }

    public function schoolGrade() 
    {
        return $this->belongsTo(SchoolGrade::class); 
    }

    public function parent(){
        return $this->belongsTo(StudentParent::class, 'student_parent_id');
    }
}
