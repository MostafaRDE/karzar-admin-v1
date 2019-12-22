export default class ConfirmPassword {
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
        return value === this.data['password']
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    message() {
        return 'تکرار گذرواژه با اصل گذرواژه برابر نمی باشد.'
    }
}
