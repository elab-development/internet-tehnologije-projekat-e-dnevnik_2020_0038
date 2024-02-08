<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendPdfEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected $ime;
    protected $raz;
    protected $datum;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($ime, $raz, $datum)
    {
        $this->ime = $ime;
        $this->raz = $raz;
        $this->datum = $datum;
    }   

    

    public function build()
    {
        return $this->subject('Uverenje ucenika')->view('myPDF',[
            'name' => $this->ime,
            'grade' => $this->raz,
            'date' => $this->datum,
            'title' => "Uverenje studenta"
        ]);
                    
    }
}
