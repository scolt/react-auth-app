module.exports = {
    serverDomain: process.env.SERVER_URL || 'http://localhost:3000',

    oauth: {
        vk: {
            clientId: '6016511',
            secret: 'O1D6b4Zp0Zj8Zt2nRGOW'
        },
        github: {
            clientId: '5464fb6a9a0ec2212f9f',
            secret: 'ee807882a223b005adb62a9f8009065406522698'
        },
        linkedin: {
            clientId: '78l4m0myxo4bcc',
            secret: 'ZLlmCRhj1s3HQbRr'
        }
    },
    url_aliases: {
      'local': 'http://localhost:8080',
      'heroku': 'https://roauth.herokuapp.com'
    },
    mysql_cs: 'mysql://mfu2131yfgp93q9h:tb9ww3g91lz1vqi8@zwgaqwfn759tj79r.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/sv6ewyagqtm0gylv',
    jwt: {
        secret: 'M.y!S,e@c#r$e%t&C^u:s;t*o-m#S>t<r}i{n[g]?t(s~s.,.)'
    }
};