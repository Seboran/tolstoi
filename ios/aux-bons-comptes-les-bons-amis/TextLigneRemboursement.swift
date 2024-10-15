//
//  TextLigneRemboursement.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 14/10/2024.
//
import SwiftUI

struct TextLigneRemboursement: View {
  let ligne: LigneRemboursement
  
  var combien: String {
    String(Double(floor(100*ligne.combien)/100))
  }
  var body: some View {
    HStack {

      Text(
        "\(ligne.qui) doit \(combien) à \(ligne.àQui)"
      )

    }
  }
}
