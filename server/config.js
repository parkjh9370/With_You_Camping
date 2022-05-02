const dotenv = require('dotenv')
dotenv.config();


function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    // null, undefined 일 때 true
    if (value == null) {
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}
 
module.exports = {
        jwt: {
            accessSecretKey: required('ACCESS_SECRET'),
            refreshSecretKey: required('REFRESH_SECRET'),
            expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 21600)), // 6시간
            expiresInSecRefresh: parseInt(required('JWT_EXPIRES_SEC', 172800)), // 2일
        },
        bcrypt: {
            saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
        },
        host: {
            port: parseInt(required('HOST_PORT', 8080)),
        },
        db: {
            host: parseInt(required('DB_HOST')),
            port: parseInt(required('DB_PORT')),
            username: required('DB_USER'),
            database: required('DB_DATABASE'),
            password: required('DB_PASSWORD'),
        },
        AWS: {
            accessId: required('AWS_ACCESSKEY_ID'),
            secretKey: required('AWS_SECRET_ACCESSKEY'),
            region: required('AWS_REGION')
        },
        kakao: {
            clientID: required('KAKAO_CLIENT_ID'),
            redirectURI: required('KAKAO_REDIRECT_URI')
        },
        google: {
            clientId: required('GOOGLE_CLIENTID'),
            password:   required('GOOGLE_PASSWORD'),
            redirectURI: required('GOOGLE_REDIRECT_URI')
        },
        naver: {
            clientId: required('NAVER_CLIENT_ID'),
            clientSecret: required('NAVER_CLIENT_SECRET'),
        }
    }
