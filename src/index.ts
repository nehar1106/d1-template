import { renderHtml } from "./renderHtml";

var index_default = {
  async fetch(request, env) {
    // Default TPC-H query if no URL parameter is provided
    const defaultQuery = `
      SELECT
          C.C_CUSTKEY,
          C.C_NAME,
          C.C_PHONE,
          C.C_ACCTBAL,
          N.N_NAME AS Nation_Name,
          N.N_COMMENT AS Nation_Comment
      FROM
          CUSTOMER AS C
      INNER JOIN
          NATION AS N ON C.C_NATIONKEY = N.N_NATIONKEY
      LIMIT 10;
    `;

    // 1. Get SQL query from URL parameter 'query' or use default
    const url = new URL(request.url);
    const paramQuery = url.searchParams.get('query');
    
    // Use the parameter query if provided and non-empty, otherwise use the default
    const sqlQuery = (paramQuery && paramQuery.trim()) || defaultQuery;

    let results = [];
    let htmlTable = '';

    try {
        // Execute the query
        const stmt = env.DB.prepare(sqlQuery);
        const queryResult = await stmt.all();
        results = queryResult.results;

        // 2. Process results into an HTML table string (rows and columns)
        if (!results || results.length === 0) {
            htmlTable = '<p>Query executed successfully, but no data was returned.</p>';
        } else {
            // Get column names (headers) from the first result object
            const columns = Object.keys(results[0]);
            
            // Start table and create header row (<th>)
            htmlTable += '<table>';
            htmlTable += '<thead><tr>';
            columns.forEach(col => {
                // Format column names for display (e.g., C_CUSTKEY -> C CUSTKEY)
                htmlTable += `<th>${col.replace(/_/g, ' ')}</th>`;
            });
            htmlTable += '</tr></thead>';

            // Create body rows (<tr>) and data cells (<td>)
            htmlTable += '<tbody>';
            results.forEach(row => {
                htmlTable += '<tr>';
                columns.forEach(col => {
                    const displayValue = row[col];
                    // Display the value directly
                    htmlTable += `<td>${displayValue}</td>`;
                });
                htmlTable += '</tr>';
            });
            htmlTable += '</tbody></table>';
        }
    } catch (e) {
        // Handle SQL execution errors
        htmlTable = `<p style="color: red;"><strong>Database Error:</strong> ${e.message}</p>`;
    }


    // 3. Return the response, passing the SQL and the HTML table to the render function
    return new Response(renderHtml(sqlQuery, htmlTable), {
      headers: {
        "content-type": "text/html"
      }
    });
  }
};
export {
  index_default as default
};