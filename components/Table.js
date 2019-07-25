import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableRow = styled.tr`
  border-top: 1px solid #999;
`;

const TH = styled.th`
  padding: 1rem 0;
  text-align: left;
`;

export default ({ children }) => (
  <>
    <Table>
      <thead>
        <TableRow>
          <TH>Image</TH>
          <TH>Title</TH>
          <TH>Order</TH>
          <TH>Update</TH>
          <TH>Delete</TH>
        </TableRow>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  </>
);
