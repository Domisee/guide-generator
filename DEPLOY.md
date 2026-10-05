# Publicering

Projektet är strukturerat för Vercel:

- statisk frontend i roten
- serverless endpoints i `api/`
- `/api/version` hämtar senaste RestedXP-release
- `/api/generate` är avsiktligt skyddad tills en legitim generatorintegration finns

## Viktigt

Jag har inte lagt in kod som kringgår eller återskapar RestedXPs konto-/autentiseringsskydd. För en riktig importkod behövs ett officiellt/tillåtet API eller en generator som vi har rätt att använda.
