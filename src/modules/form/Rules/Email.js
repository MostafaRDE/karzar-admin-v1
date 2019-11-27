import Regex from '../../../utils/regex.js'

export default class Email {
    /**
     * Determine if the validation rule passes.
     *
     * @param  value
     * @param  ruleValue
     * @return boolean
     */
    passes(value, ruleValue = null) {
        return Regex.EMAIL.test(value)
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    message() {
        // return i18n.t('messages.rules.email')
    }
}
