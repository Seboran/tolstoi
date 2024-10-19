//
//  AboutMeView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 19/10/2024.
//

import SwiftUI

struct AboutMeView: View {
  var body: some View {
    VStack {
      Text(
        "Vous avez besoin d'aide pour répartir vos dépenses en groupe suite à des vacances, la vie en coloc ou les restaurants ? Choisissez un des modes, remplissez la liste des personnes du groupe et ajoutez ce que chacun a dépensé ! (ou pas... 🙈) "
      )
      Spacer()
      Text(
        "Le code source est accessible ici : [Github](https://github.com/Seboran/bons-comptes-bons-amis)"
      )
    }.padding()
  }
}

#Preview {
  AboutMeView()
}
