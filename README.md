# Test technique Fastory

Node version : v24.2.0

## Frontend

Installation :

```
npm i
```
Ajouter un fichier .env à la racine :

```
VITE_API_URL=http://localhost:3000/api
```
Lancer le front :

```
npm run dev
```
🚀 Une fois le front lancé allez sur http://localhost:5173

### Environnement technique :
- React, Redux, TanStack Query (React Query)
- React Router, React Hook Form
- TailwindCSS, Daisy UI (composants ui), Lucide (icons)

### Bonus réalisés :
- Fiches détaillées
- Router React
- Tailwind
- Redux (Connexion de l'user dans l'app)
- Debounce sur le champ de recherche (hook custom useDebounce)
- Filtres par type de résultat
- Authentification frontend (ajout de la page dashboard, redirigé si non connexion)
- Responsive design
- React Hook Form

### Améliorations possibles :
- Page de création de compte
- Edit du login (champ email...)
- Actions possible dans le dashboard
- Protection de la recherche 

## Backend

Installation :
```
npm i
```
Ajouter un fichier .env à la racine:
```
SWAPI_BASE_URL=https://swapi.info/api
PORT=3000
JWT_SECRET=secretkey
```
Lancer le back :
```
npm run dev
```
🚀 Une fois le backend lancé utilisez l'adresse http://localhost:3000

Environnement technique :
- NodeJS, Express
- axios (Fetch l'api Swapi)
- jwt (Utilisation et création d'un token pour l'user)

### Bonus réalisés :
- Mise en place d’un système d’authentification (basique)
- Identifiants fixes
- Création d’un middleware pour protéger l’endpoint de recherche

Améliorations possible :
- Ajout de la création/edit/supression de compte
- Amélioration du login
- Utilisation d'une base de donnée pour l'auth

