import RulesTable from '../../modules/form/rules-table.js'

export default class RuleChecker {
    static checkRuleOnData(rules, data, fieldName, errors, callback) {
        this.data = data;
        this.errors = errors;

        // Browsing rules names capacity
        for (let i = 0; i < rules.length; i++) {
            this.isValid = false;
            let ruleDetails = rules[i].split(':');
            this.ruleKey = ruleDetails[0];
            this.ruleValue = ruleDetails.length > 1 ? ruleDetails[1] : null;

            this.ruleChecker(fieldName);
        }

        // Post errors to caller of the function
        callback(this.errors)
    }

    // If errors has not key with the field name
    static checkHasError(fieldName) {
        if (!this.errors.hasOwnProperty(fieldName)) {
            // Then create a sub empty array with field name in errors
            this.errors[fieldName] = []
        }
    }

    // <editor-fold desc="Rule Checker">
    static ruleChecker(fieldName) {
        let ruleKey = '';
        this.ruleKey.split('_').forEach(word => ruleKey += word.capitalizeFirstLetter());

        // Create ConfirmPassword instance object with "data"
        const rule = new RulesTable[ruleKey](this.data);
        // Pass data to "passes"-method rule instance object for check is validate or not
        this.isValid = rule.passes(this.data[fieldName], this.ruleValue);
        // If is not validate
        if (!this.isValid) {
            // If errors has not key with the field name
            // Then create a sub empty array with field name in errors
            this.checkHasError(fieldName);
            // Add error message to errors of Field's sub array
            this.errors[fieldName].push(rule.message());
        }
    }
    // </editor-fold>
}
