---
title: Comment l'IA change radicalement le son des guitares électriques.
date: 2024-01-18
author: Nirina Rabeson
---

Vous avez sûrement déjà une fois dans votre vie écouté un morceau de musique contenant de la guitare, mais vous-êtes vous déjà demandé comment le son de cette guitare est produit ?

_A priori_, vous vous dites qu'il faut une guitare, un ampli de guitare et un micro pour capter le son

---

_A priori_, vous vous dites qu'il faut une guitare, un ampli de guitare et un micro pour capter le son, pour obtenir une installation ressemblant à cela [(source)](https://www.flickr.com/photos/50794637@N00/2874677149):

![Photo d'un ampli fender avec des micros](https://upload.wikimedia.org/wikipedia/commons/0/0b/Fender_Supersonic_stack_4x10.jpg)

Et si je vous disais que ce morceau de musique contenant de la guitare que vous venez d'écouter n'utilise (probablement) pas d'ampli de guitare ? 😱

Vous entendez tout simplement une émulation digitale, basée sur le **machine learning**.

## Mais comment le son d'une guitare est-il produit ?

### Tout commence par des micros 

Les amplis de guitare sont tels qu'ils sonnent aujourd'hui un peu par une coïncidence. Quand les premières guitares électriques ont été inventées, il a fallu fabriquer des amplificateurs pour qu'on entende quelque chose. Le son d'une guitare électrique est produit à partir de micros utilisant un système de bobinages, qui captent les vibrations des cordes en métal. C'est cette partie de la guitare :

![Photo d'un plan zoomé sur des micros de guitare](https://upload.wikimedia.org/wikipedia/commons/8/84/Pickup-SSH.jpg)

C'est très bien, mais le seul soucis, c'est qu'on n'entend rien ! Le signal produit par ce micro est très faible et il faut alors l'amplifier.

### Les premiers amplificateurs

Pour amplifier un signal, aujourd'hui on utiliserait un transistor. Mais les premières guitares électriques remontent d'avant l'invention même des transistors ! Les fabriquants ce sont alors tournés vers ce qui existait et était accessible pour l'époque : les _tubes électroniques_, ou _vacuum tubes_ en anglais.

Les premiers groupes de rock à utiliser des guitares électriques ont ce qu'ils avaient sous la main, à savoir des amplis à tubes électroniques, et ces groupes sont devenus hyper mainstream (The Beatles, Pink Floyd, ACDC, Guns and Roses...). La culture populaire a donc associé le son des guitares à des amplificateurs utilisant des tubes électroniques.

Sauf qu'un ampli à tube, c'est hyper galère à utiliser...

### Et quel sont les problèmes des amplis à tubes électroniques ?

Aujourd'hui, les tubes ont de nombreux problèmes pratiques pour faire de la guitare :

- Les amplis à tubes pèsent une tonne
- Plus personne ou presque ne fabrique des tubes électroniques
- Ils sont plutôt fragiles comparé à des transistors
- Les amplis à tubes coûtent très cher
- Ils ont des volumes sonores beaucoup trop élevés.

Pour le dernier point, cela vient du fait que pour atteindre le maximum d'un ampli à tubes, il faut mettre son gain et son volume au maximum, et je vous laisse imaginer pour les voisins ce qu'ils en pensent...

> Pourquoi ne pas alors les remplacer par des transistors ?

Excellente question, et la réponse est simple : un transistor a un comportement différent, d'un point de vue du traitement du signal, d'un tube électronique. 

Cette différence est suffisante pour que cela s'entende, et surtout suffisante pour que cela ne sonne pas comme les groupes mainstream qui ont défini le son d'une guitare électrique (rappeler vous, The Beatles, Pink Floyd...).

C'est pourquoi, on utilise des amplis à tubes électroniques : personne ne veut que sa guitare sonne différemment... (sous entendu, mal), et le public en général s'attend à entendre des tubes (même si au fond tout le monde s'en fiche des guitares).

## Comment remplacer un ampli à tubes donc ?

Pour pouvoir remplacer un ampli à tubes, il faut savoir d'abord ce que l'on veut modéliser, ce que l'on cherche, qu'est-ce qui fait le son d'une guitare.

Un ampli à tubes, c'est un circuit électronique qui réagit de façon non linéaire à un signal entrant. Cette non-linéarité c'est concrètement ce qui produit le son riche d'une guitare, le fameux _overdrive_, voire _distorsion_ quand on pousse le volume. Voici un exemple visuel de distorsion :

![Signal d'une guitare subissant une distorsion](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Distortion_waveform.svg/1024px-Distortion_waveform.svg.png)

En haut, on peut considérer que c'est le son produit par une guitare, et en bas on peut considérer que c'est le signal émis par l'amplificateur. On peut remarquer que ces deux signaux n'ont presque rien en commun, si ce n'est qu'ils montent et descendent en même temps.

Cette distorsion, c'est le fameux son caractéristique d'une guitare. Si je vous mets le début Highway to Hell de ACDC, vous reconnaissez instantanément le son : https://www.youtube.com/watch?v=l482T0yNkeo

Recréer une distorsion produite par un tube avec des transistors est difficile, mais non impossible. Mais comme il s'agit d'un phénomène _non linéaire_ (comprendre, très compliqué d'un point de vue de la physique), il faut une très grande finesse pour réussir à produire un son convaincant. Pour chaque petite différence tonale entre une distorsion à tube et un transistor, il faut faire un petit affinage, et il y a des millions voire des milliards de petites différences tonales qui sont toutes à faire méticuleusement... si seulement il existait un moyen de configurer des milliards d'affinages facilement... 🤔

## L'IA à la rescousse de la guitare

Voici un _crash course_ de l'IA : on prend un réseau de neurones, c'est un ensemble de paramètres qui savent se reconfigurer de façon autonome pour imiter un comportement en fonction d'une entrée et d'une sortie.

Ce réseau de neurones, on va lui donner deux éléments :

- En entrée, on donne un signal que l'on a enregistré auparavant qui correspond à ce qu'on donnerait à un ampli de guitare.

- En sortie, on retourne le signal produit par l'ampli de guitare.

On pourrait dire que l'entrée correspond à ce qu'un guitariste pourrait jouer, mais c'est un peu lent et on préfère envoyer une sorte de "bruit blanc" qui permet de pousser l'ampli au maximum de ses capacités, et cela sonne comme ça : [Baissez le son avant d'écouter ce truc siouplé](https://drive.google.com/file/d/1Pgf8PdE0rKB1TD4TRPKbpNo1ByR3IOm9/view)

Ce qu'on demande à l'IA, c'est de faire en sorte que son modèle produise la même sortie pour une même entrée que l'ampli. En d'autres termes, on demande à l'IA de reproduire les mêmes _non linéarités_ qu'un ampli de guitare, et on lui demande de l'enregistrer en un fichier qu'on appelle une _capture_.

Cette capture ensuite peut prendre un quelconque signal de guitare, et restitue donc une sortie comme si c'était un vrai ampli. C'est votre ampli virtuel tout simplement.

Pour les détails plus techniques, on demande à l'IA de réduire la différence entre le signal produit par son modèle et celui enregistré depuis l'ampli, et ensuite vous invoquez l'armée d'outils d'optimisation d'un modèle (tensorflow, pycharm, votre GPU le plus puissant du marché).

## Et est-ce que ça marche bien ?

Non seulement ça marche bien, mais en plus, personne n'entend réellement la différence.

Quand je dis personne, c'est que dans un morceau final, mixé, masterisé, pressé, distribué, streamé puis enfin écouté dans un casque ou des écouteurs ou des hauts parleurs d'une qualité variable, personne n'est capable de faire la différence entre un son de guitare sortant d'un vrai ampli, d'un son de guitare venant d'un ampli virtuel capturé par une IA.

En fait, cela marche tellement bien qu'on commence à embarquer des modèles dans des unités portables de plus en plus petites, comme le QuadCortex ou le Line6 HX Stomp.

En fait, cela marche tellement bien que n'importe qui peut capturer son ampli à la maison... Ou des pédales d'effets, ou des hauts parleurs, ou d'autres captures... ou d'autres plugins...

En fait, cela marche tellement bien que des groupes entiers de musique commencent à apparaître parce qu'ils peuvent produire des sons de guitare nouveaux qui n'étaient pas pratiques ou commodes à faire sur des amplis à tubes...

Je vous mets au défi de me dire, entre ces groupes, lesquels utilisent de vrais amplis, et lesquels utilisent une capture :

https://www.youtube.com/watch?v=I0WzT0OJ-E0
https://www.youtube.com/watch?v=qpgTC9MDx1o
https://www.youtube.com/watch?v=pQzxNLfAW8o
https://www.youtube.com/watch?v=zg2076b5Lqc

Vous remarquerez que sur les exemples donné, il y a beaucoup de métal, et c'est un peu normal : c'est le genre dans lequel il y a le plus de distorsion. Et si vous voulez une expérience optimale, écoutez cette musique à 85dB [et ce lien vous expliquera peut-être pourquoi](https://en.wikipedia.org/wiki/Equal-loudness_contour) !

## Peut-on tout capturer ?

Vous remarquerez, je ne vous ai parlé que d'amplis de guitare, mais on peut aussi capturer les hauts parleurs de l'ampli, le micro qui capture l'ampli, les effets appliqués en _pré_ ou _post_ amplification... Tout est capturable.

En fait, aujourd'hui, à peu près tout le signal d'une guitare, depuis les micros jusqu'à la production, est modélisé dans une capture. Et si même l'industrie de la musique le fait, c'est parce que c'est très pratique. Au lieu d'investir dans un ampli pesant des tonnes et coûtant une fortune, on peut acheter un plugin qui contient une infinité de sons possibles pour une guitare, qui sont réglables en instantané.

Et même le jeu des guitaristes commencent à se faire capturer, avec des plugins entiers qui reprennent le jeu d'un artiste, et c'est plutôt convaincant... À vous de vous faire une opinion : https://www.youtube.com/watch?v=Snh6gaHjRN0

C'est pourquoi je trouve que l'IA change radicalement le son des guitares, parce que maintenant en deux clics et trois captures on peut produire n'importe quel son.

Est-ce que c'est pour autant la fin des amplis à tubes ? Je ne pense pas. Déjà, il n'y a probablement personne de plus traditionnel qu'un guitariste, et il faudra longtemps avant que la communauté passe totalement à autre chose.

De plus, les amplis à tube de guitare d'aujourd'hui se modernisent et apportent plein de nouvelles fonctions : sortie audio pour enregistrement direct dans une carte son, effets de guitare intégrés à l'ampli, possibilité de changer en bluetooth les paramètres de la distorsion, système de baisse de volume pour être compatible en appartement... Même les amplis traditionnels se modernisent.

Pour conclure, voici une petite vidéo de moi jouant de la guitare... Saurez-vous dire si je joue sur un vrai ou un faux ampli ?

<https://youtu.be/4k63vD7KHGY?si=Zv755BOAF-Tumx19>
