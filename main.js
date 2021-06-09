import {initCon, queryData} from "./helpers/queryHelper.js"
import {buildExcel} from "./helpers/excelHelper.js"


const connection = await initCon();
const data = await queryData(connection);

buildExcel(data[0])