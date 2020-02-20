import React from "react";
import { Query } from "react-apollo";
import CountriesPresenter from "./CountriesPresenter";
import { TopCountries, TopCountriesVariables } from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { TOP_COUNTRIES } from "./CountriesQueries";

class GetCountriesQuery extends Query<TopCountries, TopCountriesVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  countryList: any;
}
class CountriesContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    if (props.history.action === "POP" || !props.location.state) {
      props.history.goBack();
    }
    this.state = {
      search: "",
      countryList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", countryList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { uuid }
      }
    } = this.props;
    const { search, countryList } = this.state;
    return (
      <GetCountriesQuery query={TOP_COUNTRIES} variables={{ uuid }}>
        {({ data, loading }) => {
          this.data = data;
          return (
            <CountriesPresenter
              data={data}
              loading={loading}
              onChange={this.onChange}
              search={search}
              countryList={countryList}
              back={this.back}
            />
          );
        }}
      </GetCountriesQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      topCountries: { countries = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(
        i =>
          i.countryName.toLowerCase().includes(text.toLowerCase()) ||
          i.continent.continentName.toLowerCase().includes(text.toLowerCase())
      );
    const countryList = search(countries, value);
    this.setState({
      search: value,
      countryList
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

export default withRouter(CountriesContainer);
