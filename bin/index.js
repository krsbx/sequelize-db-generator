#!/usr/bin/env node

const fs = require('fs');
const process = require('process');
const { configPath } = require('./common');
const dbGenerator = require('../dist');

if (!configPath || !fs.existsSync(configPath)) return;

const env = process.env.NODE_ENV || 'development';
const config = require(configPath)[env];

dbGenerator(config);
