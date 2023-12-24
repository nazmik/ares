const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_REt8D5TCBHfyEvxoSA4",
    host: "ares-ares.a.aivencloud.com",
    port: 21825,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUIkPxFlp3cva8KY7JcrX2B3ykTkEwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZTc3ZWJlZTEtNzRhMC00MzVhLThmMTItOTJkMTg5NTAy
NWE3IFByb2plY3QgQ0EwHhcNMjMxMjI0MTI1MzAxWhcNMzMxMjIxMTI1MzAxWjA6
MTgwNgYDVQQDDC9lNzdlYmVlMS03NGEwLTQzNWEtOGYxMi05MmQxODk1MDI1YTcg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAMOf89pA
Jtn0FyXCDfDIfB9tt0DeUco54QCrmK5IO7WmnyoXMSg5nBKHsrebl7bZtjS8hei/
wcX/f/15YEVUTBUSTjrPx2J5FdihFDIamQ9mmllAMVQkAm4s72mZ3l8tzSf99JKn
M6RLfl830iosUoNr6MsXIAuv3d/cs/qphzUbs4FsOeBpfUW7Hq/1l2Ig4E9gmnqX
3VCX61y9sr4ShlM1kCIIu/7nkptOXz3MCZQ4esu8bG+d4IcSiPZGB5qYWeZf9zTi
II2aZxxcXV/5FneD8y+xDCfz9Hk6k+zzIgZIuOcpG/FxiG9v4IkgggKvSi8T7msv
PCAVxOQR4+dzl+IwVqtCvWqaRoFA8DkNjHTG9P/fSD5yhFMWOBbWavFT49k4BSms
xZg/LDRkD/QC5igb8OoLtxtQb1QWOlm9nDwjYd/QilFnLdOh0uZEeqVrKrtNfBtk
gzvVyEVPIzuC+o9PAXL8F22Xx02ZlWfiOIvEPRcbAwt5dvXOCXd22A8IgQIDAQAB
oz8wPTAdBgNVHQ4EFgQUn2oVhtYC8RR7jWkgfxJvW01w7gMwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBACNmBCevgGae+W9c
jSsX/lqwDACb7eR3tmXl2DbbK4GSxcpFNgURGXWP9QYGM4Tl2U8Tm1n6lT2HBbbU
Dwi++pByIptW89thMUWIX6EohMov5PJNwUn3cncmCtNunIcE3XBfc93+rLjv5RyC
81dLLWxTj8cWrDKt0FHKwxS6Tt8ocBZEE8vQS0GACwaKSKqhVjhHzo9cI0FYdzsZ
o0p5qfy1h2KKB9Mv6W5Z/Pa/ZdiVU+uI3Shm11//tb0WpYZ2Ar8DO3aq6cFbqDet
wZxd+gR4rC8MSsK3BldDwTdG8vjcJIYpP5wQJxV1ZGtV98Jd6Nx/+Mka6ny34vgO
5IqrHaH6S1i+z8URC1+LTlSNezmR6tfQO1MzHNQSMiW5Ph/7G5CWgR3Oe6RQjNwJ
FwwZXiF0pIbf8mhcKzDG1nLz2iMOkns4koDMC6M3odiJMT0BVf3KsH/W8sBSKri1
ptJZQOp6frKFu284zMMoSlWkBJYcNkQW2WEbEkHT8qYSZYBvIw==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});