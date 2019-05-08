import fetch from 'isomorphic-fetch';
import Layout from '../components/layout';
import Row from '../components/Row';
import Table from '../components/Table';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: this.props.data.projects
    };

    this.deleteRecord = this.deleteRecord.bind(this);
  }

  static async getInitialProps({ req }) {
    const isServer = !!req;

    if (isServer) {
      const collection = req.app.locals.collection;

      const data = await collection
        .find({})
        .toArray()
        .then(response => {
          return { projects: response };
        });

      return { data };
    } else {
      const res = await fetch(`/api/projects`, {
        headers: { Accept: 'application/json' }
      });
      const data = await res.json();

      return { data };
    }
  }

  async deleteRecord(id) {
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
      }
    }
  }

  render() {
    const rows = this.state.projects.map(project => (
      <Row
        deleteRecord={this.deleteRecord}
        key={project._id}
        projects={this.state.projects}
        {...project}
      />
    ));

    return (
      <Layout>
        <h2>Add new entry</h2>
        <h2>Current entries</h2>
        <Table>{rows}</Table>
      </Layout>
    );
  }
}

export default Home;
