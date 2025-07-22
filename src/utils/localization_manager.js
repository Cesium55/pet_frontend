class LocalizationManager {

    static eng_localization = {
        "menu_home": "Home",
        "menu_stats": "Statistics",
        "menu_learn": "Learn new words",
        "menu_repeat": "Repeat words",
        "menu_learn_repeat": "Learn & repeat",
        "menu_cats": "Manage categories",
        "profile_popup_title": "Profile",
        "stats_title": "Statistics",
        "stats_known": "Known words",
        "stats_learned": "Learned words",
        "stats_repeat": "Repeating words",
        "stats_problematic": "Problematic words",
        "learn_no_words": "No words to learn ",
        "learn_select": "Please select some new categories",
        "here": "here",
        "Here": "Here",
        "home_welcome": "Welcome to GEMBOWords",
        "home_wotd": "Word of the day",
        "word_categories": "Categories",
        "word_new_word": "New word",
        "word_repeat": "Repeating word",
        "word_know": "I know this word",
        "word_context": "Show word in context",
        "word_translate": "Show translation",
        "word_learn": "Start learning word",
        "repeat_now_words": "No words to repeat ",
        "repeat_next_time": "Time until next repeat",
        "minutes": "min",
        "repeat_learn_ref": "You can learn some words",
        "word_remember": "I remember",
        "word_no_remember": "I don't remember",
        "cats_custom": "Custom categories ",
        "cats_cats": "Categories",
        "cat_learn": "Learning word",
        "cat_known": "Word is already known",
        "cat_learned": "Word has been learned",
        "cat_new": "New word",
        "cat_problematic": "Learning word (problematic)",
        "logout": "Log out",
        "reg_title": "Sign up",
        "Email": "Email",
        "email": "email",
        "pswd": "password",
        "Pswd": "Password",
        "invalid_email": "You must enter valid email",
        "invalid_pass_length_min": "Minimal password length: ",
        "invalid_pass_length_max": "Maximum password length: ",
        "login_reg_ref": "Do not have an account yet? You can sign up ",
        "login_btn": "Log in",
        "login_title": "Sign in",
        "invalid_pass_equal": "Passwords are not equal",
        "reg_login_ref": "Do not have an account yet? You can sign up",
        "reg_pass2": "Password again ",
        "reg_btn": "Sign up",
        "profile_unauth": "You arew not authorized",
        "cats_no_custom": "No custom categories"

    }


    static ru_localization = {
        "menu_home": "Домашняя страница",
        "menu_stats": "Статистика",
        "menu_learn": "Учить новые слова",
        "menu_repeat": "Повторить слова",
        "menu_learn_repeat": "Учить и повторять",
        "menu_cats": "Настроить категории",
        "profile_popup_title": "Профиль",
        "stats_title": "Статистика",
        "stats_known": "Известные слова",
        "stats_learned": "Выученные слова",
        "stats_repeat": "Изучаемые слова",
        "stats_problematic": "Проблематичные слова",
        "learn_no_words": "Нет слов для изучения ",
        "learn_select": "Пожалуйста выберите новые категеории",
        "here": "здесь",
        "Here": "Здесь",
        "home_welcome": "Добро пожаловать на GEMBOWords",
        "home_wotd": "Слово дня",
        "word_categories": "Категории",
        "word_new_word": "Новое слово",
        "word_repeat": "Изучаемое слово",
        "word_know": "Я не знаю этого слова",
        "word_context": "Показать примеры",
        "word_translate": "Показать перевод",
        "word_learn": "Начать учить слово",
        "repeat_now_words": "Нет слов для повторения",
        "repeat_next_time": "Время до следующего повторения",
        "minutes": "мин",
        "repeat_learn_ref": "Вы можете выучить новые слова",
        "word_remember": "Я вспомнил",
        "word_no_remember": "Я не вспомнил",
        "cats_custom": "Собственные категории ",
        "cats_cats": "Категории",
        "cat_learn": "Изучаемое слово",
        "cat_known": "Слово уже известно",
        "cat_problematic": "Изучаемое слово (проблематичное)",
        "cat_learned": "Слово выучено",
        "cat_new": "Новое слово",
        "logout": "Выйти",
        "reg_title": "Зарегестрироваться",
        "Email": "Email",
        "email": "email",
        "pswd": "пароль",
        "Pswd": "Пароль",
        "invalid_email": "Вы должны ввести корректный email",
        "invalid_pass_length_min": "Минимальная длина пароля: ",
        "invalid_pass_length_max": "Максимальная длина пароля: ",
        "login_reg_ref": "Еще нет аккаунта? Вы можете зарегестрироваться",
        "login_btn": "Войти",
        "login_title": "Вход",
        "invalid_pass_equal": "Пароли не совпадают",
        "reg_login_ref": "Еще нет аккаунта? Вы можете зарегестрироваться",
        "reg_pass2": "Повторите пароль ",
        "reg_btn": "Зарегестрироваться",
        "profile_unauth": "Вы не авторизованы",
        "cats_no_custom": "Нет собственных категорий"
    }


    static get_lang() {
        const lang = localStorage.getItem("lang") || "eng"

        if (lang == "ru" || lang == "eng") return lang
        else return "eng"
    }

    static changle_lang(lang) {
        if (lang != undefined) {
            localStorage.setItem("lang", lang)
        }
        else {
            LocalizationManager.toggle_lang()
        }
    }

    static toggle_lang() {
        const lang = LocalizationManager.get_lang()

        if (lang == "eng") localStorage.setItem("lang", "ru")
        else localStorage.setItem("lang", "eng")


        window.location.reload()
    }

    static get_string(string_id) {
        const lang = LocalizationManager.get_lang()
        let localization_object
        if (lang == "eng") {
            localization_object = LocalizationManager.eng_localization


        }
        else if (lang == "ru") {
            localization_object = LocalizationManager.ru_localization
        }
        else {
            localization_object = LocalizationManager.eng_localization
        }

        const str = localization_object[string_id]
        if (str == undefined) return ""
        return str


    }



}


export { LocalizationManager }