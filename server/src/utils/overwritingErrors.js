const fs = require("fs")

export function overwritingErrors() {
    const dateSet = new Date();     // Время перезаписи файла
    const now = new Date();         // Настоящее
    dateSet.setHours(23)
    dateSet.setMinutes(0);
    dateSet.setSeconds(0)
    const leftTime = dateSet.getTime() - now.getTime()      // остаток милисикунд
    const readFileAsync = async (path) => {
        return new Promise((resolve, reject) => fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                return reject(err.message)
            }
            // trim - удаляет пробельные символы с начала и конца строки
            // split - строку в масив разделил по \n
            // получается log это обект с ошибкой внутри массива созданый с помощью map
            const logs = data.trim().split('\n').map(log => JSON.parse(log));
            resolve(logs)
        }))
    }
    const appendFileAsync = async (path, data) => {
        const logData = {
            message: data.message,
            code: data.code,
            time: data.time
        }
        return new Promise((resolve, reject) => fs.appendFile(path, JSON.stringify(logData) + '\n', (err) => {
            if (err) {
                reject(err.message)
            }
            resolve()
        }))
    }
    const truncateFileAsync = async (path) => {
        return new Promise((resolve, reject) => fs.truncate(path, 0, (err) => {
            if (err) {
                reject()
            }
            resolve()
        }))
    }
    setTimeout(() => {
        readFileAsync('error.log')
            .then(data => data.forEach(log => appendFileAsync(`error-${Date.now()}.log`, log)))
            .then(() => truncateFileAsync('error.log'))
            .catch(err => console.log(err))
        setTimeout(() => {
            overwritingErrors()
        }, 3600 * 1000)
    }, leftTime)
}