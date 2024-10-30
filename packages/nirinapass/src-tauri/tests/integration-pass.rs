use std::env;

use nirinapass::show_password_from_command;

#[test]
fn retourne_un_mot_de_pass_crypte() {
    let show_password_from_command =
        show_password_from_command("laredoute", env!("CARGO_BIN_EXE_pass_mock"));
    assert_eq!(
        show_password_from_command,
        Some(String::from("02920\nurl: laredoute.fr"))
    )
}
