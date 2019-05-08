class AddRecord extends React.Component {
  state = {
    image: '',
    title: '',
    order: ''
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addRecord(JSON.stringify(this.state));
    this.setState({
      image: '',
      title: '',
      order: 0
    });
  };

  render() {
    return (
      <form className="new-record" onSubmit={this.handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="image">Image url</label>
          <input
            type="text"
            name="image"
            id="image"
            value={this.state.image}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="order">Order</label>
          <input
            type="number"
            name="order"
            id="order"
            min="0"
            step="1"
            value={this.state.order}
            onChange={this.handleInputChange}
          />
        </div>
        <input type="submit" value="Save" />
        <style jsx>
          {`
            .new-record {
              align-items: center;
              display: flex;
              justify-content: space-between;
            }

            .input-wrapper {
              display: flex;
              flex-direction: column;
            }

            .input-wrapper label {
              font-size: 0.75rem;
              font-weight: 600;
              letter-spacing: 0.5px;
            }
          `}
        </style>
      </form>
    );
  }
}

export default AddRecord;
