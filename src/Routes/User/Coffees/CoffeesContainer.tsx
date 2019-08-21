import React from "react";
import { Query } from "react-apollo";
import { GetCoffeesVariables, GetCoffees } from "src/types/api";
import CoffeesPresenter from "./CoffeesPresenter";
import { GET_COFFEES } from "./CoffeesQueries";
import { RouteComponentProps } from "react-router";

class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  coffeesList: any;
}

class CoffeesContainer extends React.Component<IProps, IState> {
  public data;
  constructor(props) {
    super(props);
    if (props.history.action === "POP" || !props.location.state) {
      props.history.goBack();
    }
    this.state = {
      search: "",
      coffeesList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({ search: "", coffeesList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { username }
      }
    } = this.props;
    const { search, coffeesList } = this.state;
    return (
      <GetCoffeesQuery
        query={GET_COFFEES}
        variables={{ userName: username, location: "history" }}
      >
        {({ data, loading }) => {
          this.data = data;
          return (
            <CoffeesPresenter
              data={data}
              loading={loading}
              onChange={this.onChange}
              search={search}
              coffeesList={coffeesList}
              back={this.back}
            />
          );
        }}
      </GetCoffeesQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      getCoffees: { coffees = null }
    } = this.data;
    const nowSearch = (list, text) =>
      list.filter(
        i =>
          i.city.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.city.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const coffeesList = nowSearch(coffees, value);
    this.setState({
      search: value,
      coffeesList
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

export default CoffeesContainer;
