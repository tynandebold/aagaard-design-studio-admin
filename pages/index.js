import fetch from 'isomorphic-fetch';
import Layout from '../components/layout';
import Row from '../components/Row';
import Table from '../components/Table';
import AddRecord from '../components/AddRecord';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: this.props.data.projects
    };

    this.addRecord = this.addRecord.bind(this);
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
          response.sort((a, b) => +a.order - +b.order);
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

  async addRecord(data) {
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
        <h2 style={{ marginTop: '3rem' }}>Add new entry</h2>
        <AddRecord addRecord={this.addRecord} />
        <h2 style={{ marginTop: '3rem' }}>Current entries</h2>
        <Table>{rows}</Table>
      </Layout>
    );
  }
}

export default Home;
