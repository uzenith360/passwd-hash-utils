import * as bcrypt from "bcrypt";

export default class JwtUtils {
    private static _instance: JwtUtils;

    private readonly saltRounds: number;

    private constructor(saltRounds: number) {
        this.saltRounds = saltRounds;
    }

    public hash(password: string): Promise<string> {
        return new Promise(
            (resolve, reject) => {
                bcrypt.genSalt(this.saltRounds, (err, salt) => {
                    if (err) {
                        return reject(err);
                    }

                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            return reject(err);
                        }

                        // Store hash in your password DB.
                        return resolve(hash);
                    });
                });
            },
        );
    }

    public compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    public static getInstance(saltRounds: number): JwtUtils {
        if (!JwtUtils._instance) {
            JwtUtils._instance = new JwtUtils(saltRounds);
        }

        return JwtUtils._instance;
    }
}
