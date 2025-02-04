use std::{error::Error, fs::File, io::Read, path::{Path, PathBuf}};

use xml::{reader::XmlEvent, EventReader};
use zip::ZipArchive;

const CONTAINER_PATH: &'static str = "META-INF/container.xml";
const ROOT_ELEM: &'static str = "rootfile";
const ROOT_ATTR: &'static str = "full-path";
const EXT_EPUB: &'static str = "epub";

#[tauri::command]
fn read_files(files: Vec<&str>) -> Vec<String> {
    let mut contents: Vec<String> = Vec::new();
    for file in files {
        let path = Path::new(file);
        println!("processing file: {}", file);
        if let Some(ext) = path.extension() {
            if ext == EXT_EPUB {
                println!("is epub");
                match process_epub(path) {
                    Ok(content) => contents.push(content),
                    Err(e) => contents.push(e.to_string()),
                }
            }
        }
    }
    contents
}

fn process_epub(path: &Path) -> Result<String, Box<dyn Error>> {
    println!("processing epub: {}", path.file_name().map_or("", |f| f.to_str().expect("err")));
    let file = File::open(path)?;
    let mut zip = ZipArchive::new(file)?;
    let mut files: Vec<PathBuf> = Vec::new();
    for i in 0..zip.len() {
        let file = zip.by_index(i)?;
        if file.is_file() {
            let path = match file.enclosed_name() {
                Some(p) => p,
                None => continue
            };
            if path == PathBuf::from(CONTAINER_PATH) {
                println!("contains container path: {}", file.name());
                return parse_container(file)
            }
            files.push(path);
        }
    }
    Ok("todo".to_string())
}

fn parse_container<R: Read>(reader: R) -> Result<String, Box<dyn Error>> {
    println!("parsing container");
    let mut xml_reader = EventReader::new(reader);
    loop {
        let elem = xml_reader.next();
        println!("reading elem");
        match elem {
            Ok(xml_e) =>  {
                match xml_e {
                    XmlEvent::StartElement { name, attributes, namespace:_ } => {
                        println!("elem name: {}", name.local_name);
                        if name.local_name != ROOT_ELEM {
                            continue;
                        }
                        println!("found root elem");
                        for attr in attributes {
                            if attr.name.to_string() == ROOT_ATTR {
                                println!("found value: {}", attr.value);
                                return Ok(attr.value)
                            }
                        }
                    },
                    XmlEvent::EndDocument => break,
                    _ => continue,
                }
            },
            Err(e) => return Err(Box::new(e))
        }
    }
    Ok("todo".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![read_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
