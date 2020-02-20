import React from "react";
import { Query } from "react-apollo";
import ContinentsPresenter from "./ContinentsPresenter";
import { TopContinents, TopContinentsVariables } from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { TOP_CONTINENTS } from "./ContinentsQueries";

class GetContinentsQuery extends Query<TopContinents, TopContinentsVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  continentList: any;
}
class ContinentsContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    if (props.history.action === "POP" || !props.location.state) {
      props.history.goBack();
    }
    this.state = {
      search: "",
      continentList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", continentList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { uuid }
      }
    } = this.props;
    const { search, continentList } = this.state;
    return (
      <GetContinentsQuery query={TOP_CONTINENTS} variables={{ uuid }}>
        {({ data, loading }) => {
          this.data = data;
          return (
            <ContinentsPresenter
              data={data}
              loading={loading}
              onChange={this.onChange}
              search={search}
              continentList={continentList}
              back={this.back}
            />
          );
        }}
      </GetContinentsQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      topContinents: { continents = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(i =>
        i.continentName.toLowerCase().includes(text.toLowerCase())
      );
    const continentList = search(continents, value);
    this.setState({
      search: value,
      continentList
    } as any);
  };
  public back = async event => {
    const {
      match: {
        params: { uuid }
      }
    } = this.props;
    const { history } = this.props;
    await event.stopPropagation();
    history.push(`/${uuid}`);
  };
}

export default withRouter(ContinentsContainer);
