# Application de remboursement entre amis qui est basée sur ze coloc

Retrouver l'histoire des matrices

Besoin : permettre d'enregistrer les dépendances de plusieurs personnes et savoir qui doit rembourser à qui

Solution : sorte de fonction qui rembourse tout le monde

Écrire un vecteur qui contient combien chacun a dépensé pour et combien doit. Par exemple prenons 4 personnes, si A paye 3€ à A, B et C paye 2€ à C et D, on obtient le vecteur des comptes suivantes :

```txt
A   B   C   D
2  -1  -1   0 (premier paiement de A pour A, B et C)
2  -1   0  -1 (deuxième paiement de C pour C et D)
```

Alors on cherche une matrice antisymétrique des remboursement. Par exemple, cette matrice permet de définir comment tout le monde doit rembourser chacun :

```txt
   A  B  C  D
A  0  1  1  0 
B -1  0
C -1     0  1
D  0    -1  0
```

Pour interpréter cette matrice, il faut comprendre que B et C donnent chacun 1€ à A, et D donne 1€ à C en lisant le triangle supérieur droit

Ces matrices doivent respecter la condition suivante

Soi M la matrice antisymétrique des remboursement, et V le vecteur des sommes investies, alors si on écrit 1u le vecteur de longueur n rempli que de 1, on cherche la solution suivante :

```txt
M 1u = V
```

## Notion d'optimalité

La matrice optimale de remboursement peut être définie de plein de façons différentes. Je pense que la meilleure est celle qui minimise l'argent transféré, cad qu'elle minimise sa norme 1.

Il "suffit" donc de trouver une matrice qui minimise la fonction suivante :

```txt
M -> M1 u = V
min(|M|_1)
```
