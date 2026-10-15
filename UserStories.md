# Applikation vald:

## 1. Filmapp

        Bygg en app där användaren kan utforska filmer och skapa eget innehåll kopplat till filmer.

        Det kan exempelvis vara:

        Recensioner
        Kommentarer
        Egna filmlistor
        Favoriter
        Filmdata kan komma från ett externt film-API eller från ditt eget REST API.

        Exempel på eget innehåll:

        Användare
            ↓
        Film
            ↓
        Recension
        En inloggad användare skulle exempelvis kunna:

        POST
        → skapa en recension

        PATCH
        → redigera sin recension

        DELETE
        → ta bort sin recension

# User Stories

## US1 – Startsida - Check

    Som användare vill jag mötas av en tydlig startsida så att jag förstår appens syfte.

## US2 – Navigation - Check

    Som användare vill jag kunna navigera mellan appens olika delar.

    Navigationen ska hanteras med React Navigation.

## US3 – Registrering - Check

    Som ny användare vill jag kunna skapa ett konto så att jag kan logga in och använda appens personliga funktioner.

    Det räcker med vanliga användarkonton.

    Du behöver inte implementera:

    Admin
    Moderator
    Flera roller
    Avancerade behörighetsnivåer

## US4 – Inloggning - Check

    Som användare vill jag kunna logga in med mitt konto så att jag får tillgång till funktioner som kräver autentisering.

    Vid misslyckad inloggning ska användaren få tydlig återkoppling.

## US5 – Behålla inloggning och logga ut - Check

    Som användare vill jag kunna fortsätta vara inloggad när jag använder appen och kunna logga ut när jag vill.

    Autentiseringsinformation ska lagras på ett lämpligt sätt.

    Exempel:

    Login
        ↓
    REST API
        ↓
    Token
        ↓
    SecureStore
    Vid logout ska relevant autentiseringsinformation tas bort.

## US6 – Skyddade screens och funktioner - Check

    Som utloggad användare ska jag inte kunna komma åt screens eller funktioner som kräver inloggning.

    Exempel:

    Utloggad användare
    → Startsida
    → Lista
    → Detaljvy
    → Login
    → Register
    Inloggad användare
    → Skapa
    → Redigera
    → Ta bort
    → Profil
    → Sparat innehåll
    Exakt vilka delar som ska vara skyddade beror på vilken app du bygger.

## US7 – Hämta data - Måste bestämma vad en användare kan spara etc

    Som användare vill jag kunna se innehåll som hämtas från ett REST API.

    Det ska finnas minst ett API-anrop som hämtar data med:

    GET
    Exempel:

    GET /api/recipes
    GET /api/posts

## US8 – Lista eller översikt

    Som användare vill jag kunna se flera objekt i en lista eller översikt.

    Det kan exempelvis vara:

    Filmer

    Recept

    Inlägg

## US9 – Detaljvy

    Som användare vill jag kunna välja ett objekt och se mer information om det.

    Exempel:

    Lista
      ↓
    Tryck på objekt
      ↓
    Detaljvy

## US10 – Skapa innehåll

    Som inloggad användare vill jag kunna skapa nytt innehåll i appen.

    Detta ska innebära ett API-anrop med:

    POST
    Exempel:

    POST /api/recipes
    POST /api/posts
    POST /api/reviews
    Vad som skapas beror på vilken app du bygger.

## US11 – Uppdatera innehåll

    Som inloggad användare vill jag kunna ändra innehåll som jag tidigare har skapat.

    Detta ska innebära ett API-anrop med:

    PUT
    eller:

    PATCH
    Exempel:

    PATCH /api/posts/12

## US12 – Ta bort innehåll

    Som inloggad användare vill jag kunna ta bort innehåll som jag tidigare har skapat.

    Detta ska innebära ett API-anrop med:

    DELETE
    Exempel:

    DELETE /api/posts/12
    Användaren ska få tydlig återkoppling när innehållet tas bort.

## US13 – Sökning eller filtrering

    Som användare vill jag kunna söka eller filtrera innehållet så att jag enklare kan hitta det jag söker.

    Exempel:

    Sök film efter titel
    Filtrera recept efter kategori
    Filtrera inlägg efter kategori

## US14 – Interaktion och återkoppling

    Som användare vill jag få tydlig återkoppling när jag utför handlingar i appen.

    Det kan exempelvis vara när användaren:

    Skapar innehåll
    Uppdaterar innehåll
    Tar bort innehåll
    Loggar in
    Loggar ut
    Sparar något
    Delar innehåll

## US15 – Lokal lagring

    Som användare vill jag att relevant information ska kunna finnas kvar lokalt mellan appstarter.

    Appen ska använda lokal lagring på ett korrekt sätt utifrån vilken typ av information som lagras.

    Autentiseringsinformation, exempelvis en token, ska lagras med:

    SecureStore
    Exempel:

    Access token
    → SecureStore
    Om appen behöver lagra vanlig lokal data kan exempelvis AsyncStorage användas.

    Exempel:

    Favoriter
    → AsyncStorage

    Tema
    → AsyncStorage

    Inställningar
    → AsyncStorage
    Lösenord ska inte sparas lokalt.

## US16 – Mobilfunktion

    Som användare vill jag kunna använda minst en funktion som utnyttjar mobilen, operativsystemet eller en annan applikation.

    Det kan exempelvis vara:

    Share
    Linking
    Image Picker
    Kamera
    Location
    Mobilfunktionen ska ha ett naturligt användningsområde i appen.

## US17 – Loading

    Som användare vill jag få tydlig återkoppling när appen väntar på data från API:t.

    Exempelvis kan:

    ActivityIndicator
    användas medan data hämtas.

## US18 – Felhantering

    Som användare vill jag få ett begripligt felmeddelande om något går fel.

    Felhantering ska finnas där det är relevant, bland annat vid:

    Registrering

    Login

    GET

    POST

    PUT / PATCH

    DELETE
    Tekniska fel kan loggas för utvecklaren.

    Användaren ska däremot få ett begripligt meddelande.

    Exempel:

    Kunde inte hämta innehållet.
    Försök igen.

## US19 – Tomma resultat

    Som användare vill jag få tydlig information när det inte finns något innehåll att visa.

    Ett tomt resultat ska inte behandlas som ett fel.

    Exempel:

    Inga recept hittades.

## US20 – Olika skärmstorlekar

    Som användare vill jag att appen fungerar och är tydlig på olika skärmstorlekar.

    Layouten ska anpassas så att innehållet inte exempelvis:

    Hamnar utanför skärmen
    Blir svårt att läsa
    Blir svårt att trycka på
    Kräver en specifik mobilstorlek

# Tekniska Krav

        Tekniska krav
        Projektet ska uppfylla följande tekniska krav:

        Appen ska byggas med React Native och Expo.
        Navigation ska hanteras med React Navigation.
        Appen ska kommunicera med ett REST API.
        API-anrop ska göras asynkront, exempelvis med fetch().
        Appen ska använda:
        GET
        POST
        PUT eller PATCH
        DELETE
        Appen ska ha registrering och inloggning.
        Vissa screens eller funktioner ska endast vara tillgängliga för inloggade användare.
        Det räcker med en vanlig typ av användare. Adminroller behöver inte implementeras.
        Appen ska ha ordentlig felhantering vid API-anrop.
        Appen ska använda state för att hantera data och interaktion.
        En lista eller översikt med flera objekt ska finnas.
        Användaren ska kunna öppna ett objekt och se en detaljvy.
        Appen ska innehålla sökning eller filtrering.
        Appen ska hantera:
        Loading
        Fel
        Tomma resultat
        Autentiseringsinformation ska hanteras på ett lämpligt sätt med SecureStore eller AsyncStorage ska användas om appen behöver lagra vanlig lokal data som ska finnas kvar mellan appstarter.
        Minst en mobil/device-funktion ska användas, exempelvis Share, Linking, Image Picker, kamera eller Location.
        Layouten ska fungera på olika skärmstorlekar.
        Grundläggande accessibility ska användas där det är relevant.

# Andra krav / tekniska saker att uppfylla

        CRUD
        Appen ska kunna både läsa och förändra data via REST API:t.

        Du ska alltså använda:

        GET
        POST
        PUT/PATCH
        DELETE
        Ett exempel:

        GET
        → hämta användarens inlägg

        POST
        → skapa ett nytt inlägg

        PATCH
        → redigera ett befintligt inlägg

        DELETE
        → ta bort ett inlägg
        CRUD-funktionaliteten ska vara relevant för den typ av app du bygger.

        Autentisering
        Appen ska innehålla registrering och inloggning.

        Ett vanligt flöde kan exempelvis vara:

        Användaren anger uppgifter
                ↓
        POST /api/login
                ↓
        REST API verifierar användaren
                ↓
        token skickas tillbaka
                ↓
        SecureStore
                ↓
        användaren räknas som inloggad
        Vid skyddade API-anrop kan token exempelvis skickas med:

        Authorization: Bearer <token>
        Backend ansvarar för att kontrollera om användaren har rätt att utföra operationen.

        Skyddad funktionalitet
        Appen ska innehålla funktionalitet som endast är tillgänglig efter inloggning.

        Det gäller särskilt funktioner där användaren förändrar sin egen data.

        Exempel:

        Skapa
        Redigera
        Ta bort
        En utloggad användare ska inte kunna kringgå detta genom att navigera direkt till en skyddad screen.

        Lokal lagring och säkerhet
        SecureStore
        SecureStore ska användas för autentiseringsinformation som behöver finnas kvar lokalt.

        Exempel:

        Token
        → SecureStore
        Exempel på flöde:

        App startar
            ↓
        läs token från SecureStore
            ↓
        token finns?
        ↙     ↘
        ja      nej
        ↓        ↓
        inloggad  utloggad
        Vid logout ska relevant information tas bort.

        AsyncStorage
        AsyncStorage kan användas för vanlig lokal data som inte behöver samma skydd.

        Exempel:

        Favoriter
        Tema
        Inställningar
        Senaste sökning
        Andra användarpreferenser
        Exempel:

        State
        → aktuell data

        AsyncStorage
        → vanlig persistent data

        SecureStore
        → autentiseringsinformation
        Projektstruktur och kodkvalitet
        Projektet ska vara organiserat så att det är tydligt var olika delar av applikationen finns.

        Använd tydliga namn på:

        Variabler
        Funktioner
        Komponenter
        Screens
        Filer
        Försök återanvända gemensam kod istället för att duplicera samma lösning på flera ställen.

        Stora komponenter bör delas upp när det gör lösningen tydligare.

        Ta bort kod som inte längre används.

        Använd en konsekvent kodformatering.
