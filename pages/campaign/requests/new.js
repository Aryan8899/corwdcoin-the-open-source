import React, { Component } from "react";
import { Form, Button, Message, Input, Label } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../Components/Layout";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
  };
  static async getInitalProps(props) {
    const { address } = props.query;
    return { address };
  }
  onSumbit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
    } catch (err) {}
  };
  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form omSumbit={this.onSumbit}>
          <Form.Field>
            <Label> description</Label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <Label>value in Ether</Label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <Label>Recipient</Label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>

          <Button primary> Create!</Button>
        </Form>
      </Layout>
    );
  }
}
export default RequestNew;
