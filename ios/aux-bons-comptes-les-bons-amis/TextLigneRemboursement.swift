//
//  TextLigneRemboursement.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 14/10/2024.
//
import SwiftUI

struct TextLigneRemboursement: View {
  let ligne: LigneRemboursement
  var body: some View {
    HStack {

      Text(
        "\(ligne.qui) doit \((100.0 * ligne.combien).rounded()/100.0) à \(ligne.àQui)"
      )

    }
  }
}
