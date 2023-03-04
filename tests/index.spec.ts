import 'mocha';
import { assert } from 'chai';

import PasswdHashUtils from '../src/index';

describe('Passwd hash Utils Class', () => {
    it('should have a getInstance init method', () => {
        assert.isFunction(PasswdHashUtils.getInstance);
    });

    it('should correctly compare a password and hash', () => {
        const passwordHashUtil: PasswdHashUtils = PasswdHashUtils.getInstance();
        const password: string = '1234567890asdffg';
        const [hash, salt] = passwordHashUtil.hash(password).split('.')

        assert.isTrue(passwordHashUtil.compare(password, hash));
        assert.isFalse(passwordHashUtil.compare('password', hash));
    });
});