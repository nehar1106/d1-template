import { renderHtml } from "./renderHtml";

var index_default = {
  async fetch(request, env) {
    // 1. SQL Query: Join CUSTOMER and NATION
    const sqlQuery = `
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

    // Execute the query
    const stmt = env.DB.prepare(sqlQuery);
    const { results } = await stmt.all();

    // 2. Process results into an HTML table string (rows and columns)
    let htmlTable = '';

    if (!results || results.length === 0) {
        htmlTable = '<p>No data returned from the database query.</p>';
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

    // 3. Return the response, passing the HTML table to the render function
    return new Response(renderHtml(htmlTable), {
      headers: {
        "content-type": "text/html"
      }
    });
  }
};
export {
  index_default as default
};
/*
export default {
  async fetch(request, env) {
    const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
    const { results } = await stmt.all();

    return new Response(renderHtml(JSON.stringify(results, null, 2)), {
      headers: {
        "content-type": "text/html",
      },
    });
  },
} satisfies ExportedHandler<Env>;
*/
