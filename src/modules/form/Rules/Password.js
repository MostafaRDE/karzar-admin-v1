import Regex from "../../../utils/regex.js"

export default class Password {
    /**
     * Get all data for custom check
     *
     * @param data
     */
    constructor(data) {
        this.data = data
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  value
     * @param  ruleValue
     * @return boolean
     */
    passes(value, ruleValue = null) {
        return Regex.PASSWORD.test(value)
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    message() {
        // return i18n.t('messages.rules.password')
    }
}
