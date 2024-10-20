//
//  ContentView.swift
//  nirinapass
//
//  Created by Nirina Rabeson on 20/10/2024.
//

import SwiftData
import SwiftUI

struct ContentView: View {
  @Environment(\.modelContext) private var modelContext
  @Query private var items: [PasswordEntry]

  var body: some View {
    NavigationSplitView {

//      ListeMotsDePasse(items: $items)
//
//      .toolbar {
//        ToolbarItem {
//          Button(action: addItem) {
//            Label("Add Item", systemImage: "plus")
//          }
//        }
//      }
    } detail: {
      Text("Select an item")
    }

  }

  private func addItem() {
    withAnimation {
      let newItem = Item(timestamp: Date())
      modelContext.insert(newItem)
    }
  }

  private func deleteItems(offsets: IndexSet) {
    withAnimation {
      for index in offsets {
        modelContext.delete(items[index])
      }
    }
  }
}

#Preview {
  ContentView()
    .modelContainer(for: Item.self, inMemory: true)
}
