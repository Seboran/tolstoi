//
//  PersonneDepenses.swift
//  aux-bons-comptes-les-bons-amis
//
//  Created by Nirina Rabeson on 19/10/2024.
//


struct PersonneDepenses: Identifiable {
  var name: String = ""
  var depense: Double?
  var id: String { name }
}
