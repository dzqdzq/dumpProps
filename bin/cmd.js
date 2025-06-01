#!/usr/bin/env node

import clipboardy from 'clipboardy';
import {dumpProps, stringify} from '../index.js';
clipboardy.writeSync(stringify.toString() + "\n" + dumpProps.toString());