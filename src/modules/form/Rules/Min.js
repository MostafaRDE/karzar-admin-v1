export default class Min {
    /**
     * Get all data for custom check
     *
     * @param data
     */
    constructor(data) {
        this.data = data;
        this.length = 0;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  value
     * @param  ruleValue
     * @return boolean
     */
    passes(value, ruleValue = null) {
        if (ruleValue === null)
            ruleValue = 0;

        this.valueType = typeof value;
        this.length = ruleValue;

        switch (typeof value) {
            case "number":
            case "bigint":
                return value >= ruleValue;

            case "string":
                return value.length >= ruleValue;

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
        switch (this.valueType) {
            case "number":
            case "bigint":
                return `عدد ورودی باید بزرگتر مساوی با ${this.length} باشد.`;

            case "string":
                return `حداقل تعداد حروف باید ${this.length} حرف باشد.`;

            default:
                return `حداقل ورودی باید ${this.length} باشد.`;
        }
    }
}
