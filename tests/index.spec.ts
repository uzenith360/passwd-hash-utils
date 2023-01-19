import 'mocha';
import { assert } from 'chai';

import passwdHashUtils from '../src/index';

describe('Passwd hash Utils Class', () => {
    it('should have a getInstance init method', () => {
        assert.isFunction(passwdHashUtils.getInstance);
    });
});