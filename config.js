const config = {
    server:{
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || 9000
    },
    sensors:{
        file: process.env.DATAFILE || './example/test.txt',
        wits0: {
            hta:      01,
            anem:     02,
            bpozo:    03,
            llave:    04,
            haparejo: 05
        }
    }
}

module.exports = config