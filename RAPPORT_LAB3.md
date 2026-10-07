# Rapport de Laboratoire 3 — SEG 3502
**Angular — Composants, Formulaires Templates, Inputs/Outputs et Observables**

---

### Informations des étudiants
- **Étudiant :** Anwar
- **Étudiant :** Manasse
- **Cours :** SEG 3502
- **Date :** Octobre 2026
- **Projet :** `lab3-shopping-list`

---

## 1. Lien vers le dépôt GitHub
**Dépôt :** [https://github.com/Anwarito-lbd/SEG3502-Lab3.git](https://github.com/Anwarito-lbd/SEG3502-Lab3.git) *(ou le devoir GitHub Classroom associé)*

---

## 2. Objectifs & Travail Réalisé

Dans le cadre de ce troisième laboratoire, nous avons exploré en profondeur le développement modulaire avec le framework **Angular (v22)** en composants autonomes (*Standalone Components*).

Le laboratoire est composé de deux volets complémentaires :
1. **L'exercice évalué (Livrable officiel) :** L'application de liste de courses (**Shopping List**), conçue selon le wireframe fourni avec au minimum deux composants Angular dédiés, assurant la saisie (`Ajouter`), l'affichage stylisé et la suppression (`Supprimer`).
2. **Le tutoriel complet du laboratoire :** L'application de carnet d'adresses (**Address Book**), mettant en œuvre la navigation, l'édition désactivable/protégée de fiches d'adresse, et la synchronisation réactive par un `NotificationService` basé sur un `BehaviorSubject` RxJS.

---

## 3. Architecture des Composants

### A. Application Shopping List (Livrable évalué)
L'application de liste de courses respecte rigoureusement la contrainte architecturale exigeant **au moins deux composants Angular** :

1. **`ShoppingInputComponent` (`<app-shopping-input>`) :**
   - Composant responsable de la saisie de texte et de l'ajout d'articles.
   - Utilise une liaison bidirectionnelle template-driven `[(ngModel)]` pour lier le champ de texte à la propriété `itemText`.
   - Fournit un événement de sortie `@Output() itemAdded = new EventEmitter<string>()`.
   - Permet la validation des entrées (rejet des chaînes vides/espaces) et supporte l'ajout par clic sur le bouton `Ajouter` ou par la touche `Enter` (`(keyup.enter)`).
   - Réinitialise automatiquement le champ de saisie après ajout.

2. **`ShoppingListDisplayComponent` (`<app-shopping-list-display>`) :**
   - Composant responsable du rendu de la collection d'articles.
   - Reçoit la liste d'articles via `@Input() items: string[]`.
   - Émet un événement de suppression `@Output() itemDeleted = new EventEmitter<number>()` avec l'indice de l'élément à supprimer.
   - Utilise la directive structurelle moderne `@for (item of items; track $index)` avec bloc `@empty` de secours.

3. **`ShoppingItemComponent` (`<app-shopping-item>`) :**
   - Sous-composant modulaire représentant un élément individuel de la liste.
   - Affiche le badge bleu arrondi (`.item-badge`) contenant le texte de l'item (ex: `5 pommes`, `12 oeufs`, `1 pain`) et le bouton gris stylisé `Supprimer`.
   - Reçoit `@Input() item: string` et `@Input() index: number`.
   - Émet `@Output() delete = new EventEmitter<number>()`.

4. **`ShoppingListComponent` (`<app-shopping-list>`) :**
   - Composant conteneur assemblant le composant de saisie et le composant d'affichage au sein d'une carte bordée correspondant au wireframe de la page 14 du guide.
   - Orchestre les interactions et fournit un bouton de réinitialisation de la liste par défaut.

5. **`ShoppingService` :**
   - Service injectable gérant l'état de la liste de courses via un `BehaviorSubject<string[]>`.
   - Initialisé avec les 3 items du sujet : `['5 pommes', '12 oeufs', '1 pain']`.
   - Expose un flux réactif `items$: Observable<string[]>`.

---

### B. Application Carnet d'adresses (Address Book — Tutoriel)
Pour garantir une complétude totale par rapport au manuel de laboratoire :

1. **`AddressEntry` :** Modèle de données TypeScript représentant une entrée (`firstName`, `lastName`, `phone`, `email`, `notes`).
2. **`HeaderComponent` (`<app-header>`) :** Barre de navigation avec titre d'application.
3. **`AddressListElement` (`<app-address-list-element>`) :** Composant bouton pour chaque contact dans la liste latérale, utilisant `[ngClass]` pour styliser l'élément actif (`address-list-element-selected`) et souscrivant au service de notification.
4. **`AddressView` (`<app-address-view>`) :** Vue de détail formulaire utilisant `[(ngModel)]`, bascule d'édition `Edit`/`Protect`, et émission de suppression via `@Output() fireDelete`.
5. **`AddressList` (`<app-address-list>`) :** Conteneur principal gérant l'ajout d'une nouvelle entrée, la sélection et le filtre de suppression.
6. **`NotificationService` :** Service fournissant un `BehaviorSubject<AddressEntry | null>` pour notifier le composant sélectionné aux éléments de liste sans relation directe parent-enfant.

---

### C. Composant Racine (`App`)
Le composant `App` intègre un système d'onglets ergonomique permettant à l'évaluateur de basculer instantanément :
- **Onglet 1 (Par défaut) :** 🛒 **Exercice : Liste de courses (Livrable)**
- **Onglet 2 :** 📇 **Tutoriel : Carnet d'adresses (Address Book)**

---

## 4. Captures d'écran de l'Application

### A. Exercice Évalué : Liste de Courses (Shopping List)
L'interface ci-dessous illustre le livrable officiel en fonctionnement, intégrant la barre de saisie, les badges d'articles bleus et les boutons d'action conformément au wireframe du sujet :

![Liste de courses (Shopping List)](./screenshot_shopping_list.png)

### B. Tutoriel du Laboratoire : Carnet d'adresses (Address Book)
L'interface ci-dessous illustre le carnet d'adresses complet développé lors du tutoriel, avec liste de sélection latérale et formulaire d'édition dynamique :

![Carnet d'adresses (Address Book)](./screenshot_address_book.png)

---

## 5. Suite de Tests Automatisés (Vitest)

Une suite complète de **31 tests unitaires** répartis sur **10 fichiers de spécification** a été mise en place et validée avec succès :

| Fichier de Test | Composant / Service Testé | Nombre de Tests | Statut |
|---|---|:---:|:---:|
| `shopping.service.spec.ts` | `ShoppingService` (initialisation, ajout, suppression, validation, réinitialisation) | 6 | ✅ Passé |
| `shopping-input.spec.ts` | `ShoppingInputComponent` (saisie, émission `itemAdded`, vidage du champ, trim) | 4 | ✅ Passé |
| `shopping-item.spec.ts` | `ShoppingItemComponent` (rendu, émission `delete` avec index) | 2 | ✅ Passé |
| `shopping-list-display.spec.ts` | `ShoppingListDisplayComponent` (réception `@Input()`, propagation `itemDeleted`) | 3 | ✅ Passé |
| `shopping-list.spec.ts` | `ShoppingListComponent` (orchestration, ajout, suppression, reset) | 4 | ✅ Passé |
| `address-entry.spec.ts` | Modèle de données `AddressEntry` | 2 | ✅ Passé |
| `notification-service.spec.ts` | `NotificationService` (émission RxJS `BehaviorSubject`) | 2 | ✅ Passé |
| `address-view.spec.ts` | `AddressView` (mode édition, bascule protect/edit, émission `fireDelete`) | 3 | ✅ Passé |
| `address-list.spec.ts` | `AddressList` (sélection initiale, ajout, suppression) | 3 | ✅ Passé |
| `app.spec.ts` | `App` (onglet par défaut, navigation par onglets) | 2 | ✅ Passé |
| **Total** | **Ensemble de l'application** | **31** | **100% Succès** |

---

## 6. Guide d'Exécution

```bash
# 1. Se positionner dans le dossier du projet
cd lab3-shopping-list

# 2. Lancer le serveur de développement Angular
npm start
# L'application est alors accessible sur http://localhost:4200

# 3. Lancer la suite complète de tests unitaires
npm test

# 4. Compiler l'application pour la production
npm run build
```

---

## 7. Conclusion
Toutes les exigences du laboratoire 3 ont été rigoureusement respectées et validées. L'application met en œuvre des composants Angular autonomes propres, une séparation stricte des responsabilités, une communication bidirectionnelle robuste par Inputs, Outputs et Observables RxJS, ainsi qu'une interface fidèle au wireframe officiel.
