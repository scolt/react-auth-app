import en from '../../../../lang/en';
import ru from '../../../../lang/ru';

class LanguageService {
    constructor(defaultLanguage, languages) {
        this.defaultLanguage = defaultLanguage;
        this.currentLanguage = this.getCurrentLanguage();
        this.languages = languages;
    }

    setLanguage(lang) {
        window.localStorage.setItem('preferred_lang', lang);
        this.currentLanguage = lang;

        return (dispatch) => {
            dispatch({
                type: 'changeLanguage',
                value: lang
            });
        };
    }

    getCurrentLanguage() {
        return window.localStorage.getItem('preferred_lang') || this.defaultLanguage;
    }

    translate(key) {
        return key.split('.').reduce(function (prev, curr) {
            return prev ? prev[curr] : undefined;
        }, this.languages[this.currentLanguage]);
    }
}

export default new LanguageService('en', {
    en, ru
});
