//
//  RemboursementsView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 19/10/2024.
//

import SwiftUI

struct RemboursementsView: View {
  @State private var personnes: [PersonneDepenses] = []
  private var balances: [Double] {
    personnes.map({ $0.depense ?? 0 })
  }

  @State private var name: String = ""
  @State private var depense: Int = 0
  @State var matriceRemboursements: [[Double]] = []
  @State var matriceIsLoading: Bool = false

  var body: some View {
    ScrollView {

      ListePersonnesGestionView(personnes: $personnes)

      BoutonCalculerView(
        balances: balances, matriceRemboursements: $matriceRemboursements,
        loading: $matriceIsLoading
      )
      .disabled(personnes.count < 3)
      .buttonStyle(.borderedProminent)

      if matriceIsLoading {
        ProgressView().frame(height: 50).padding()
      } else {
        ListeRemboursementsView(
          matriceRemboursements: matriceRemboursements, personnes: personnes)
      }

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
}

#Preview {
  RemboursementsView()
}
