import excel from "excel4node"

let wb = new excel.Workbook()

let sheets = {}

const addSheet = (sheetIndex, row) =>{
	if(!sheets[sheetIndex]){
		sheets[sheetIndex] = {}
	}
}

const addRow = (sheetIndex, rowIndex,row) =>{
	if(!sheets[sheetIndex][rowIndex]){
		sheets[sheetIndex][rowIndex] = {}
	}
}

const addZoneAndRowData = (sheetIndex, rowIndex, row) =>{
	if(!sheets[sheetIndex][rowIndex]["Start Weight"]){
		 sheets[sheetIndex][rowIndex]["Start Weight"] = row.start_weight
	}
	if(!sheets[sheetIndex][rowIndex]["End Weight"]){
		 sheets[sheetIndex][rowIndex]["End Weight"] = row.end_weight
	}
	if(!sheets[sheetIndex][rowIndex]["Zone " + row.zone]){
		sheets[sheetIndex][rowIndex]["Zone " + row.zone] = row.rate
	}

}

const buildExcel=(data)=>{

//pivot zones, populate rows with data
data.forEach(row=>{
	let sheetIndex = `${row.shipping_speed}${row.locale}`
	let rowIndex = `${row.start_weight}${row.end_weight}`

	addSheet(sheetIndex, row)
	addRow(sheetIndex, rowIndex,  row)
	addZoneAndRowData(sheetIndex, rowIndex, row)

})

Object.keys(sheets).forEach(sheet=>{

	let currentSheetName;
	switch(sheet){
		case 'expediteddomestic':
			currentSheetName = "Domestic Expedited Rates"
			break;
		case 'standarddomestic':
			currentSheetName = "Domestic Standard Rates"
			break;
		case 'nextDaydomestic':
			currentSheetName = "Domestic Next Day Rates"
			break;
		case 'intlEconomyinternational':
			currentSheetName = "International Economy Rates"
			break;
		case 'intlExpeditedinternational':
			currentSheetName = "International Expedited Rates"
			break;
	}
	let currentSheet = wb.addWorksheet(currentSheetName)

	//initial idea here was to populate each row with a completed array for less iteration, library doesn't like that. Something to come back to later oops.
	Object.keys(sheets[sheet]).forEach((row,rowIdx)=>{
		Object.keys(sheets[sheet][row]).forEach((cell, cellIdx) =>{
			
			//populate row titles
			if(rowIdx == 0){
				currentSheet.cell(rowIdx + 1, cellIdx + 1).string(cell)
			}

			//populate row values
			let cellValue = sheets[sheet][row][cell]
			currentSheet.cell(rowIdx +2,cellIdx +1).string(cellValue)

		})
	})
})

wb.write("results.xlsx")
}

export {buildExcel}