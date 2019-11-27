export default class String {
    /**
     * Get all data for custom check
     *
     * @param data
     */
    constructor(data) {
        this.data = data;
        this.typeValue = null;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  value
     * @param  ruleValue
     * @return boolean
     */
    passes(value, ruleValue = null) {
        this.typeValue = ruleValue;

        if (typeof value === "string") {
            switch (ruleValue) {
                case 'digits':
                    return !isNaN(value);

                case 'nan':
                    return isNaN(value);

                case null:
                default:
                    return true;
            }
        }

        return false
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    message() {
        switch (this.typeValue) {
            case "digits":
                return "ورودی باید فقط رقم باشد."

            case "nan":
                return "ورودی باید متنی باشد."

            case null:
            default:
                return "ورودی باید متنی باشد."
        }
    }
}
