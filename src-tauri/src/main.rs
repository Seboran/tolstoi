// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;

use nirinapass::*;

const PASSWORD_STORE_PATH: &'static str = ".password-store";
const PASS_COMMAND: &'static str = "pass";

#[tauri::command]
fn list_entries() -> Vec<String> {
    list_entries_folder(&Path::new(PASSWORD_STORE_PATH))
}

#[tauri::command]
fn show_password(name: &str) -> Option<String> {
    show_password_from_command(name, &PASS_COMMAND)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![list_entries, show_password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
