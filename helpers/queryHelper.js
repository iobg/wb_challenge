import mysql from "mysql2/promise"

const initCon = async () => {
	//hardcoded auth for convenience, credentials would typically be stored in a keystore of some kind
	return await mysql.createConnection({
		host: "localhost",
		user: "whitebox",
		database: "whitebox",
		password: "password"
	})
}

const queryData = async (connection) => {
	//hardcoded query for convenience, typically would track all queries in config file
	//also exception handling?
	return await connection.query(
		`select start_weight,end_weight,zone, rate, shipping_speed, locale from rates 
		where client_id=1240;`)

}

export {
	initCon,
	queryData
}