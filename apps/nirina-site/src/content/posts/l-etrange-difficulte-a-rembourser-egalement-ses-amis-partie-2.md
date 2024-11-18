---
draft: true
title: L'étrange difficulté à rembourser également ses amis - partie 2
date: 2024-12-02
author: Nirina Rabeson
excerpt: Imaginez aller au restaurant avec 4 amis, vous passez un excellent
  repas, quand soudain il faut payer la note. Tout le monde se regard de façon
  gênante, sauf deux personnes qui décident de régler l'addition. Nous allons
  appeler ces deux personnes Jean et Jeanne. Jean règle 250€, et Jeanne règle
  300€. Comment tout le monde se rembourse ?
---

Aujourd'hui c'est mon anniversaire ! Pourquoi ne pas vous faire peur donc en parlant d'optimisation numérique ? Si vous ne savez pas de quoi je parle, allez voir [cet article qui parle de comment on peut avoir une intuition d'un algorithme de remboursement entre amis](/posts/l-etrange-difficulte-a-rembourser-egalement-ses-amis)

Rappelez-vous, c'est cette petite application :

<iframe src="https://bons-comptes-bons-amis.vercel.app/" allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="650" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" title="Bons comptes bons amis, appli de remboursement"></iframe>

Il y a deux façons de résoudre ce problème : le premier de façon algorithmique, et l'autre de façon numérique. Vu que je suis nul en algorithmie, essayons de comprendre la façon numérique.

## La géométrie pour décrire le problème

Rappelons-nous de nos balances de dépenses :

|Nom|Jean|Jeanne|Alice|Bob|
|-|-|-|-|-|
|Argent dû (€)|112.5|162,5|-137.5|-137.5|

On avait vu dans l'article précédent un cas un peu particulier qui fait qu'un algorithme bête de remboursement ne marche pas. On aimerait aussi pouvoir prouver que cet algorithme peut éventuellement donner les meilleures solutions.

Qu'est-ce que la meilleure solution ? C'est la liste des virements tels que leur somme est la plus basse possible, en impliquant le moins de personnes que possible. Si une solution de remboursement permet de répartir l'argent de tout le monde en 200€ virés, alors c'est bien mieux qu'en 300€. On aimerait même, qu'il y ait le minimum de virements à effectuer. C'est hélas la partie la plus dure à modéliser, mais nous allons tenter.

### Penser comme un algorithme d'optimisation numérique

Le problème de l'algorithmie, c'est que c'est difficile d'avoir une intuition de ce qu'il se passe. Par contre pour l'optimisation numérique, c'est très facile : tout est une coline. Par exemple, saurez-vous me trouver le minimum de cette fonction ?

![Photo d'une courbe contenant un signal chaotique. En absisses, le texte "fminsearch performance", et en ordonnées "Number of function evaluations needed". Le minimum est situé vers -0.5](./images/image.png)

C'est plutôt facile, c'est la valeur située le plus bas possible. Mais que signifie "le plus bas possible" pour de l'optimisation numérique ?

![Photo de collines verdoyantes avec des arbres et un beau ciel avec de jolis nuages](./images/image-1.png)

Imaginez vous plutôt dans des collines, et imaginez qu'on vous demande de trouver le point le plus bas parmi ces collines. Vous n'avez pas moyen de trouver le point le plus bas, et vous n'avez pas un appareil magique comme un GPS pour déterminer ce point. Comment faites vous ?

Une technique bête, ce serait de suivre par exemple vers quel endroit l'eau coule : du fait de la gravité, l'eau va plutôt couler vers le bas. C'est un peu notre première technique magique qui permet de détecter notre point. Autre technique bête : avez-vous l'impression de faire un effort pour vous déplacer, ou au contraire pouvez-vous vous laisser porter ? C'est un peu lié à la sensation que la gravité nous guide. 

Comment savez-vous alors que vous avez atteint le point le plus bas ? Et bien tout simplement parce qu'à force d'avoir la sensation de descendre, à un moment vous avez l'impression de remonter. Cela correspond à un point qui est ou bien très plat, ou alors qui est très... pointu dira-ton (comme dans un trou).

> Alors, techniquement c'est un peu faux mais je peux pas vous résumer 4 ans de cours d'optimisation numérique en un article de blog... Comment faire s'il y a plusieurs trous ?

Un algorithme d'optimisation numérique, il fait exactement ça : sur une courbe quelconque, il va tenter de se laisser guidé par la gravité. Et en fait, il est même super malin : il n'a pas besoin de recoder la gravité partout. Il a juste besoin de le faire là où cela devient plat ou très pointu (comme dans un trou rappelez-vous).

Dans notre exemple ci-dessus, la fonction n'est jamais plate, mais elle est très souvent pointue : Pour trouver le minimum, il suffit de calculer la fonction à tous les endroits pointus. On peut voir dans le graphique que le point le plus bas est bien cassé.

Et pour notre problème, alors quel est le point le plus plat ou le plus cassé ? Et bien sans trop faire les calculs (mais si vous aimez la géométrie en dimension élevée, n'hésitez pas à me contacter), la somme totale de l'argent versé ressemble un peu à ceci (source <https://math.stackexchange.com/questions/2455896/minimizing-a-function-involving-several-modulus-terms>) :

![graphique de somme de fonctions valeurs absolues. On peut voir plusieurs segments collés ensemble.](./images/image-2.png)

Le point le plus bas est celui rouge. L'algorithme d'optimisation numérique est capable de détecter tous les emplacements un peu cassés, et il teste juste celui qui semble être le plus plat. Comment on obtient cette courbe ? Comment trouver tous les points les plus cassés ? Comment on itère sur chacun ?

Si jamais vous êtes curieux de comment c'est implémenté, je vous invite à jeter un oeil au code python ici présent : <https://github.com/Seboran/monorepo/blob/main/apps/bons-comptes-bons-amis/solve_for_n.py>. Mais pour résumer, l'algorithme fait les choses suivantes :

- Il écrit sous forme de balances l'ensemble de l'argent que chacun doit, ou doit recevoir
- Il transforme sous forme d'une matrice antisymétrique l'ensemble des dépenses que chacun doit faire (ou que chacun doit recevoir)
- Il transforme cette matrice en un vecteur linéaire et applique une transformation (son dual) pour transformer un problème de remboursement en un problème d'optimisation avec la courbe en segments que je vous montre
- L'algorithme transforme la courbe plein de segments en un problème linéaire sous contraintes, ce qui fait que c'est **stupidement** simple à résoudre. Merci `PulP`.
- Il ajoute le nombre de virements à l'équation qui calcule le minimum d'argent à livrer, parce que sinon c'est trop facile
- Il teste quand même avec un algorithme de type `MIPS` l'ensemble des combinaisons possibles restantes (enfin de ce que j'ai compris) en utilisant une version améliorée de l'algorithme du `simplex`.
- Il trouve la solution optimale et la retourne sous forme d'une liste de gens à rembourser (sous forme de matrice)

Et il ne me reste plus qu'à afficher cette liste... Pfiou 😭

Et voilà pourquoi le titre de cet article : **est-ce que vous auriez deviné que rembourser ses amis était si difficile ?**

## Récapitulons

Pour rembourser ses amis, c'est facile : notez ce que chacun a dépensé, et rensignez ensuite le tout dans <https://bons-comptes-bons-amis.vercel.app/>. Il y a même un mode avancé si vous voulez faire des remboursements assez fins entre individus, entre groupes...

Sachez que je l'ai battle proof pour qu'il fonctionne jusqu'à 15 personnes à se rembourser, jusqu'à 3000 virements effectués. Au delà ça devient très lent et mon provider peut m'emboucaner 💀. Mais si vous faites peu de virements, l'algorithme peut tenir une 30 aine de personnes. C'est vraiment quand les remboursements deviennent complexes que je ne recommande pas d'avoir plus de 15 personnes dans la liste.

Merci beaucoup pour cette lecture, j'espère la compléter quand je saurai comment vous expliquer l'algorithme du simplex... Peut-être dans une partie 2 ?
