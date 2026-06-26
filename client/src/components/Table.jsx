// Created a one reusable table component that can be used for both accounts and journal entries for now, I will come back to this later and make it more reusable for other financial statements like balance sheet and income statement. I will also add pagination and sorting later on. For now, I will just display the data in a table format.

function Table({ columns, data }) {
  if (!data || data.length === 0) {
    return <p className="empty-state">No records found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;