import { scrypt, randomBytes, timingSafeEqual } from "crypto";

export default class PasswdHashUtils {
    private static _instance: PasswdHashUtils;

    // private readonly saltRounds: number;

    private constructor(/*saltRounds: number*/) {
        // this.saltRounds = saltRounds;
    }

    public hash(
        password: string,
        salt: string = randomBytes(16).toString("hex")
    ): Promise<string> {
        return new Promise(
            (resolve, reject) => {
                scrypt(
                    password,
                    salt,
                    64,
                    (err: Error | null, derivedKey: Buffer) => {
                        if (err) {
                            return reject(err);
                        }

                        // Store hash in your password DB.
                        return resolve(`${derivedKey.toString("hex")}.${salt}`);
                    },
                );
            },
        );
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        const [hashedPassword, salt] = hash.split(".");
        // we need to pass buffer values to timingSafeEqual
        const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
        // we hash the new sign-in password
        const suppliedPasswordBuf: Buffer
            = Buffer.from((await this.hash(password, salt)).split('.')[0], 'hex');

        // compare the new supplied password with the stored hashed password
        return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
    }

    public static getInstance(/*saltRounds: number*/): PasswdHashUtils {
        if (!PasswdHashUtils._instance) {
            PasswdHashUtils._instance = new PasswdHashUtils(/*saltRounds*/);
        }

        return PasswdHashUtils._instance;
    }
}
