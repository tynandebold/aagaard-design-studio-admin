class Row extends React.Component {
  state = {
    id: this.props._id,
    image: this.props.image,
    order: this.props.order,
    title: this.props.title
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdate = () => {
    this.props.updateRecord(this.state);
  };

  handleDelete = () => {
    this.props.deleteRecord(this.state.id);
  };

  render() {
    const { image, order, title } = this.state;

    return (
      <tr>
        <td>
          <img src={image} alt={title} style={{ maxWidth: '150px' }} />
        </td>
        <td>
          <input
            name="title"
            onChange={this.handleChange}
            type="text"
            value={title}
          />
        </td>
        <td>
          <input
            min="0"
            onChange={this.handleChange}
            name="order"
            step="1"
            type="number"
            type="text"
            value={order}
          />
        </td>
        <td>
          <button className="btn btn--primary" onClick={this.handleUpdate}>
            Update
          </button>
        </td>
        <td>
          <button className="btn btn--delete" onClick={this.handleDelete}>
            Delete
          </button>
        </td>
        <style jsx>{`
          tr {
            border-top: 1px solid #999;
          }

          td {
            padding: 1rem 0;
          }

          .btn--delete {
            border: 2px solid indianred;
            color: indianred;
          }

          .btn--delete:hover {
            background-color: indianred;
            color: #f7f7f7;
          }
        `}</style>
      </tr>
    );
  }
}

export default Row;
