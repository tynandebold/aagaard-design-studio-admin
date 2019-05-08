class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete = id => {
    this.props.deleteRecord(id);
  };

  render() {
    const { _id, image, order, title } = this.props;

    return (
      <tr>
        <td>
          <img src={image} alt={title} style={{ maxWidth: '150px' }} />
        </td>
        <td>{title}</td>
        <td>{order}</td>
        <td>
          <button onClick={() => this.handleDelete(_id)}>Delete</button>
        </td>
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
  }
}

export default Row;
