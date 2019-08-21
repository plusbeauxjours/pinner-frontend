import React from "react";
import { Query } from "react-apollo";
import CitiesPresenter from "./CitiesPresenter";
import { FrequentVisits, FrequentVisitsVariables } from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { FREQUENT_VISITS } from "./CitiesQueries";

class GetCitiesQuery extends Query<FrequentVisits, FrequentVisitsVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  cityList: any;
}

class CitiesContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    if (props.history.action === "POP" || !props.location.state) {
      props.history.goBack();
    }
    this.state = {
      search: "",
      cityList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", cityList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { search, cityList } = this.state;
    return (
      <GetCitiesQuery
        query={FREQUENT_VISITS}
        variables={{ userName: username }}
      >
        {({ data, loading }) => {
          this.data = data;
          return (
            <CitiesPresenter
              loading={loading}
              data={data}
              onChange={this.onChange}
              search={search}
              cityList={cityList}
              back={this.back}
            />
          );
        }}
      </GetCitiesQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      frequentVisits: { cities = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(
        i =>
          i.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const cityList = search(cities, value);
    this.setState({
      search: value,
      cityList
    } as any);
  };
  public back = async event => {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { history } = this.props;
    await event.stopPropagation();
    history.push(`/${username}`);
  };
}

export default withRouter(CitiesContainer);
