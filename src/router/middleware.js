export function beforeEachCreator() {
    return function beforeEach(to, from, next) {
        return next();
    }
}
