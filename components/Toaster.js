class Toaster extends React.Component {
  state = {
    classNames: '',
    message: ''
  };

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.setToasterInfo(this.props.type);
    }
  }

  setToasterInfo(type) {
    switch (type) {
      case 'update-success':
        this.setState({
          message: 'Project updated successfully!',
          classNames: 'success visible'
        });
        break;
      case 'update-fail':
        this.setState({
          message: "The project couldn't be updated.",
          classNames: 'failure visible'
        });
      case 'delete-success':
        this.setState({
          message: 'Project deleted successfully!',
          classNames: 'success visible'
        });
        break;
      case 'delete-fail':
        this.setState({
          message: "The project couldn't be deleted.",
          classNames: 'failure visible'
        });
      case 'create-success':
        this.setState({
          message: 'Project created successfully!',
          classNames: 'success visible'
        });
        break;
      case 'create-fail':
        this.setState({
          message: "The project couldn't be created.",
          classNames: 'failure visible'
        });
      default:
        break;
    }

    setTimeout(() => {
      this.setState({ classNames: '', message: '' });
    }, 5500);
  }

  render() {
    return (
      <div className={`toaster-wrapper ${this.state.classNames}`}>
        {this.state.message}
        <style jsx>{`
          .toaster-wrapper {
            border-radius: 0.25rem;
            bottom: 2rem;
            padding: 1rem;
            position: fixed;
            right: 2rem;
          }

          .success {
            background-color: springgreen;
          }

          .failure {
            background-color: orangered;
          }

          .visible {
            animation: fade 0.5s 1;
            animation-delay: 5s;
            animation-fill-mode: forwards;
          }

          @keyframes fade {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Toaster;
