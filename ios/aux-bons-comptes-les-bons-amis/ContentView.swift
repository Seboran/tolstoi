//
//  ContentView.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 13/10/2024.
//

import SwiftUI

private struct PersonneDepenses: Identifiable {
  var name: String = ""
  var depense: Double = 0
  var id: String { name }
}

private struct LigneRemboursement: Hashable {
  var qui: String
  var combien: Double
  var àQui: String
}

struct ContentView: View {

  @State private var selected = "Baseball"

  @State private var id = 1

  @State private var personnes: [PersonneDepenses] = []
  private var balances: Binding<[Double]> {
    Binding(get: { personnes.map({ $0.depense }) }, set: { $0 })
  }

  @State private var name: String = ""
  @State private var depense: Int = 0
  @State private var matriceRemboursements: [[Double]] = []
  @State private var lignesRemboursement: [LigneRemboursement] = []
  var body: some View {
    VStack {
      VStack {
        Text("Bons comptes bons amis").font(.largeTitle)

        Text(
          "Vous avez besoin d'aide pour répartir vos dépenses en groupe suite à des vacances, la vie en coloc ou les restaurants ? Choisissez un des modes, remplissez la liste des personnes du groupe et ajoutez ce que chacun a dépensé ! (ou pas... 🙈) "
        ).font(.caption)
      }

      ForEach(Array($personnes.enumerated()), id: \.offset) {
        index, $personne in

        HStack {
          TextField("Nom", text: $personne.name)
          TextField("Dépense", value: $personne.depense, format: .number)
          Button("Supprimer", systemImage: "trash") {
            personnes.remove(at: index)
          }.labelStyle(.iconOnly)
        }
      }
      Button {
        personnes.append(
          PersonneDepenses(name: "", depense: 0)
        )
      } label: {
        Text("Ajouter une personne").frame(maxWidth: .infinity)
      }.buttonStyle(.bordered)
      Button {
        Task {
          matriceRemboursements = try await fetchRemboursements(
            balances: balances.wrappedValue)
          lignesRemboursement = matriceRemboursements.enumerated().flatMap {
            index, ligne in
            return ligne.enumerated().map {
              index2, montant in
              return LigneRemboursement(
                qui: personnes[index].name, combien: montant,
                àQui: personnes[index2].name)
            }

          }.filter { $0.combien > 0 }
        }
      } label: {
        Text("Calculer remboursements").frame(maxWidth: .infinity)
      }.disabled(personnes.count < 3)

        .buttonStyle(.borderedProminent)
      VStack {
        ForEach($lignesRemboursement, id: \.self.hashValue) {
          $ligne in
          HStack {

            Text(
              "\($ligne.qui.wrappedValue) doit \((100.0 * $ligne.combien.wrappedValue).rounded()/100.0) à \($ligne.àQui.wrappedValue)"
            )

          }
        }

      }
      Spacer()
    }.padding()
  }

}

struct RetourApiSolve: Decodable {
  let result_matrix: [[Double]]
}

class HistoriqueDepenses {
  var indexDépenseur: Int
  var montant: Double
  var listeIndexesBénéficiares: [Int]

  init(indexDépenseur: Int, montant: Double, listeIndexesBénéficiares: [Int]) {
    self.indexDépenseur = indexDépenseur
    self.montant = montant
    self.listeIndexesBénéficiares = listeIndexesBénéficiares
  }
}

class UseAjouterDepense {
  private var balances: [Double]
  private var historiqueDépenses: [HistoriqueDepenses] = []

  init(balances: [Double]) {
    self.balances = balances
  }

  @Published var indexDepenseur: Int = 0
  @Published var montant: Double = 0.0
  @Published var bénéficiaires: [Int] = []

  func ajouterDepense() {
    let montantParBénéficiaire = montant / Double(bénéficiaires.count)

    for indexBénéficiaire in bénéficiaires {
      balances[indexBénéficiaire] -= montantParBénéficiaire
    }
    balances[indexDepenseur] += montant

    let historiqueDépense = HistoriqueDepenses(
      indexDépenseur: indexDepenseur,
      montant: montant,
      listeIndexesBénéficiares: bénéficiaires)
    historiqueDépenses.append(historiqueDépense)
  }
}

func fetchRemboursements(balances: [Double]) async throws -> [[Double]] {
  var depenses: [Double] = Array(repeating: 0.0, count: balances.count)
  balances.enumerated().forEach {
    index1, balance in
    for (index, _depense) in depenses.enumerated() {
      depenses[index] -= balance / Double(depenses.count)
    }
    depenses[index1] += balance
  }

  let jsonObject: [String: [Double]] = [
    "balances": depenses
  ]

  // Encode data to JSON to send in the POST request body:
  let encoder = JSONEncoder()
  let requestData = try encoder.encode(jsonObject)

  // Form the POST request:
  let url = URL(
    string: "https://bons-comptes-bons-amis.vercel.app/api/v2/solve")!

  var request = URLRequest(url: url)
  request.httpMethod = "POST"
  request.setValue(
    "application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")

  // Use the async variant of URLSession to make an HTTP POST request:
  let (data, response) = try await URLSession.shared.upload(
    for: request, from: requestData)

  print("HTTPURLResponse:", response)
  print("The response body is:", String(decoding: data, as: UTF8.self))

  // Parse the JSON response:
  return (try JSONDecoder().decode(RetourApiSolve.self, from: data))
    .result_matrix
}

#Preview {
  ContentView()
}
