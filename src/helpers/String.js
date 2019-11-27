String.prototype.truncMiddle = function(length) {
    return `${this.substring(0, length)}...${this.substring(this.length - length, this.length)}`;
};
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
