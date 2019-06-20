class Login extends React.Component {
  constructor(props) {
    super();

    this.state = {
      password: '',
      username: ''
    };
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  handleSubmit = e => {
    console.log('fire');

    e.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password
    };

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={e => this.handleChange(e, 'username')}
            value={this.state.username}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={e => this.handleChange(e, 'password')}
            value={this.state.password}
          />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

export default Login;
