class Row extends React.Component {
  state = {
    hidden: true,
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

  toggleHidden = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  render() {
    const { image, order, title } = this.state;

    return (
      <tr>
        <td>
          <img
            alt={title}
            onClick={this.toggleHidden}
            src={image}
            style={{ maxWidth: '150px' }}
          />
          <input
            name="image"
            onChange={this.handleChange}
            style={{ display: this.state.hidden ? 'none' : 'block' }}
            type="text"
            value={image}
          />
        </td>
        <td>
          <input
            name="title"
            onChange={this.handleChange}
            style={{ minWidth: '200px' }}
            type="text"
            value={title}
          />
        </td>
        <td style={{ width: '40px' }}>
          <input
            min="0"
            onChange={this.handleChange}
            name="order"
            step="1"
            type="number"
            value={order}
            style={{ width: '40px' }}
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
            padding: 1rem 2rem 1rem 0;
          }

          td:first-child {
            width: 150px;
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
