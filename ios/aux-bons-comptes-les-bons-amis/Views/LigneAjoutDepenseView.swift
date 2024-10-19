//
//  LigneAjoutDepenseView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 19/10/2024.
//

import SwiftUI

struct LigneAjoutDepenseView: View {
  @Binding var personne: PersonneDepenses

  var onDelete: () -> Void

  var body: some View {
    HStack {
      TextField("Nom", text: $personne.name)
      TextField("Dépense", value: $personne.depense, format: .number)
        .keyboardType(.numbersAndPunctuation)
      Button("Supprimer", systemImage: "trash") {
        onDelete()
      }.labelStyle(.iconOnly)
    }
  }
}

// extension for keyboard to dismiss
extension UIApplication {
  func endEditing() {
    sendAction(
      #selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
  }
}

#Preview {
  LigneAjoutDepenseView(
    personne: .constant(PersonneDepenses(name: "Yo", depense: nil))
  ) {
    //
  }
}
