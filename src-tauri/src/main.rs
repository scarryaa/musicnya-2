#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;

fn start_node_server() {
    Command::new("node")
        .arg("../api_server/main.cjs")
        .spawn()
        .expect("Failed to start the node server.");
}

fn main() {
    tauri::Builder::default()
        .setup(|_| {
            start_node_server();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
