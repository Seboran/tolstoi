//
//  aux_bons_comptes_les_bons_amisUITests.swift
//  aux-bons-comptes-les-bons-amisUITests
//
//  Created by Nirina Rabeson on 13/10/2024.
//

import XCTest

final class aux_bons_comptes_les_bons_amisUITests: XCTestCase {

  override func setUpWithError() throws {
    // Put setup code here. This method is called before the invocation of each test method in the class.

    // In UI tests it is usually best to stop immediately when a failure occurs.
    continueAfterFailure = false

    // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
  }

  override func tearDownWithError() throws {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
  }

  @MainActor
  func testLaunchPerformance() throws {
    if #available(macOS 10.15, iOS 13.0, tvOS 13.0, watchOS 7.0, *) {
      // This measures how long it takes to launch your application.
      measure(metrics: [XCTApplicationLaunchMetric()]) {
        XCUIApplication().launch()
      }
    }
  }

  func testExample() {

    let app = XCUIApplication()
    app.launch()

    let ajouterUnePersonneButton = app.buttons["Ajouter une personne"]
    ajouterUnePersonneButton.tap()
    ajouterUnePersonneButton.tap()
    ajouterUnePersonneButton.tap()

    app.textFields.element(boundBy: 0).tap()
    app.textFields.element(boundBy: 0).typeText("Sophie")
    app.textFields.element(boundBy: 2).tap()
    app.textFields.element(boundBy: 2).typeText("Antoine")
    app.textFields.element(boundBy: 4).tap()
    app.textFields.element(boundBy: 4).typeText("Thierry")
    app.textFields.element(boundBy: 3).tap()
    app.textFields.element(boundBy: 3).typeText(
      String(XCUIKeyboardKey.delete.rawValue))

    app.textFields.element(boundBy: 3).typeText("230")

    app.buttons["Calculer remboursements"].tap()

    XCTAssertTrue(
      app.staticTexts["Sophie doit 76.67 à Antoine"].waitForExistence(
        timeout: 10.0))

    XCTAssertTrue(
      app.staticTexts["Thierry doit 76.67 à Antoine"].waitForExistence(
        timeout: 10.0))

  }

}
