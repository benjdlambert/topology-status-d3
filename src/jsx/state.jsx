__state = __state || {};

const get = (key) => __state[key];
const set = (key, value) => __state[key] = value;

export { get, set }