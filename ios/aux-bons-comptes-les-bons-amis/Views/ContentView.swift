//
//  ContentView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 13/10/2024.
//

import SwiftUI

struct ContentView: View {

  @State private var id = 1

  @State private var personnes: [PersonneDepenses] = []
  private var balances: [Double] {
    personnes.map({ $0.depense ?? 0 })
  }

  @State private var name: String = ""
  @State private var depense: Int = 0
  @State var matriceRemboursements: [[Double]] = []

  var body: some View {
    VStack {
      Text("Bons comptes bons amis").font(.title)
      ScrollView {
        Text(
          "Vous avez besoin d'aide pour répartir vos dépenses en groupe suite à des vacances, la vie en coloc ou les restaurants ? Choisissez un des modes, remplissez la liste des personnes du groupe et ajoutez ce que chacun a dépensé ! (ou pas... 🙈) "
        ).font(.caption)

        ListePersonnesGestionView(personnes: $personnes)

        BoutonCalculerView(
          balances: balances, matriceRemboursements: $matriceRemboursements
        )
        .disabled(personnes.count < 3)
        .buttonStyle(.borderedProminent)

        ListeRemboursementsView(
          matriceRemboursements: matriceRemboursements, personnes: personnes)

        Button {
          // empty balances
          personnes.removeAll()
          matriceRemboursements.removeAll()
        } label: {
          Text("Recommencer").frame(maxWidth: .infinity)
        }
        .buttonStyle(.borderless)
      }

    }
    .padding()
  }

}

#Preview {
  ContentView()
}
