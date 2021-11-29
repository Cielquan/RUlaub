use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub fn get_menu() -> Menu {
    trace!(target = "tauri_setup", "Build window menu.");
    let en_lang_item = CustomMenuItem::new("en_lang", "English");
    let de_lang_item = CustomMenuItem::new("de_lang", "Deutsch");
    let dark_theme_item = CustomMenuItem::new("dark_theme", "Dark Theme");
    let light_theme_item = CustomMenuItem::new("light_theme", "Light Theme");
    let settings_item = CustomMenuItem::new("settings", "Settings");
    let about_item = CustomMenuItem::new("about", "About");
    let new_db_item = CustomMenuItem::new("new_db", "New Database");
    let select_db_item = CustomMenuItem::new("select_db", "Select Database");
    #[allow(unused_mut)]
    let mut new_vac_item =
        CustomMenuItem::new("new_vac", "New Vacation").accelerator("CmdOrControl+N");
    let edit_vac_item = CustomMenuItem::new("edit_vacs", "Edit Vacations");
    let users_item = CustomMenuItem::new("users", "Users");
    let pub_holidays_item = CustomMenuItem::new("pub_holidays", "Public Holidays");
    let school_holidays_item = CustomMenuItem::new("school_holidays", "School Holidays");
    let vac_types_item = CustomMenuItem::new("vac_types", "Vacation Types");

    let language_menu = Menu::new().add_item(en_lang_item).add_item(de_lang_item);
    let theme_menu = Menu::new()
        .add_item(dark_theme_item)
        .add_item(light_theme_item);
    let file_menu = Menu::new()
        .add_item(settings_item)
        .add_submenu(Submenu::new("Language", language_menu))
        .add_submenu(Submenu::new("Theme", theme_menu))
        .add_native_item(MenuItem::Separator)
        .add_item(about_item);
    let database_menu = Menu::new().add_item(new_db_item).add_item(select_db_item);
    let vacations_menu = Menu::new().add_item(new_vac_item).add_item(edit_vac_item);

    Menu::new()
        .add_submenu(Submenu::new("File", file_menu))
        .add_submenu(Submenu::new("Database", database_menu))
        .add_item(users_item)
        .add_item(pub_holidays_item)
        .add_item(school_holidays_item)
        .add_item(vac_types_item)
        .add_submenu(Submenu::new("Vacations", vacations_menu))
}
