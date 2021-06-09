import mysql from "mysql2/promise"

const initCon = () =>{
	//hardcoded auth for convenience, credentials would typically be stored in a keystore of some kind
	const connection = mysql.createConnection({
		host: "localhost",
		user: "whitebox",
		database: "whitebox",
		password: "password"
	})
	return connection;
}


const queryData = async (connection) =>{
	//hardcoded query for convenience, typically would track all queries in config file
	return await connection.query(
		`select start_weight,end_weight,zone, rate, shipping_speed, locale from rates 
		where client_id=1240
		group by start_weight, end_weight, zone, shipping_speed, locale;`)
}

export {initCon, queryData}