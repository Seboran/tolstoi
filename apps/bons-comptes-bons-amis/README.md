# Aux bons comptes les bons amis

![Vercel Deploy](https://deploy-badge.vercel.app/vercel/bons-comptes-bons-amis)

Imaginez, vous rentrez de vacances. Vous êtes nombreux à avoir dépensé, certains beaucoup, certains moins, certains pas du tout, et vous voulez faire les remboursements pour compter.

Malheureusement, vous ne savez pas comment vous répartir les dépenses, vous vous embêtez pour savoir qui rembourser qui, et vous vous rendez compte que ça peut vite être la pagaille.

Et vous voulez juste avoir une liste de ce que vous avez dépensé, avec le nom de qui vous l'avez dépensé.

> Heureusement que les bons comptes font les bons amis 😉

## Le fonctionnement

Renseignez la liste de toutes les personnes faisant partie du groupe, même celles qui n'ont rien mis. Renseignez les sommes dépensées (et changez éventuellement les noms), et laissez faire la magie ✨

## Développement local

```sh
pnpm i
python -r requirements.txt
pnpm dev
```

## Dépendances

Ce projet dépend de l'application [tricount-solver](https://github.com/Seboran/monorepo/tree/main/apps/tricount-solver) pour faire le calcul en live des dépendances
