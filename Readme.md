# CineLib

## Om projektet

    CineLib är en mobilapplikation utvecklad med React Native och Expo, samt Java och Spring. Syftet med appen är att låta användare upptäcka filmer och TV-serier, läsa information om dem, hantera sitt eget konto och skapa favoritlistor samt skriva kommentarer.

## API och databas

### TMDB API

    CineLib använder sig av The Movie Database (TMDB) API för att hämta information om filmer och TV-serier så som betyg, beskrivning, namn, affisher, kategorier och sökresultat.

### Eget REST API

    Server-foldern är utvecklad i Java med Spring Boot och använder PostgreSQL som databas.

    Backenden hanterar bland annat registrering, inloggning och kommentarer. API-anropen görs från mobilapplikationen via HTTP förfrågningar.

    Exempel på endpoints:

- POST /user - registrerar en användare.
- POST /user/login - hanterar inloggning.
- /comment - används för att hantera kommentarer

## Viktiga funktioner

- Film- och serieupptäckt: Visar populära filmer och TV-serier från TMDB.
- Sökfunktion: Sök efter filmer och TV-serier och visa matchande resultat.
- Detaljsidor: Visar information om vald film eller serie, exempelvis titel, affisch, språk, premiärdatum, betyg, kategorier och beskrivning.
- Favoriter: Gör det möjligt att lägga till och ta bort filmer och serier som favoriter i en lista.
- Användarkonto: Registrering och inloggning via det egna backend-API.
- Kommentarer: Möjlighet att skapa och hantera kommentarer kopplade till appens media.
- Dela media: Använder React Natives inbyggda Share-funktion för att dela information om en film eller serie via mobilens delningsmeny.

## Registrering och inloggning

    Användaren kan skapa ett konto genom att ange användarnamn, e-postaddress och lösenord.
    Informationen skickas till Server via POST /user.

    Lösenordet hashats med BCrypt på serversidan innan  användaren sparas i databasen för att säkerställa att det inte är läsbar.

    Vid inloggning skickas e-postaddressen och lösenord till POST /user/login. Backenden hanterar inloggningsförfrågan och returnerar ett svar till mobilapplikationen.

## Lokal lagring

## Mobilfunktion

    CineLib använder React Natives Share API för att öppna mobilens inbyggda delningsmeny.

    Från en films eller series detaljsida kan användaren trycka på Share för att dela titel och beskrivning via en tillgänglig app på enheten.

## Installation och start

- Node.js och npm.
- Java i en version som stöds av projektets Gradle-konfiguration.
- Android Studio med en Android-emulator, eller en kompatibel fysisk enhet.
- En TMDB API-nyckel.
- PostgreSQL.

### 1. Klona projektet

    I en terminal:

    git clone <REPO_URL>


    Applikationen är uppdelad i två mappar:

- Native - React Native applikationen.
- Server - Java Spring Boot API/backend.

### 2. Konfigurera backend

Antingen så kan du använda kommandot:

- cd Server

Eller öppna foldern med din IDE (Rekommenderar IntelliJ).

Konfigurera anslutningen till PostgreSQL i backendens application.properties fil, eller via miljövariabler för projektet:

application.properties

- spring.application.name=Server
- spring.datasource.url=${DATABASE_URL}
- spring.datasource.username=${DATABASE_USERNAME}
- spring.datasource.password=${DATABASE_PASSWORD}

- jwt.secret=${JWT_SECRET}

- spring.datasource.driver-class-name=org.postgresql.Driver
- spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

- spring.jpa.hibernate.ddl-auto=update

### 3. Installera appens beroenden

Öppna en ny terminal i projektets rotmapp och gå till Native:

- cd Native
- npm install

Skapa en lokal .env-fil med de miljövariabler som appen kräver:

- EXPO_PUBLIC_SPRING_API_URL=<React Native localhost url>

- EXPO_PUBLIC_TMDB_API_KEY=<Nyckel Här>

- EXPO_PUBLIC_TMDB_ACCESS_TOKEN=<Access Token Här>

Använd en backend-URL som är tillgänglig från emulatorn eller enheten. localhost på en fysisk mobil pekar exempelvis på själva mobilen och inte på datorn som kör backenden.

### Starta projektet

Kör "Server" i IntelliJ, starta projektet från "ServerApplication".

Kör "Native" i VSCode, starta projektet från en terminal (se till att du är i /Native) och skriv

- npm start

## Kända problem och begränsningar

- Appen behöver en fungerande internetanslutning för att hämta data från TMDB.
- En giltig TMDB API-nyckel krävs för att film- och seriesökningar ska fungera.
- Backend måste vara igång och kunna ansluta till PostgreSQL för att funktioner som använder servern ska fungera.
- Backendens URL måste vara tillgänglig från den enhet eller emulator där appen körs.
- TMDB ansvarar för innehållet och informationen som visas från deras API. Tillgängligheten och kvaliteten på data kan därför variera.
