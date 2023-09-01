#!/usr/bin/env node

import clipboardy from 'clipboardy';
import dumpProps from '../index.js';
clipboardy.writeSync(dumpProps.toString());