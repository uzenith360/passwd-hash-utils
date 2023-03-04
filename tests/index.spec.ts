import 'mocha';
import { assert } from 'chai';

import PasswdHashUtils from '../src/index';

describe('Passwd hash Utils Class', () => {
    it('should have a getInstance init method', () => {
        assert.isFunction(PasswdHashUtils.getInstance);
    });

    it('should correctly compare a password and hash', async () => {
        const passwordHashUtil: PasswdHashUtils = PasswdHashUtils.getInstance();
        const password: string = '1234567890asdffg';
        const hash: string = (await passwordHashUtil.hash(password));

        assert.isTrue(await passwordHashUtil.compare(password, hash));
        assert.isFalse(await passwordHashUtil.compare('password', hash));
    });
});