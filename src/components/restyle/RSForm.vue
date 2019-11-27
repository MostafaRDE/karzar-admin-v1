<template>
    <form @submit.prevent="initializeSubmit">

        {{ /* Load all data form here (The below slot) */ }}
        <slot/>

    </form>
</template>

<script>
    import RulesChecker from '../../modules/form/RuleChecker.js'

    export default {
        name: "RSForm",

        props: {
            // Set submit method
            submit: {
                default: null,
                type: Function,
                required: false,
            },
        },

        data: () => ({
            // Errors of validation
            errors: {},

            // Fields of form for validating
            fields: [],

            // Request-data has object of submitted data
            requestData: {},
        }),

        methods: {

            // Get form fields
            getFormFields() {
                // Select all fields that can be validate
                this.$children.find(child => {
                    // Checking name of field (Child of components)
                    switch (child.$options.name) {
                        // Supported components as field
                        case 'RSCheckBox':
                        case 'RSDropDown':
                        case 'RSDropDownPro':
                        case 'RSInputMaterial':
                        case 'RSRadioButton':
                            // If child has name
                            if (child.name !== '') {
                                // Add component as field that can be validate in "RSForm"
                                this.fields.push(child);
                                this.requestData[child.name] = child.model
                            }
                    }
                });
            },

            // Validating fields of form
            validating() {
                // Clear old errors
                this.errors = {};

                // Browsing all fields
                for (let i = 0; i < this.fields.length; i++) {
                    // Capacity of rules names
                    let rules = [];
                    // If the field of loop not null
                    if (this.fields[i].rules != null)
                        // Then split string rules by "|"-character
                        rules = this.fields[i].rules.split('|');
                    else
                        // Else go to next index of loop
                        continue;

                    // Checking Rules
                    RulesChecker.checkRuleOnData(rules, this.requestData, this.fields[i].name, this.errors, (errors) => this.errors = errors);
                }

                return Object.keys(this.errors).length === 0;
            },

            // First check validation, if validate run "submit"-prop function or return error-message from rules
            initializeSubmit() {
                // Call "getFormFields"-method
                this.getFormFields();

                // Check validating fields is OK:
                if (this.validating()) {
                    // Then if "submit"-function is not null:
                    if (this.submit != null)
                        // Then call "submit"-function
                        this.submit()
                }
                else {
                    this.$emit('errors', this.errors)
                }
            },

        },
    }
</script>
