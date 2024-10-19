//
//  RetourApiSolve.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 19/10/2024.
//

import SwiftUI

struct RetourApiSolve: Decodable {
  let result_matrix: [[Double]]
}

func fetchRemboursements(balances: [Double]) async throws -> [[Double]] {
  var depenses: [Double] = Array(repeating: 0.0, count: balances.count)
  balances.enumerated().forEach {
    index1, balance in
    for (index, _) in depenses.enumerated() {
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
