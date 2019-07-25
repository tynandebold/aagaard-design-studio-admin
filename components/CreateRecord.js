import styled from "styled-components";
import { Input } from "./shared-styles";

const Form = styled.form`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 3rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const InputSubmit = styled(Input)`
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  outline: none;
  padding: 0.25rem 0.75rem;
  width: unset;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

class CreateRecord extends React.Component {
  state = {
    image: "",
    title: "",
    order: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createRecord(JSON.stringify(this.state));
    this.setState({
      image: "",
      title: "",
      order: ""
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputWrapper>
          <Label htmlFor="image">Image url</Label>
          <Input
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="order">Order</Label>
          <Input
            type="number"
            name="order"
            min="0"
            step="1"
            value={this.state.order}
            onChange={this.handleChange}
            required
          />
        </InputWrapper>
        <InputSubmit type="submit" value="Save" />
      </Form>
    );
  }
}

export default CreateRecord;
