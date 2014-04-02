exports.create  = create;
exports.find    = find;
exports.def     = def;
exports.get     = get;
exports.set     = set;

var hop = Object.prototype.hasOwnProperty,
    gpo = Object.getPrototypeOf;

function create(parent) {
    return Object.create(parent || null);
}

function find(env, key) {
    while (env) {
        if (hop.call(env, key)) {
            return env;
        } else {
            env = gpo(env);
        }
    }
    throw new Error("unknown environment key: " + key);
}

function def(env, key, value) {
    if (hop.call(env, key)) {
        throw new Error("cannot redefine key: " + key);
    }
    env[key] = value;
}

function get(env, key) {
    return find(env, key)[key];
}

function set(env, key, value) {
    find(env, key)[key] = value;
}