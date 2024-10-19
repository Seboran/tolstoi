//
//  ContentView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 13/10/2024.
//

import SwiftUI

struct ContentView: View {

  @State private var id = 1

  var body: some View {
    NavigationStack {
      VStack {
        HStack {
          Text("Bons comptes bons amis").font(.title)
          Spacer()
          NavigationLink {
            AboutMeView()
          } label: {
            Label("Plus d'info", systemImage: "questionmark.circle")
              .labelStyle(.iconOnly)
          }
        }
        RemboursementsView()

      }
      .padding()
    }
  }

}

#Preview {
  ContentView()
}
