use std::env;

use tauri_build::{try_build, Attributes, WindowsAttributes};

fn main() {
    let mut win_sdk_path = env::var("CARGO_FEATURE_WIN_SDK_PATH").unwrap_or(
        "C:/Program Files (x86)/Windows Kits/10/bin/10.0.18362.0/x64/".into(),
    );

    if let Ok(v) = env::var("CARGO_FEATURE_WIN_SDK_VER") {
        win_sdk_path =
            format!("C:/Program Files (x86)/Windows Kits/10/bin/{}/x64/", v).into()
    }

    if let Err(error) = try_build(
        Attributes::new()
            .windows_attributes(WindowsAttributes::new().sdk_dir(win_sdk_path)),
    ) {
        panic!("error found during tauri-build: {}", error);
    }
}
