import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { MutationFn, Mutation } from "react-apollo";
import { CreateCity, CreateCityVariables } from "../../types/api";
import { CREATE_CITY } from "./SearchQueries";

class CreateCityQuery extends Mutation<CreateCity, CreateCityVariables> {}

interface IProps extends RouteComponentProps<any> {
  search: string;
  searchData: any;
  searchLoading: boolean;
}

interface IState {
  search: string;
}

class SearchContainer extends React.Component<IProps, IState> {
  public createCityFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      search: props.search
    };
  }
  public render() {
    const { search, searchData, searchLoading } = this.props;
    return (
      <CreateCityQuery mutation={CREATE_CITY}>
        {(createCityFn, { loading: createCityLoading }) => {
          this.createCityFn = createCityFn;
          return (
            <SearchPresenter
              search={search}
              searchData={searchData}
              searchLoading={searchLoading}
              onClick={this.onClick}
              createCityLoading={createCityLoading}
            />
          );
        }}
      </CreateCityQuery>
    );
  }
  public onClick = async (placeId: string) => {
    const { history } = this.props;
    await this.createCityFn({
      variables: {
        cityId: placeId
      }
    });
    await history.push({
      pathname: `/city/${placeId}`
    });
  };
}

export default withRouter(SearchContainer);
