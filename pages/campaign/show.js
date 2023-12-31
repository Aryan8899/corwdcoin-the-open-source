import React, { Component } from "react";
import Layout from "../../Components/Layout";
import { Card, CardDescription, Grid, Button } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import Contribute from "../../Components/ContributeForm";
import ContributeForm from "../../Components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of managr",
        description: "the manager can create this campaign",
        style: { overflowWrap: "break-word" },
      },

      {
        header: minimumContribution,
        meta: "Minimum Contribution(wei)",
        description:
          "you must contribute at least this much wei to became a contributor",
      },

      {
        header: requestsCount,
        meta: "Number of Requests",
        description: "A request tries to withdraw mpney from the contract ",
      },

      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },

      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description: " the balance is how much money this campaign has left",
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Index</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaign/${this.props.address}/requests`}>
                <a>
                  <Button primary> View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
