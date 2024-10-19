//
//  BoutonCalculerView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 19/10/2024.
//

import SwiftUI

struct BoutonCalculerView: View {
  var balances: [Double]
  @Binding var matriceRemboursements: [[Double]]
  @Binding var loading: Bool
  var body: some View {
    Button {
      loading = true
      UIApplication.shared.endEditing() // Call to dismiss keyboard
      Task {
        matriceRemboursements = try await fetchRemboursements(
          balances: balances)
        loading = false
      }
    } label: {
      Text("Calculer remboursements").frame(maxWidth: .infinity)
    }

  }
}

#Preview {
  BoutonCalculerView(balances: [], matriceRemboursements: .constant([[]]), loading: .constant(false))
}
