export const PackageJson = require('../../package.json');
export const AppJson = require('../../app.json').expo;

// Const variables
export const NodeEnv = process.env.NODE_ENV;
export const AppName = AppJson.name;
export const AppDescription = AppJson.description;


export const Version = PackageJson.version;
