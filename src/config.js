const SETTINGS = {}

SETTINGS.MODULO = process.env.MODULE
SETTINGS.LENGTH_FILE_ID = `M00C00`.length
//SETTINGS.COMMON_PATH = `C:/lnk/JAVA/Java_Web_API/`
SETTINGS.COMMON_PATH = `D:/Google Drive/IT/Estudio/EducacionIT/Java Hibernate/`
SETTINGS.LOG_FILEPATH = `${SETTINGS.COMMON_PATH}rename/`
SETTINGS.INPUT_FILE = `${SETTINGS.LOG_FILEPATH}modulo${SETTINGS.MODULO}.txt`
SETTINGS.FILES_FILEPATH = `${SETTINGS.COMMON_PATH}${getModule(SETTINGS.MODULO)} Modulo/`
SETTINGS.LOG_NAME = `log_modulo_${getModule(SETTINGS.MODULO)}.txt`
SETTINGS.CHAR_ALLOWED_NEXT_TO_ID = [`.`, ` `]

export default SETTINGS

function getModule(module) {
    if (module >= 0 && module <= 9) module = `0` + module
    return `${module}`
}
