import fetch from 'isomorphic-fetch';
import Layout from '../components/layout';
import Row from '../components/Row';
import Table from '../components/Table';
import Toaster from '../components/Toaster';
import CreateRecord from '../components/CreateRecord';

class Home extends React.Component {
  state = {
    projects: this.props.data.projects,
    toasterType: '',
    user: this.props.user
  };

  static async getInitialProps({ req }) {
    const isServer = !!req;

    if (isServer) {
      const collection = req.app.locals.collection;

      const data = await collection
        .find({})
        .toArray()
        .then(response => {
          response.sort((a, b) => +a.order - +b.order);
          return { projects: response };
        });

      return { data, user: req.user.displayName };
    } else {
      const res = await fetch(`/api/projects`, {
        headers: { Accept: 'application/json' }
      });
      const data = await res.json();

      return { data };
    }
  }

  createRecord = async data => {
    const res = await fetch(`/api/project`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: data
    });

    const json = await res.json();

    if (json.ok) {
      this.setState(state => ({
        projects: state.projects
          .concat(json.data)
          .sort((a, b) => +a.order - +b.order)
      }));

      this.setState({ toasterType: 'create-success' });
    } else {
      this.setState({ toasterType: 'create-fail' });
    }
  };

  updateRecord = async data => {
    const res = await fetch(`/api/project/${data.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (json.ok) {
      this.setState({ toasterType: 'update-success' });
    } else {
      this.setState({ toasterType: 'update-fail' });
    }
  };

  deleteRecord = async id => {
    if (window.confirm(`Do you really want delete this record?`)) {
      const res = await fetch(`/api/project/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
      });

      const json = await res.json();

      if (json.ok) {
        this.setState(state => ({
          projects: state.projects.filter(project => project._id !== id)
        }));

        this.setState({ toasterType: 'delete-success' });
      } else {
        this.setState({ toasterType: 'update-fail' });
      }
    }
  };

  resetToaster = () => {
    this.setState({ toasterType: '' });
  };

  render() {
    const rows = this.state.projects.map(project => (
      <Row
        deleteRecord={this.deleteRecord}
        key={project._id}
        projects={this.state.projects}
        updateRecord={this.updateRecord}
        {...project}
      />
    ));

    return (
      <Layout>
        <h2 style={{ marginTop: '3.5rem' }}>Add new project</h2>
        <CreateRecord createRecord={this.createRecord} />
        <h2 style={{ marginTop: '3.5rem' }}>Current projects</h2>
        <Table>{rows}</Table>
        <footer style={{ marginTop: '3.5rem' }}>
          Logged in as <i>{this.state.user}</i>.
        </footer>
        <Toaster reset={this.resetToaster} type={this.state.toasterType} />
      </Layout>
    );
  }
}

export default Home;
