import React from "react";
import { Mutation } from "react-apollo";
import {
  Match,
  MatchVariables,
  UnMatch,
  UnMatchVariables
} from "../../types/api";
import { MATCH, UNMATCH } from "./CoffeeBtnQueries";
import { GET_MATCHES } from "../../Routes/Match/MatchQueries";
import { GET_COFFEES } from "../../Routes/User/Coffees/CoffeesQueries";
import CoffeeBtnPresenter from "./CoffeeBtnPresenter";
import { toast } from "react-toastify";
import { RouteComponentProps, withRouter } from "react-router";

class MatchMutation extends Mutation<Match, MatchVariables> {}

class UnMatchMutation extends Mutation<UnMatch, UnMatchVariables> {}

interface IProps extends RouteComponentProps {
  coffeeId?: string;
  matchId?: string;
  isSelf: boolean;
  isMatching: boolean;
  searchSet: () => void;
  from?: string;
}

interface IState {
  cityId: string;
  isMatching: boolean;
  isSubmitted: boolean;
}

class CoffeeBtnContainer extends React.Component<IProps, IState> {
  public matchFn;
  public unMatchFn;
  constructor(props) {
    super(props);
    this.state = {
      cityId: props.cityId,
      isMatching: props.isMatching,
      isSubmitted: false
    };
  }
  public render() {
    const { coffeeId, matchId, isSelf } = this.props;
    const { isMatching } = this.state;
    return (
      <UnMatchMutation
        mutation={UNMATCH}
        variables={{ matchId: parseInt(matchId, 10) }}
        onCompleted={this.onCompletedUnMatch}
        update={this.updateUnMatch}
      >
        {unMatchFn => {
          this.unMatchFn = unMatchFn;
          return (
            <MatchMutation
              mutation={MATCH}
              variables={{ coffeeId }}
              onCompleted={this.onCompletedMatch}
              update={this.updateMatch}
            >
              {matchFn => {
                this.matchFn = matchFn;
                return (
                  <CoffeeBtnPresenter
                    isMatching={isMatching}
                    match={this.match}
                    unmatch={this.unmatch}
                    isSelf={isSelf}
                  />
                );
              }}
            </MatchMutation>
          );
        }}
      </UnMatchMutation>
    );
  }
  public match = async () => {
    const { from } = this.props;
    const { isSubmitted } = this.state;
    if (!isSubmitted) {
      this.setState({ isSubmitted: true });
      await this.matchFn();
      {
        // tslint:disable-next-line:no-unused-expression
        from && (await this.props.history.push(`${from}`));
      }
    }
  };
  public unmatch = async () => {
    const { from } = this.props;
    const { isSubmitted } = this.state;
    if (!isSubmitted) {
      this.setState({ isSubmitted: true });
      await this.unMatchFn();
      {
        // tslint:disable-next-line:no-unused-expression
        from && (await this.props.history.push(`${from}`));
      }
    }
  };
  public onCompletedMatch = data => {
    const { searchSet } = this.props;
    const { match } = data;
    this.setState({ isSubmitted: false });
    if (match.ok) {
      toast.success("Match accepted, say hello");
      {
        // tslint:disable-next-line:no-unused-expression
        searchSet && searchSet();
      }
    } else {
      toast.error("error");
    }
  };
  public updateMatch = (cache, { data: { match } }) => {
    try {
      const matchData = cache.readQuery({
        query: GET_MATCHES
      });
      if (matchData) {
        matchData.getMatches.matches.unshift(match.match);
        cache.writeQuery({
          query: GET_MATCHES,
          data: matchData
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const cityData = cache.readQuery({
        query: GET_COFFEES,
        variables: {
          cityId: match.cityId,
          location: "city"
        }
      });
      if (cityData) {
        cityData.getCoffees.coffees = cityData.getCoffees.coffees.filter(
          i => i.uuid !== match.coffeeId
        );
        cache.writeQuery({
          query: GET_COFFEES,
          variables: {
            cityId: match.cityId,
            location: "city"
          },
          data: cityData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  public onCompletedUnMatch = data => {
    const { searchSet } = this.props;
    const { unMatch } = data;
    this.setState({ isSubmitted: false });
    if (unMatch.ok) {
      toast.success("UnMatch accepted, say bye");
      {
        // tslint:disable-next-line:no-unused-expression
        searchSet && searchSet();
      }
    } else {
      toast.error("error");
    }
  };
  public updateUnMatch = (cache, { data: { unMatch } }) => {
    try {
      const matchData = cache.readQuery({
        query: GET_MATCHES
      });
      if (matchData) {
        matchData.getMatches.matches = matchData.getMatches.matches.filter(
          i => i.id !== unMatch.matchId
        );
        cache.writeQuery({
          query: GET_MATCHES,
          data: matchData
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const cityData = cache.readQuery({
        query: GET_COFFEES,
        variables: { cityId: unMatch.cityId, location: "city" }
      });
      if (unMatch.coffee.status !== "expired" && unMatch.coffee) {
        if (cityData) {
          cityData.getCoffees.coffees.push(unMatch.coffee);
          cache.writeQuery({
            query: GET_COFFEES,
            variables: { cityId: unMatch.cityId, location: "city" },
            data: cityData
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(CoffeeBtnContainer);
