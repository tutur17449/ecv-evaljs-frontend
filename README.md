# ECV - Javascript, NodeJS et Asynchrone

Arthur HAMEL - M2 DEV

https://hackmd.io/@dws-teach/Bk2CorkV_

## Description du répertoire

- `/public` : Dossier contenant des fichiers publiques
- `/src/assets` : Dossier contenant les fichiers styles, images ...
- `/src/components` : Dossier contenant les composants
- `/src/layouts` : Dossier contenant les templates de pages
- `/src/lib` : Dossier contenant les fichiers de configuration de certaines libraires / modules => axios
- `/src/pages` : Dossier contenant les pages
- `/src/router` : Dossier contenant les fichiers de configuration de Vue router
- `/src/store` : Dossier contenant les fichiers des stores Vuex

## Installation et lancement

Installer les dépendances

```bash
npm i
```

Modifier le dev proxy (optionnel)

```javascript
// vue.config.js
module.exports = {
  devServer: {
    proxy: "http://localhost:1933",
  },
};
```

Lancer l'application en mode développement

```bash
npm run serve
```
