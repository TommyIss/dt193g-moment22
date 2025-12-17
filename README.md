# Moment 2 i kursen DT193G, Fullstack-utveckling med ramverk

## Moment 2.2
Det är en enkel webbtjänst byggd med Fastify ramverk och '@fastify/mysql' för att hantera filmer i en MySQL-databas.
Tjänsten erbjuder full CRUD-funktionalitet (Create, Read, Update, Delete).

### Installation
Webbtjänsten använder MySQL-databas. Installera följande paket(fastify, @fastify/mysql, dotenv, nodemon).
Databas består av en tabell för filmer, här nedan står dess struktur:
| Fält | Datatyp | Beskrivning |
|------|---------|-------------|
| id | INT | Unikt id |
| title | VARCHAR(255) | Films titel |
| release_year | INT | Utgivningsår |
| duration | DECIMAL | Films duration |
| watched | BOOLEAN | Visningstatus |

### Användning
Nedan finns URLs ändpunkter för att använda CRUD:
| Metod | Ändpukt | Beskrivning |
|-------|---------|-------------|
| GET | /create-table-movies | Skapa ny tabell för filmer |
| GET | /movies | Hämtar alla filmer |
| GET | /movies/:id | Hämtar en film med specifikt id |
| POST | /movies | Lägger till ny film |
| PUT | /movies/:id | Uppdaterar film med specifikt id |
| DELETE | /movies/:id | Raderar film med specifikt id |

### Tommy Issa, tois2401