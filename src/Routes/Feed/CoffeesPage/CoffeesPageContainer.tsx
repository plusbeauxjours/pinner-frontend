import React from "react";
import { Query } from "react-apollo";
import { GetCoffeesVariables, GetCoffees } from "src/types/api";
import CoffeesPagePresenter from "./CoffeesPagePresenter";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { RouteComponentProps } from "react-router";

class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  location: string;
  cityId: string;
  countryCode: string;
  continentCode: string;
  search: string;
  coffeesList: any;
}

class CoffeesPageContainer extends React.Component<IProps, IState> {
  public coffeeData;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      location: state.location,
      cityId: state.currentCityId,
      countryCode: state.currentCountryCode,
      continentCode: state.currentContinentCode,
      search: "",
      coffeesList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", coffeesList: [] });
    }
  }
  public render = () => {
    const {
      location,
      cityId,
      countryCode,
      continentCode,
      search,
      coffeesList
    } = this.state;
    return (
      <GetCoffeesQuery
        query={GET_COFFEES}
        variables={{
          cityId,
          countryCode,
          continentCode,
          location
        }}
      >
        {({ data: coffeeData, loading: coffeeLoading }) => {
          this.coffeeData = coffeeData;
          return (
            <CoffeesPagePresenter
              coffeeData={coffeeData}
              coffeeLoading={coffeeLoading}
              onChange={this.onChange}
              search={search}
              coffeesList={coffeesList}
              searchSet={this.searchSet}
            />
          );
        }}
      </GetCoffeesQuery>
    );
  };
  public searchSet = () => {
    this.setState({ search: "", coffeesList: [] });
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      getCoffees: { coffees = null }
    } = this.coffeeData;
    const nowSearch = (list, text) =>
      list.filter(i =>
        i.host.username.toLowerCase().includes(text.toLowerCase())
      );

    const coffeesList = nowSearch(coffees, value);
    this.setState({
      search: value,
      coffeesList
    } as any);
  };
}

export default CoffeesPageContainer;
