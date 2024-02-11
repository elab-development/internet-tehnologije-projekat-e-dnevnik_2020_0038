# eDnevnik za srednju skolu

Ovaj projekat je radjen za srednju skolu Prva beogradska gimnazija.

## Preuzimanje

Kako bi se preuzeo sam projekat neophodno je da korisnik unese sledecu liniju koda u Git Bash terminal

```bash
git clone https://github.com/elab-development/internet-tehnologije-projekat-e-dnevnik_2020_0038.git
```

Nakon uspesnog kloniranja repozitorijuma korisnik je u mogucnosti da vidi dva foldera eDnevnik i eDnevnik-React

## Laravel - eDnevnik

Sledece sto korisnik treba da uradi jeste da otvori projekat u nekom od okruzenja, kao na primer Visual Studio Code.
Potom treba da otvori novi terminal na kratici Terminal i da se postavi u root direktorijum projekta (eDnevnik).
Ako ne postoji kartica za terminal, korisnik moze ponovo da otvori Git Bash terminal i da kroz njega sa komandama  `cd` dodje do zeljenog direktorijuma.
Kako bi se instalirale sve neophodne biblioteke korisnik treba da pokrene sledecu komandu:

```bash
  composer inastall
```

Kada su sve biblioteke neophodne za rad instalirane, sledece sto korisnik mora da uradi jeste da .env.example preimenuje u .env.
U ovom fajlu korisnik treba da unese svoje parametre za bazu poput tipa baze, broja porta, host-a, usernama-a i password-a.
Posto ovaj projekatr koristi usluge MailTrap-a kao virtuelnog servera, neophodno je da korisnik unese podatke za svoj mejl server koji ce da se koristi u produkciji.
Sledeca komanda koju mora da izvrsi korisnik je:

```bash
  php artisan key:generate
```
Ova linija predstavlja generisanje jedinstvenog kljuca za enkripciju aplikacije.
Za kreiranje ove aplikacije koriscen je XAMPP server za postavljanje lokalnog servera na racunaru na kojom moraju da budu pokrenuti Apache i MySQl serveri.
Potom je neophodno da se importuje baza podataka pod imenom e_dnevnik2 na server i da se u .env fajlu naziv baze promeni na naziv imporot-ovane baze.
Na samom kraju, kako bi se pokrenula aplikacija na backend-u, unosi se sledeca linija koda:

```bash
  php artisan serve
```

## React - eDnevnik-React

Kao sto je vec receno u kloniranom repozitorijumu se nalaze dva projekta, sada je nophodno da se otvori drugi projekat u okruzenju (Laravel projekat se ne zatvara i ne gasi).
Ponovo se mora otvoriti terminal u okviru okruzenja ili van, pomocu git Bash-a, potom se unosi sledeca linija:

```bash
  npm install
```

Sa njom se instaliraju sve neophodne biblioteke za rad projekta. Nakon instalacije biblioteka, projekat se pokrece sledecom komadnom:

```bash
  npm start
```

Sa ovom komandom je pokrenut ceo projekat - Laravel na backend-u i React na frontend-u.
