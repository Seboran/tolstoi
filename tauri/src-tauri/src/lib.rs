use glob::glob;
use std::{env, path::Path, process::Command};

const PASSWORD_GLOB: &'static str = "**/*.gpg";
const HOME_ENV_KEY: &'static str = "HOME";

pub fn list_entries_folder(password_folder: &Path) -> Vec<String> {
    let home_folder = match env::var_os(HOME_ENV_KEY) {
        Some(val) => String::from(val.to_string_lossy()),
        None => panic!("Home env variable isn't defined. Find another way to get user folder."),
    };

    let home_folder = Path::new(&home_folder);

    let password_store_absolute_path = home_folder.join(password_folder);
    let glob_path_to_gpg_files = password_store_absolute_path.join(PASSWORD_GLOB);

    glob(&glob_path_to_gpg_files.to_string_lossy())
        .expect("Failed to read glob pattern")
        .into_iter()
        .flatten()
        .map(|p| {
            // Make relative to password-store folder
            p.strip_prefix(&password_store_absolute_path)
                .expect("global result should be relative to given password folder")
                // Remove extension
                .with_extension("")
                // Convert to string
                .to_string_lossy()
                .to_string()
        })
        .collect()
}

pub fn show_password_from_command(name: &str, pass_command: &str) -> Option<String> {
    let output = Command::new(pass_command)
        .arg(name)
        .output()
        .expect("pass command should work");

    if !output.status.success() {
        return None;
    }

    Some(String::from_utf8_lossy(&output.stdout).to_string())
}

#[cfg(test)]
mod tests {
    const PASSWORD_STORE_RESOURCES: &'static str = "resources/.password-store";
    use std::path::PathBuf;

    use super::*;

    #[test]
    fn recuperer_la_liste_des_entrees() {
        let mut test_folder_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
        test_folder_path.push(PASSWORD_STORE_RESOURCES);
        println!("{}", test_folder_path.display());
        let result = list_entries_folder(&test_folder_path);
        assert_eq!(
            result,
            vec![String::from("impots"), String::from("laredoute")]
        );
    }
}
