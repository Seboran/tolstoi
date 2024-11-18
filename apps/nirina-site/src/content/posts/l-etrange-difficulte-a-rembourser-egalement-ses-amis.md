---
draft: true
title: L'étrange difficulté à rembourser également ses amis
date: 2024-11-29
author: Nirina Rabeson
excerpt: Imaginez aller au restaurant avec 4 amis, vous passez un excellent
  repas, quand soudain il faut payer la note. Tout le monde se regard de façon
  gênante, sauf deux personnes qui décident de régler l'addition. Nous allons
  appeler ces deux personnes Jean et Jeanne. Jean règle 250€, et Jeanne règle
  300€. Comment tout le monde se rembourse ?
---

[comment]: <> (http://localhost:4321/posts/l-etrange-difficulte-a-rembourser-egalement-ses-amis)

Imaginez aller au restaurant avec 4 amis, vous passez un excellent repas, quand soudain il faut payer la note. Tout le monde se regard de façon gênante, sauf deux personnes qui décident de régler l'addition. Nous allons appeler ces deux personnes Jean et Jeanne. Jean règle 250€, et Jeanne règle 300€.

La question : comment tout le monde rembourse Jean et Jeanne ? Combien Jean doit donner à Jeanne ? Comment le faire en un minimum de remboursements ?

Ce sont des questions difficiles à généraliser !!!

C'est pourquoi j'ai fait une application web pour répondre à cette question : <https://bons-comptes-bons-amis.vercel.app/>

<iframe src="https://bons-comptes-bons-amis.vercel.app/" allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="650" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" title="Bons comptes bons amis, appli de remboursement"></iframe>

J'espère que ça marche bien ! Voyons ensemble comment j'ai réalisé cette application, et pourquoi c'est un peu compliqué :'( 

---

Revenons auprès de Jean et Jeanne, et nommons les deux personnes qui n'ont rien payé Alice et Bob. Si vous êtes intuitivement doués, ou si vous avez utilisé l'application juste au dessus, vous avez déjà la réponse à comment Alice et Bob doivent rembourser Jean et Jeanne.

Je ne suis pas intuitif, donc je n'ai pas la moindre idée de comment vous donner spontanément une réponse. Mais si vous avez une réponse intuitive je suis preneur ! En attendant, *modélisons le problème*.

## Pour résoudre un problème, il faut savoir le poser

Pour savoir combien doit à qui, il faut savoir d'abord combien chacun a dépensé. Créons un registre de ce que tout le monde a dépensé, et représentons le sous la forme d'un tableau :

|Nom|Jean|Jeanne|Alice|Bob|
|-|-|-|-|-|
|Argent dû (€)|0|0|0|0|

Le moment de payer a lieu, jean dépense 250€ pour tout le monde. On peut dire que Jean a dépensé 250€, et que cette dépense est répartie entre les 4 personnes. Disons alors que Jean entre en positif de +250€, et répartissons les -250€ / 4 = 62.5€ entre chacun.

Jean est alors dans le positif de 250 - 62.5 = 187.5€

|Nom|Jean|Jeanne|Alice|Bob|
|-|-|-|-|-|
|Argent dû (€)|187.5|-62.5|-62.5|-62.5|

Maintenant, Jeanne dépense 300€. Elle entre en positif de +300€, et tout le monde perd 300€ / 4 = 75€. Cela donne ce tableau

|Nom|Jean|Jeanne|Alice|Bob|
|-|-|-|-|-|
|Argent dû (€)|112.5|162,5|-137.5|-137.5|

Jeanne est passée de -62.5€ à 162.5€, vu qu'on a : additionné 300€ sur sa balance, soustrait 75€ de sa participation. Remarquez aussi, la somme des argents dûs est égale à zéro : ouf, aucun n'argent n'est perdu. 

Ce tableau représente l'argent que chacun doit recevoir ou doit donner au groupe pour arriver à l'égalité des charges de dépenses. Comment faire en sorte de rembourser tout le monde ? Ici c'est facile : On peut dire que la personne qui doit le plus doit rembourser celle qui doit recevoir le plus. On pourrait donc dire :

- Alice envoie 137.5€ à Jeanne
- Bob envoie 112.5€ à Jean
- Bob envoie la somme restant dûe à Jeanne, qui est 25€ à Jeanne

Trop facile ! Vous avez potentiellement eu la même réponse (ou avec Alice qui envoie deux fois de l'argent) en regardant l'application. Peut-on généraliser cette réponse ? Est-ce la meilleure réponse possible, c'est-à-dire celle qui minimise l'argent transféré entre chacun ?

## Les calculs sont-ils bons Kévin ?

Revenons au tableau de l'argent dû :

|Nom|Jean|Jeanne|Alice|Bob|
|-|-|-|-|-|
|Argent dû (€)|112.5|162,5|-137.5|-137.5|

La question est, est-ce qu'on peut faire mieux ?

Et bien, dans notre cas non. Mais il y a un exemple qui montre qu'on peut faire mieux, avec cette balance 6 personnes.

|Nom|Jean|Jeanne|Alice|Bob|Charlie|Eve|
|-|-|-|-|-|-|-|
|Argent dû (€)|10|3|3|-6|-5|-5|

Dans cet exemple, notre algorithme ne nous donne pas la meilleure combinaison. Si on applique l'algorithme, Bob envoit 6€ à Jean, puis Charlie envoie 4€ à Jean, puis Eve envoie 3€ à Jeanne, puis Eve envoie 2€ à Alice et enfin Charlie 1€ à Alice.

Un meilleur algorithme est tout simplement, Bob qui envoie 3€ à Jeanne et Alice, et Charlie et Eve qui envoient 5€ chacun à Jean. Seuement 4 remboursements au lieu de 5.

Comment généraliser cet algorithme ? Deux réponses en blog : <https://miguelbiron.github.io/post/2018-02-09-simplifying-pmts-with-lp/> et <https://hackernoon.com/adventures-in-programming-interviews-misleadingly-difficult-np-hard-problem-43092597018c>

Il y a deux façons de résoudre ce problème : le premier de façon algorithmique, et l'autre de façon numérique. Vu que je suis nul en algorithmie, attendez l'article suivant pour savoir comment on va s'y prendre en mode optimisation numérique !
