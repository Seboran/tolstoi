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