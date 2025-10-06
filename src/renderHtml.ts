var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/renderHtml.ts
// Updated to accept the executed SQL string and the resulting HTML table string.
function renderHtml(sqlExecuted, tableContent) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>D1 TPC-H Join Results</title>
        <link rel="stylesheet" type="text/css" href="https://static.integrations.cloudflare.com/styles.css">
        <style>
            /* Custom styling for the generated data table */
            table {
                width: 90%;
                margin: 20px auto;
                border-collapse: collapse;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            th, td {
                padding: 12px 15px;
                text-align: left;
                border: 1px solid #ddd;
                font-size: 14px;
            }
            th {
                background-color: #0E838F;
                color: white;
                font-weight: bold;
            }
            tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            pre {
                white-space: pre-wrap;
                word-wrap: break-word;
                padding: 15px;
                background-color: #222;
                color: #00ff6a;
                border-radius: 8px;
                font-family: monospace;
                width: 90%;
                margin: 0 auto 20px;
            }
            code {
                color: #00ff6a;
            }
        </style>
      </head>
    
      <body>
        <header>
          <img
            src="https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/30e0d3f6-6076-40f8-7abb-8a7676f83c00/public"
          />
          <h1>\u{1F4C8} D1 Query Executor</h1>
        </header>
        <main>
          <p>SQL Query Executed:</p>
          <!-- Display the SQL query that was run -->
          <pre><code>${sqlExecuted}</code></pre>
          
          <!-- This is where the generated HTML table content will be injected -->
          ${tableContent}
          
          <small class="blue">
            <a target="_blank" href="https://developers.cloudflare.com/d1/tutorials/build-a-comments-api/">Build a comments API with Workers and D1</a>
          </small>
        </main>
      </body>
    </html>
`;
}
__name(renderHtml, "renderHtml");