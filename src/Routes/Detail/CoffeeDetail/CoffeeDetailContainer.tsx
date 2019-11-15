import React from "react";
import CoffeeDetailPresenter from "./CoffeeDetailPresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  CoffeeDetail,
  CoffeeDetailVariables,
  DeleteCoffee,
  DeleteCoffeeVariables
} from "../../../types/api";
import { COFFEE_DETAIL } from "./CoffeeDetailQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { DELETE_COFFEE } from "../../Detail/CoffeeDetail/CoffeeDetailQueries";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { toast } from "react-toastify";

class CoffeeDetailQuery extends Query<CoffeeDetail, CoffeeDetailVariables> {}
class DeleteCoffeeMutation extends Mutation<
  DeleteCoffee,
  DeleteCoffeeVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
  from: string;
}

class CoffeeDetailContainer extends React.Component<IProps, IState> {
  public deleteCoffeeFn: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      modalOpen: false,
      from: state.from
    };
  }
  public render() {
    const {
      match: {
        params: { uuid }
      }
    } = this.props;
    const { modalOpen, from } = this.state;
    return (
      <DeleteCoffeeMutation
        mutation={DELETE_COFFEE}
        onCompleted={this.onCompletedDeleteCoffee}
        update={this.updateDeleteCoffee}
      >
        {deleteCoffeeFn => {
          this.deleteCoffeeFn = deleteCoffeeFn;
          return (
            <CoffeeDetailQuery
              query={COFFEE_DETAIL}
              variables={{ coffeeId: uuid }}
              fetchPolicy="no-cache"
            >
              {({ data, loading }) => (
                <>
                  <CoffeeDetailPresenter
                    loading={loading}
                    data={data}
                    modalOpen={modalOpen}
                    toggleModal={this.toggleModal}
                    back={this.back}
                    deleteCoffee={this.deleteCoffee}
                    from={from}
                    formatDistance={this.formatDistance}
                  />
                </>
              )}
            </CoffeeDetailQuery>
          );
        }}
      </DeleteCoffeeMutation>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };
  public back = () => {
    const { from } = this.state;
    this.props.history.push({
      pathname: from,
      state: { search: "" }
    });
  };
  public onCompletedDeleteCoffee = data => {
    if (data.deleteCoffee.ok) {
      this.props.history.goBack();
      toast.success("Coffee deleted");
    } else {
      toast.error("error");
    }
  };
  public updateDeleteCoffee = (cache, { data: { deleteCoffee } }) => {
    const { username } = deleteCoffee;
    const currentCity = localStorage.getItem("cityId");
    try {
      const profileData = cache.readQuery({
        query: GET_COFFEES,
        variables: { userName: username, location: "profile" }
      });
      if (profileData) {
        profileData.getCoffees.coffees = profileData.getCoffees.coffees.filter(
          i => i.uuid !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { userName: username, location: "profile" },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: { cityId: currentCity, location: "city" }
      });
      if (feedData) {
        feedData.getCoffees.coffees = feedData.getCoffees.coffees.filter(
          i => i.uuid !== deleteCoffee.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            cityId: currentCity,
            location: "city"
          },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public deleteCoffee = () => {
    const {
      match: {
        params: { uuid }
      }
    } = this.props;
    this.deleteCoffeeFn({ variables: { coffeeId: uuid } });
    this.setState({
      modalOpen: false
    });
  };
  public formatDistance = (distance: number) => {
    if (distance < 1e3) {
      return distance;
    }
    if (distance >= 1e3 && distance < 1e5) {
      return +(distance / 1e3).toFixed(2) + "K";
    }
    if (distance >= 1e5 && distance < 1e8) {
      return +(distance / 1e6).toFixed(2) + "M";
    }
    if (distance >= 1e8 && distance < 1e11) {
      return +(distance / 1e9).toFixed(2) + "B";
    }
    if (distance >= 1e11) {
      return +(distance / 1e12).toFixed(1) + "T";
    } else {
      return null;
    }
  };
}

export default withRouter(CoffeeDetailContainer);
