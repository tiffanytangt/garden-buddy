const bcrypt = require('bcrypt');
const saltRounds = 10

export const saltAndHash = async (password: string) => {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(password)
    return bcrypt.hash(password, salt);
}

export const verify = async (password: string, hashedPassword: string) => {
    const result = await bcrypt.compare(password, hashedPassword);

    if (!result) throw new Error(`Incorrect password`);
}
