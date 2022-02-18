#[cfg(target_os = "windows")]
use std::env;

#[cfg(target_os = "windows")]
use tauri_build::{try_build, Attributes, WindowsAttributes};

#[cfg(target_os = "windows")]
fn main() {
    let mut win_sdk_path = env::var("CARGO_FEATURE_WIN_SDK_PATH")
        .unwrap_or_else(|_| "C:/Program Files (x86)/Windows Kits/10/bin/10.0.20348.0/x64/".into());

    if let Ok(v) = env::var("CARGO_FEATURE_WIN_SDK_VER") {
        win_sdk_path = format!("C:/Program Files (x86)/Windows Kits/10/bin/{}/x64/", v)
    }

    if let Err(error) = try_build(
        Attributes::new().windows_attributes(WindowsAttributes::new().sdk_dir(win_sdk_path)),
    ) {
        panic!("error found during tauri-build: {}", error);
    }
}

#[cfg(unix)]
fn main() {
    tauri_build::build()
}
