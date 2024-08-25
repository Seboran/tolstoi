// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;

use nirinapass::*;
use specta::collect_types;
use tauri_specta::ts;

const PASSWORD_STORE_PATH: &'static str = ".password-store";
const PASS_COMMAND: &'static str = "pass";

#[tauri::command]
#[specta::specta] // <-- This bit here
fn list_entries() -> Vec<String> {
    list_entries_folder(&Path::new(PASSWORD_STORE_PATH))
}

#[tauri::command]
#[specta::specta] // <-- This bit here
fn show_password(name: &str) -> Option<String> {
    show_password_from_command(name, &PASS_COMMAND)
}

fn main() {
    #[cfg(debug_assertions)]
    ts::export(
        collect_types![list_entries, show_password],
        "../src/bindings.ts",
    )
    .unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![list_entries, show_password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
