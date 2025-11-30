# Jeu Comptable POPSY

Application éducative interactive pour l'apprentissage des écritures comptables selon la logique du logiciel POPSY. Développée pour l'Institut Saint-Luc à Frameries.

## Fonctionnalités

- **31 Exercices Pratiques** : Couvre les Achats, Ventes, Opérations Diverses (OD) et Financiers.
- **Scénarios Réalistes** : Factures, Extraits bancaires, Notes de crédit, Escomptes, TVA cocontractant, etc.
- **Logique Pédagogique** :
  - **Aléatoire** : Les exercices sont mélangés à chaque session (sauf le niveau 1 "Réouverture" qui reste fixe).
  - **Correction** : Vérification immédiate avec affichage de la solution correcte.
  - **Progression** : Système de niveaux avec barre de navigation.
- **Outils Intégrés** :
  - Plan Comptable (recherchable).
  - Structure de la Déclaration TVA.
  - Liste des codes TVA POPSY (couleurs jaune/orange respectées).
- **Rapport Final** : Génération d'un rapport complet imprimable en fin de parcours.

## Installation et Utilisation

Ce projet est conçu comme une **Single Page Application (SPA)** monolithique pour faciliter le déploiement.

### Option 1 : GitHub Pages (Recommandé)
1.  Hébergez le fichier `index.html` sur la branche principale de votre dépôt GitHub.
2.  Activez GitHub Pages dans les paramètres du dépôt (Settings -> Pages -> Branch: main).
3.  L'application sera accessible immédiatement via l'URL fournie par GitHub.

### Option 2 : Utilisation Locale
1.  Téléchargez le fichier `index.html`.
2.  Ouvrez-le simplement avec votre navigateur web (Chrome, Edge, Firefox).
    *   *Note : Une connexion internet est requise pour charger les librairies React et Tailwind via CDN.*

## Technologies

*   **React 18** (via CDN)
*   **Tailwind CSS** (via CDN)
*   **Babel** (via CDN pour le JSX)
*   **Lucide React** (Icônes)

Aucune étape de compilation (`npm install`, `npm run build`) n'est nécessaire.