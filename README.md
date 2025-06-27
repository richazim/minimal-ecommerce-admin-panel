# 🛡️ Minimal eCommerce — Admin Panel

Panneau d’administration **Next.js 15 / TypeScript** permettant de piloter la boutique ▶️ [richazim/minimal-ecommerce](https://github.com/richazim/minimal-ecommerce).  
Il offre un **dashboard en temps réel**, la gestion complète des produits, commandes et utilisateurs, ainsi qu’un système de téléchargement sécurisé pour les produits numériques.

---

## ✨ Fonctionnalités clés

| Domaine       | Détails                                                                 |
|--------------|-------------------------------------------------------------------------|
| **Dashboard** | Cartes (CA, ventes, clients) avec agrégations Prisma                   |
| **Produits**  | CRUD complet : nom, prix, stock, visuels                               |
| **Commandes** | Suivi des paiements, statut, vérification des téléchargements         |
| **Utilisateurs** | Liste clients + activité                                           |
| **Sécurité**  | Prisma ORM, validation stricte via Zod                                 |
| **UI**        | Tailwind CSS + Shadcn UI (Radix + lucide-react)                        |

---

## 🛠️ Stack technique

| Couche         | Techno                          |
|----------------|---------------------------------|
| Framework      | **Next.js 15 (App Router)**     |
| Langage        | **TypeScript 5**                |
| UI             | Tailwind CSS · Shadcn UI        |
| Icons          | Lucide-react                    |
| Data & ORM     | Prisma 6.9 + PostgreSQL         |
| Validation     | Zod                             |
| Déploiement    | Vercel                          |

---

## 📂 Structure du projet

src/
├─ app/ # Pages App Router (routes admin)
├─ actions/ # Server Actions (queries & mutations)
├─ components/ # UI partagée + composants métiers
├─ db/ # Client Prisma & config DB
├─ lib/ # Utilitaires
└─ generated/prisma/ # Prisma client généré
prisma/schema.prisma # Modèle de données
tailwind.config.ts

---

## 🔧 Installation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/richazim/minimal-ecommerce-admin-panel.git
cd minimal-ecommerce-admin-panel

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Remplir :
# DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
# NEXT_PUBLIC_STORE_URL=https://minimal-ecommerce.vercel.app

# 4. Générer le client Prisma & lancer
npx prisma migrate deploy
npm run dev
```

<!-- Déploiement sur Vercel
Crée un projet sur Vercel.
Renseigne les variables d’environnement dans Settings > Environment Variables.
Pousse ton repo — build & déploiement automatiques via Next.js.

🧰 Bonnes pratiques (SOLID / DRY)
Organisation modulaire par domaine (products, orders, users)
Validation stricte avec Zod pour toutes les entrées utilisateur
Hooks serveur dédiés pour les appels Prisma
Types partagés générés automatiquement
Responsabilités séparées : chaque action = une responsabilité

📈 Roadmap
 Authentification & RBAC (Clerk ou NextAuth)
 Graphiques analytics (Recharts)
 Webhooks Stripe (états des commandes)
 Support i18n + multi-devises
 GitHub Actions CI (lint + test + check Prisma)

🤝 Contribuer
Fork ce repo
Crée une branche feature/ma-feature
Code + npm run lint + npm run format
Fais une PR avec un titre clair + captures si nécessaire

📄 Licence
Projet sous licence MIT — libre de l’utiliser, modifier et distribuer.

🔗 Liens utiles
🛍️ Front minimal-ecommerce
⚙️ Admin demo : https://minimal-ecommerce-admin-panel.vercel.app
🧾 Stripe Checkout Docs
🧱 Prisma ORM
🎨 Shadcn UI -->
