//
//  ListeRemboursementsView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 19/10/2024.
//

import SwiftUI

struct ListeRemboursementsView: View {

  var matriceRemboursements: [[Double]]
  var personnes: [PersonneDepenses]

  private var lignesRemboursement: [LigneRemboursement] {
    return matriceRemboursements.enumerated().flatMap {
      index, ligne in
      return ligne.enumerated().map {
        index2, montant in
        return LigneRemboursement(
          qui: personnes[index].name, combien: montant,
          àQui: personnes[index2].name)
      }
    }.filter { $0.combien > 0 }
  }
  var body: some View {
    
    ScrollView {
      VStack(alignment: .leading) {
        ForEach(lignesRemboursement, id: \.self.hashValue) {
          ligne in
          TextLigneRemboursementView(ligne: ligne)
        }
      }
    }

  }
}

#Preview {
  ListeRemboursementsView(
    matriceRemboursements: [
      [0, 230, 21], [0, 0, 0], [0, 10, 0],
    ],
    personnes: [
      PersonneDepenses(name: "Sophie"), PersonneDepenses(name: "Antoine"),
      PersonneDepenses(name: "Roger"),
    ])
}
