export default class Required {
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
        switch (typeof value) {
            case 'boolean':
                return value;

            case 'number':
                return true;

            case 'object':
                if (value === null)
                    return false;
                else if (Array.isArray(value))
                     return value.length > 0;
                else
                    return Object.keys(value).length > 0;

            case 'string':
                return value.trim().length > 0;

            default:
                return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    message() {
        return 'فیلد ورودی اجباری می باشد.'
    }
}
