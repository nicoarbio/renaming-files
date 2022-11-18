import fs from 'fs'
import SETTINGS from './config.js'

const TO_BE_CHANGED_FILES = fs.readdirSync(SETTINGS.FILES_FILEPATH)
const LABELS = fs.readFileSync(SETTINGS.INPUT_FILE, `utf8`).split(`\r\n`)

let idx_label = 0
let newLabels = []

for (idx_label = 0; idx_label < LABELS.length; idx_label++) {
    const ID = getFileIDFromModuleID(SETTINGS.MODULO, idx_label+1)
    newLabels[ID] = `${ID} ${LABELS[idx_label]}`
}

let idx_files = 0

//LOOPING THROUGH ALL FILES IN THE FOLDER
for (idx_files = 0; idx_files < TO_BE_CHANGED_FILES.length; idx_files++) {

    const actualFileName = TO_BE_CHANGED_FILES[idx_files]

    if(shouldFileBeRenamed(actualFileName)) {

        const extension = '.' +  getExtension(actualFileName)
        
        const FILE_ID = getFileIDFromFileName(actualFileName)
        
        const newFileName = newLabels[FILE_ID] + extension
        
        fs.renameSync(
            `${SETTINGS.FILES_FILEPATH}${actualFileName}`,
            `${SETTINGS.FILES_FILEPATH}${newFileName}`
        )

        //append log to file 
        const log_entry = `File changed: \"${actualFileName}\" --> \"${newFileName}\"`
        fs.writeFileSync(
            `${SETTINGS.LOG_FILEPATH}${SETTINGS.LOG_NAME}`,
            `${log_entry}\r\n`,
            {flag: `a`}
        )
        console.log(log_entry)
    }   
}

function shouldFileBeRenamed(fileName) {
    
    const nextChar = fileName.substring(SETTINGS.LENGTH_FILE_ID, SETTINGS.LENGTH_FILE_ID + 1)

    const allowed = (char) => char === nextChar
    return SETTINGS.CHAR_ALLOWED_NEXT_TO_ID.some(allowed)
}

function getExtension(fileName) {
    const extension = fileName.split(`.`)
    return extension[extension.length - 1]
}

function getFileIDFromFileName(fileName) {
    return fileName.substring(0, SETTINGS.LENGTH_FILE_ID)
}

function getFileIDFromModuleID(module, id) {
    if (module >= 0 && module <= 9) module = `0` + module
    if (id >= 0 && id <= 9) id = `0` + id
    return `M${module}C${id}`
}
