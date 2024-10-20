//
//  ListeMotsDePasse.swift
//  nirinapass
//
//  Created by Nirina Rabeson on 20/10/2024.
//

import SwiftUI

struct ListeMotsDePasse: View {
  var items: [PasswordEntry]
  @State var filter: String = ""
  
  private var filteredItems: [PasswordEntry] {
    items.filter {
      filter.isEmpty || $0.name.contains(filter)
    }
  }
  var body: some View {
    TextField(
      "Filter passwords",
      text: $filter)
    List {
      ForEach(filteredItems) { item in
        NavigationLink {
          Text(
            "Item at \(item.name)"
          )
        } label: {
          Text(
            item.name
          )
        }
      }
    }
  }
}

#Preview {
  ListeMotsDePasse(
    items: ([
      PasswordEntry(name: "laredoute", password: "123soleil"),
      PasswordEntry(name: "fnac.fr", password: "yoyéfeso"),
      PasswordEntry(name: "abc", password: "8ç!ém$"),
      PasswordEntry(name: "acme", password: "^^..é1"),
      PasswordEntry(name: "example", password: "bibou"),
      PasswordEntry(name: "efg", password: "##é"),
      PasswordEntry(name: "arc.fr", password: "supermotdepasse"),
    ]))
}
