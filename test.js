const fs = require('fs-extra')

async function Test () {
    let data = await fs.readFile('./public/test.jpg')
    console.log(data)
}

Test()
