//
//  TitleView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 14/10/2024.
//


import SwiftUI

struct TitleView: View {
  var body: some View {
    VStack {
      Text("Bons comptes bons amis").font(.largeTitle)
      
      Text(
        "Vous avez besoin d'aide pour répartir vos dépenses en groupe suite à des vacances, la vie en coloc ou les restaurants ? Choisissez un des modes, remplissez la liste des personnes du groupe et ajoutez ce que chacun a dépensé ! (ou pas... 🙈) "
      ).font(.caption)
    }
  }
}
