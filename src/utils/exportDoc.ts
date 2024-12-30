/* eslint-disable prefer-const */
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export const exportToPdf = async (data: any[], format: "pdf", headers: string[], fileName:string) => {
  try {
    if (format === "pdf") {
      const doc = new jsPDF("l", "pt", "a4");
      const tableData = data.map((item, index) => {
        const { _id, ...rest } = item;
        const filteredObj = headers.reduce((acc: any, header) => {
          if (header in item) {
            if (Array.isArray(item[header])) {
              acc[header] = item[header].join(", ");
            } else {
              acc[header] = item[header];
            }
          }
          return acc;
        }, {});
        return [index + 1, ...Object.values(filteredObj)];
      });
      autoTable(doc, { html: "#my-table" });
      let y = 10;
      let marginCenter: any = 350;
      doc.setLineWidth(2);
      doc.text(fileName, marginCenter, (y = y + 30));
      const formattedHeaders = headers.map((header) => {
        return header
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      });
      (doc as any).autoTable({
        head: [formattedHeaders],
        body: tableData,
      });
      doc.save(`${fileName}.pdf`);
    }
  } catch (error) {
    console.log("error:", error);
  }
};


export const exportdataExcel = async (
  data: any[],
  format: "excel",
  title?: string,
  worksheetname?: string
) => {
  try {
    if (format === "excel") {
      // Prepare the data to be exported
      const dataToExport = data.map((item, index) => {
        const exportItem: any = {};
        exportItem["ID"] = index + 1;

        Object.keys(item).forEach((key) => {
          if (key !== "_id") {
            const humanReadableKey = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            let value = item[key] || "";
            if (Array.isArray(item[key]) && item[key].length > 0) {
              value = item[key].join(", ");
            }
            exportItem[humanReadableKey] = value;
          }
        });
        return exportItem;
      });
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        worksheetname || "Sheet1"
      );
      const exportTitle = title ? `${title}.xlsx` : "Export.xlsx";
      XLSX.writeFile(workbook, exportTitle);
    }
  } catch (error) {
    console.log("error:", error);
  }
};