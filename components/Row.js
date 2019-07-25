import styled from "styled-components";
import { Button, Input } from "./shared-styles";

const TableRow = styled.tr`
  border-top: 1px solid #999;
`;

const TableCell = styled.td`
  padding: 1rem 2rem 1rem 0;

  &:first-child {
    width: 150px;
  }
`;

const ButtonPrimary = styled(Button)`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const ButtonDelete = styled(Button)`
  border: 2px solid ${({ theme }) => theme.colors.delete};
  color: ${({ theme }) => theme.colors.delete};

  &:hover {
    background-color: ${({ theme }) => theme.colors.delete};
    color: ${({ theme }) => theme.colors.background};
  }
`;

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
      <TableRow>
        <TableCell>
          <img
            alt={title}
            onClick={this.toggleHidden}
            src={image}
            style={{ maxWidth: "150px" }}
          />
          <Input
            name="image"
            onChange={this.handleChange}
            style={{ display: this.state.hidden ? "none" : "block" }}
            type="text"
            value={image}
          />
        </TableCell>
        <TableCell>
          <Input
            name="title"
            onChange={this.handleChange}
            style={{ minWidth: "200px" }}
            type="text"
            value={title}
          />
        </TableCell>
        <TableCell style={{ width: "40px" }}>
          <Input
            min="0"
            onChange={this.handleChange}
            name="order"
            step="1"
            type="number"
            value={order}
            style={{ width: "40px" }}
          />
        </TableCell>
        <TableCell>
          <ButtonPrimary onClick={this.handleUpdate}>Update</ButtonPrimary>
        </TableCell>
        <TableCell>
          <ButtonDelete onClick={this.handleDelete}>Delete</ButtonDelete>
        </TableCell>
      </TableRow>
    );
  }
}

export default Row;
