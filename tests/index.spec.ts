import 'mocha';
import { assert } from 'chai';

import JwtUtils from '../src/index';

describe('JwtUtils Class', () => {
    it('should have a getInstance init method', () => {
        assert.isFunction(JwtUtils.getInstance);
    });
});