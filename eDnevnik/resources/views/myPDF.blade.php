<!DOCTYPE html>
<html>
<head>
    <title>eDnevnik</title>
    <link rel="stylesheet" href="../app/resources/css/pdfstyle.css">
</head>
<body>
    <div class="box">
        <h1>Prva beogradska gimnazija</h1>
        <h2>{{ $title }}</h2>
        <p>Izdato dana {{ $date }}</p>
        <p>Potvrdjuje se da je {{$name}}, ucenik {{$grade}} razreda srednje skole Prva beogradska gimnazija.</p>


        <p>Direktor srednje skole</p>
    </div>
  
</body>
</html>