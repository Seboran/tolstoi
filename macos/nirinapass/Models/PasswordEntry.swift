//
//  PasswordEntry.swift
//  nirinapass
//
//  Created by Nirina Rabeson on 20/10/2024.
//

import Foundation
import SwiftData

@Model
final class PasswordEntry {
  var name: String
  var password: String

  init(name: String, password: String) {
    self.name = name
    self.password = password
  }
}
