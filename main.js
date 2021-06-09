import {initCon, queryData} from "./helpers/queryHelper.js"

const connection = await initCon();
const data = await queryData(connection);

console.log(data)