export default ({ children }) => (
  <>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Order</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
    <style jsx>{`
      table {
        border-collapse: collapse;
        width: 100%;
      }

      tr {
        border-top: 1px solid #999;
      }

      th {
        text-align: left;
      }

      th {
        padding: 1rem 0;
      }
    `}</style>
  </>
);
