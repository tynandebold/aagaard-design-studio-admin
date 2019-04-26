export default ({ image, order, title}) => (
  <tr>
    <td><img src={image} alt={title} style={{maxWidth: '150px'}}/></td>
    <td>{title}</td>
    <td>{order}</td>
    <td><button>Delete</button></td>
    <style jsx>{`
      tr {
        border-top: 1px solid #999;
      }

      td {
        padding: 1rem 0;
      }
    `}</style>
  </tr>
);