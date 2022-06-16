import fs from 'fs';

const SETTINGS = {}
SETTINGS.FILES_FILEPATH = "./in/01 Modulo"
SETTINGS.INPUT_FILE = "C:/Users/nicol/Desktop/LINUX_EDIT/modulo1.txt"
SETTINGS.MODULO = "1"
SETTINGS.LENGTH_FILE_ID = "M00C00".length
SETTINGS.CHAR_ALLOWED_NEXT_TO_ID = [".", " "]

const TO_BE_CHANGED_FILES = fs.readdirSync(SETTINGS.FILES_FILEPATH)
const LABELS = fs.readFileSync(SETTINGS.INPUT_FILE, "utf8").split("\r\n")

let idx_label = 0
let newLabels = []

for (idx_label = 0; idx_label < LABELS.length; idx_label++) {
    const ID = getFileIDFromModuleID(SETTINGS.MODULO, idx_label+1)
    newLabels[ID] = ID  + " " + LABELS[idx_label]
}

let idx_files = 0

//LOOPING THROUGH ALL FILES IN THE FOLDER
for (idx_files = 0; idx_files < TO_BE_CHANGED_FILES.length; idx_files++) {
    
    if(shouldFileBeRenamed(TO_BE_CHANGED_FILES[idx_files])) {
        const extension = getExtension(TO_BE_CHANGED_FILES[idx_files])
        
        const FILE_ID = getFileIDFromFileName(TO_BE_CHANGED_FILES[idx_files])
        
        const newFileName = newLabels[FILE_ID] + extension
        
        fs.renameSync(SETTINGS.FILES_FILEPATH+"/"+TO_BE_CHANGED_FILES[idx_files], SETTINGS.FILES_FILEPATH+"/"+newFileName)
        console.log("File changed: \""+TO_BE_CHANGED_FILES[idx_files] + "\" --> \"" + newFileName + "\"")        
    }   
}

function shouldFileBeRenamed(fileName) {
    
    const nextChar = fileName.substring(SETTINGS.LENGTH_FILE_ID, SETTINGS.LENGTH_FILE_ID + 1)

    const allowed = (char) => char === nextChar
    return SETTINGS.CHAR_ALLOWED_NEXT_TO_ID.some(allowed)
}

function getExtension(fileName) {
    return fileName.substring(fileName.length - 4,fileName.length)
}

function getFileIDFromFileName(fileName) {
    return fileName.substring(0, SETTINGS.LENGTH_FILE_ID)
}

function getFileIDFromModuleID(module, id) {
    if (module >= 0 && module <= 9) {
        module = "0" + module;
    }
    if (id >= 0 && id <= 9) {
        id = "0" + id;
    }
    
    return `M${module}C${id}`
}
