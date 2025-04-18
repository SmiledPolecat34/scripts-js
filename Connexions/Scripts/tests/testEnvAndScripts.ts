import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GlobalExam } from '../src/GlobalExam.ts';
import { Ypareo } from '../src/Ypareo.ts';

// 1) Recréer __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2) Déterminer et charger le .env.local
const envPath = process.env.ENV
    ? path.resolve(process.env.ENV)
    : path.resolve(__dirname, '../../../.env.local');
console.log('⏳ Chargement des variables depuis', envPath);
dotenv.config({ path: envPath });

// 3) (Les classes sont déjà importées en top)

// 4) Vérification des variables
console.log('\n=== Vérification des variables d’environnement ===');
console.log('UTILISATEUR_GLOBAL_EXAM =', process.env.UTILISATEUR_GLOBAL_EXAM);
console.log('MDP_GLOBAL_EXAM         =', process.env.MDP_GLOBAL_EXAM);
console.log('UTILISATEUR_YPAREO      =', process.env.UTILISATEUR_YPAREO);
console.log('MDP_YPAREO              =', process.env.MDP_YPAREO);

// 5) Lancement des tests
; (async () => {
    console.log('\n=== Test GlobalExam ===');
    try {
        await new GlobalExam().login();
    } catch (err: any) {
        console.error('❌ Erreur lors du test de GlobalExam:', err);
    }

    console.log('\n=== Test Ypareo ===');
    try {
        await new Ypareo().login();
    } catch (err: any) {
        console.error('❌ Erreur lors du test de Ypareo:', err);
    }
})();
