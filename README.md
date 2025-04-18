Connexions Automation Suite

Automatisation de la connexion à Global Exam et Ypareo avec Puppeteer et TypeScript.

🗂️ Structure du projet

Connexions/
├── .env.local            # Variables d'environnement (non versionné)
├── Scripts/
│   ├── src/
│   │   ├── GlobalExam.ts # Script de connexion à Global Exam
│   │   ├── Ypareo.ts     # Script de connexion à Ypareo
│   └── tests/
│       └── testEnvAndScripts.ts # Test de configuration et exécution des deux scripts
├── package.json          # Dépendances et scripts npm
└── tsconfig.json         # Configuration TypeScript

🚀 Prérequis

Node.js v14+ ou supérieure

npm

Un fichier Connexions/.env.local à la racine du dossier Connexions contenant vos identifiants :

UTILISATEUR_GLOBAL_EXAM=ton.email@exemple.com
MDP_GLOBAL_EXAM=tonMotDePasseGlobalExam
UTILISATEUR_YPAREO=tonIdentifiantYpareo
MDP_YPAREO=tonMotDePasseYpareo
ENV=./.env.local # facultatif si vous utilisez le fallback automatique

⚙️ Installation

# Depuis la racine du projet Connexions/
npm install

Installe les dépendances : Puppeteer, dotenv, TypeScript, ts-node, etc.

⚡ Compilation & Exécution

Lancer un script individuellement

GlobalExam

cd Connexions/Scripts/src
npm run dev:globalexam
# ou
npx ts-node --esm GlobalExam.ts

Ypareo

cd Connexions/Scripts/src
npm run dev:ypareo
# ou
npx ts-node --esm Ypareo.ts

Les scripts ouvriront un navigateur Puppeteer et tenteront de se connecter avec vos variables d'environnement.

Utiliser node pour exécuter les scripts 

Puis:

Se déplacer dans le dossier (cd) :
    => Connexions/Scripts/src :
        =>  node --loader ts-node/esm .\GlobalExam.ts
        =>  node --loader ts-node/esm .\Ypareo.ts
    => Connexions/Scripts/tests :
        =>  node --loader ts-node/esm .\testEnvAndScripts.ts


✅ Tests

Pour vérifier la configuration de vos variables et l’exécution des deux scripts en une seule commande :

cd Connexions/Scripts/tests
npx ts-node --esm testEnvAndScripts.ts
# ou via nodemon
nodemon --loader ts-node/esm tests/testEnvAndScripts.ts

Ce test affiche le chargement du fichier .env.local, vos identifiants et lance les deux connexions.

🛠️ Dépannage

Variables undefined :

Assurez-vous que le chemin .env.local est correct ou définissez ENV avant de lancer le script.

Vérifiez le format du fichier .env.local (pas d’espaces ni de guillemets).

Erreur TS : activez allowImportingTsExtensions dans tsconfig.json si vous importez des .ts avec extension.

📜 License

MIT © SmiledPolecat34 