//
//  ListePersonnesGestionView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 19/10/2024.
//

import SwiftUI

struct ListePersonnesGestionView: View {
  @Binding var personnes: [PersonneDepenses]
  var body: some View {
    ForEach(Array($personnes.enumerated()), id: \.offset) {
      index, $personne in

      LigneAjoutDepenseView(personne: $personne) {
        personnes.remove(at: index)
      }

    }
    Button {
      personnes.append(
        PersonneDepenses(name: "", depense: nil)
      )
    } label: {
      Text("Ajouter une personne").frame(maxWidth: .infinity)
    }
    .buttonStyle(.bordered)
  }
}

#Preview {
  ListePersonnesGestionView(
    personnes: .constant([
      PersonneDepenses(name: "", depense: nil),
      PersonneDepenses(name: "Laura", depense: 200),
    ]))
}
