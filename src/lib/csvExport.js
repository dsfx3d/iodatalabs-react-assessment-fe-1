/**
 * CSV Export Utility
 * 
 * This utility provides functions to convert data to CSV format and trigger
 * file downloads in the browser. It's designed to work with the reports data
 * structure and handle proper CSV formatting with headers.
 */
// const fileName = `downloaded Report ${moment(new Date()).format('DD MMM YY')}.csv`;

/**
 * Converts an array of objects to CSV format
 * 
 * @param {Array} data - Array of objects to convert to CSV
 * @param {Array} headers - Array of column headers (optional)
 * @returns {string} - CSV formatted string
 */
export const convertToCSV = (data, headers = null) => {
  // TODO: Implement CSV conversion logic
  // 1. Extract headers from the first object if not provided
  // 2. Create CSV header row
  // 3. Convert each data row to CSV format
  // 4. Handle special characters and commas in data
  // 5. Return the complete CSV string

  console.log('convertToCSV: Converting data to CSV format', { data, headers });

  // Placeholder implementation - replace with actual CSV conversion
  if (!headers && (!data || data.length === 0)) {
    return '';
  }

  // Extract headers from first object if not provided
  const _csvHeaders = headers || Object.keys(data[0]);

  // TODO: Implement proper CSV formatting
  // - Escape commas, quotes, and newlines in data
  // - Handle null/undefined values
  // - Format dates appropriately
  const rows = [];

  // Header row
  rows.push(_csvHeaders.join(","));

  // Data rows
  for (const item of data) {
    const row = _csvHeaders.map(header => {
      const val = item[header];
      const needEscape = /[",\n]/.test(val);
      const escapeval = String(val).replace(/"/g, '""')
      return `${(val === undefined && val === null) ? '' : needEscape ? `"${escapeval}"` : escapeval}`;
    }).join(',');
    rows.push(row);
  }

  return rows.join('\n');

  // return 'TODO: Implement CSV conversion';
};

/**
 * Triggers a file download in the browser
 * 
 * @param {string} content - The file content to download
 * @param {string} filename - The filename for the download
 * @param {string} mimeType - The MIME type of the file (default: 'text/csv')
 */
export const downloadFile = (content, filename, mimeType = 'text/csv') => {
  // TODO: Implement file download logic
  // 1. Create a Blob with the content
  // 2. Create a temporary URL for the blob
  // 3. Create a temporary anchor element
  // 4. Trigger the download
  // 5. Clean up the temporary URL

  console.log('downloadFile: Triggering download', { filename, mimeType });

  // Placeholder implementation - replace with actual download logic
  // Hint: Use URL.createObjectURL, document.createElement('a'), and click()

  try {
    // TODO: Create blob, temporary URL, and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    console.log('File download would start here');

  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Failed to download file');
  }
};

/**
 * Exports data as CSV file with proper filename
 * 
 * @param {Array} data - Array of objects to export
 * @param {string} baseFilename - Base filename (without extension)
 * @param {Array} headers - Optional custom headers
 */
export const exportAsCSV = (data, baseFilename = 'reports', headers = null) => {
  // TODO: Implement complete CSV export functionality
  // 1. Convert data to CSV format
  // 2. Generate filename with current date
  // 3. Trigger file download
  // 4. Handle errors gracefully

  if (!Array.isArray(data) || data.length === 0) {
    alert('No data to export.');
    return;
  }
  console.log('exportAsCSV: Starting CSV export', { baseFilename, dataLength: data?.length });

  try {
    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const filename = `${baseFilename}-${date}.csv`;


    // const formatData = formatReportsForCSV(data)

    // TODO: Convert data to CSV and trigger download
    const csvContent = convertToCSV(data, headers);

    if (!csvContent) {
      throw new Error('No data to export');
    }

    downloadFile(csvContent, filename);

    console.log(`CSV export complete: ${filename}`);
    return { success: true, filename };

  } catch (error) {
    console.error('CSV export failed:', error);
    throw new Error(`CSV export failed: ${error.message}`);
  }
};

/**
 * Formats report data for CSV export
 * Maps internal data structure to user-friendly column names
 * 
 * @param {Array} reports - Array of report objects
 * @returns {Array} - Formatted data ready for CSV export
 */
export const formatReportsForCSV = (reports) => {
  // TODO: Implement data formatting for reports
  // 1. Map internal field names to user-friendly column names
  // 2. Format dates appropriately
  // 3. Handle nested objects if any
  // 4. Ensure consistent data types

  console.log('formatReportsForCSV: Formatting reports data', { count: reports?.length });

  if (!reports || reports.length === 0) {
    return [];
  }

  // TODO: Map and format the data appropriately
  // Example mapping:
  // - id -> ID
  // - title -> Title  
  // - status -> Status
  // - department -> Department
  // - priority -> Priority
  // - createdAt -> Created Date
  // - updatedAt -> Updated Date

  return reports.map(report => ({
    // // TODO: Implement proper field mapping
    // ...report,
    ID: report.id,
    Title: report.title,
    Status: report.status,
    Department: report.department,
    Priority: report.priority,
    'Created Date': new Date(report.createdAt).toISOString().split('T')[0],
    'Updated Date': new Date(report.updatedAt).toISOString().split('T')[0],
  }));
};

/**
 * Custom headers for reports CSV export
 * Defines the column order and names for the CSV file
 */
export const REPORTS_CSV_HEADERS = [
  'ID',
  'Title',
  'Status',
  'Department',
  'Priority',
  'Created Date',
  'Updated Date'
];

export default {
  convertToCSV,
  downloadFile,
  exportAsCSV,
  formatReportsForCSV,
  REPORTS_CSV_HEADERS
};
