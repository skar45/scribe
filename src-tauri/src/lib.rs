use std::{error::Error, fs::File, path::Path};

use zip::ZipArchive;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn read_files(files: Vec<&str>) -> Vec<String> {
    let mut contents: Vec<String> = Vec::new();
    for file in files {
        let path = Path::new(file);
        if let Some(ext) = path.extension() {
            if ext == "epub"{
                contents.push(process_epub(path).unwrap());
            }
        }
    }
    contents
}

fn process_epub(path: &Path) -> Result<String, Box<dyn Error>> {
    let file = File::open(path)?;
    let mut zip = ZipArchive::new(file)?;
    let mut buf = String::new();
    for i in 0..zip.len() {
        let file = zip.by_index(i)?;
        buf.push_str(file.name());
        buf.push_str(", ");
    }
    Ok(buf)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, read_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
