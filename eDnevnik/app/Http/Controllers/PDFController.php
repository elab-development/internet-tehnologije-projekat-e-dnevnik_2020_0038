<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use FontLib\Table\Type\name;

class PDFController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function generatePDF($student_id)
    {
        $users = Student::where('id', $student_id)->first();
        $name = $users->name_surname;
        $grade = $users->school_grade_id;
        $age = $users->age;
        
  
        $data = [
            'title' => 'Uverenje',
            'date' => date('m/d/Y'),
            'name' => $name,
            'grade' => $grade,
        ]; 
            
        $pdf = PDF::loadView('myPDF', $data);
     
        return $pdf->download($name . '.pdf');
    }
}
