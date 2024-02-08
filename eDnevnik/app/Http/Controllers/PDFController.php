<?php

namespace App\Http\Controllers;

use App\Mail\SendPdfEmail;
use App\Models\Student;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Dompdf\Dompdf;
use FontLib\Table\Type\name;
use Illuminate\Support\Facades\Mail;

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


    public function sendPdfEmail(Request $request)
    {
        $danasnjiDatum = Carbon::now()->toDateString();
        $data = [
            'name' => $request->name,
            'grade' => $request->grade,
            'date' => $danasnjiDatum,
            'title' => "Uverenje studenta"
        ];

        $ime = $request->name;
        $raz = $request->grade;;
        $datum = $danasnjiDatum;

        $dompdf = new Dompdf();
        $dompdf->loadHtml(view('myPDF', $data));

        // Renderovanje PDF-a
        $dompdf->render();
        $email = $request->email;
        // Dohvatanje sadržaja PDF-a kao string
        $pdfContent = $dompdf->output();

        $pdf = PDF::loadView('myPDF', $data);
        // Slanje e-pošte sa PDF prilogom
        Mail::to($email)->send(new SendPdfEmail($ime, $raz, $datum));

        return response()->json(['status' => 'PDF uspešno poslat na e-poštu.']);
    }
    
    public function uploadPdf(Request $request)
    {
        if ($request->hasFile('pdf') && $request->file('pdf')->isValid()) {
            $pdf = $request->file('pdf');
            $pdf->storeAs('pdfs', $pdf->getClientOriginalName());

            // Ovde dodajte logiku za slanje PDF-a na mejl
            // Pogledajte sledeći korak za upravljanje slanjem PDF-a na mejl
            return response()->json(['message' => 'PDF fajl je uspešno primljen.']);
        }

        return response()->json(['error' => 'Nije priložen validan PDF fajl.'], 400);
    }
}
