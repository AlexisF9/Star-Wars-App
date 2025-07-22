# Projet Star Wars full stack

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

### Réalisations :
- Fiches détaillées
- Router React
- Debounce sur le champ de recherche (hook custom useDebounce)
- Filtres par type de résultat
- Authentification frontend (ajout de la page dashboard, redirigé si non connexion)
- Responsive design

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
FIXED_USERNAME=toto
FIXED_PASSWORD=test
```
Lancer le back :
```
npm run dev
```
🚀 Une fois le backend lancé utilisez l'adresse http://localhost:3000

### Environnement technique :
- NodeJS, Express
- axios (Fetch l'api Swapi)
- jwt (Utilisation et création d'un token pour l'user)

### Réalisations :
- Mise en place d’un système d’authentification (basique avec identifiants fixes)
- Création d’un middleware pour protéger l’endpoint de recherche

### Améliorations possible :
- Ajout de la création/edit/supression de compte
- Amélioration du login
- Utilisation d'une base de donnée pour l'auth

