import React from "react";
import styled from "src/Styles/typed-components";
import UserHeader from "./UserHeader";
import Bold from "./Bold";
import { Link } from "react-router-dom";
import { Noti } from "../Icons";

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 3fr 3fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

const GreyText = styled(Bold)`
  color: ${props => props.theme.greyColor};
  margin-top: 5px;
`;

const ICon = styled.div`
  position: absolute;
  margin-top: 1px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  notification: any;
  actor: any;
  isRead: boolean;
  onMarkRead: (notificationId: string) => void;
}

const NotificationRow: React.FunctionComponent<IProps> = ({
  notification,
  actor,
  onMarkRead,
  isRead
}) => {
  if (notification.verb) {
    return (
      <>
        {(() => {
          switch (notification.verb) {
            case "MATCH":
              return (
                <>
                  <Link
                    to={{
                      pathname: `/`
                    }}
                    onClick={() => onMarkRead(notification.id)}
                  >
                    <UserRow>
                      {!isRead ? (
                        <ICon>
                          <Noti />
                        </ICon>
                      ) : null}
                      <UserHeader
                        username={notification.actor.username}
                        currentCity={actor.currentCity.cityName}
                        currentCountry={actor.currentCity.country.countryName}
                        avatar={actor.avatar}
                        size={"sm"}
                      />
                      <Column>
                        <GreyText text={"You've got a Matched!"} />
                        <GreyText text={notification.naturalTime} />
                      </Column>
                    </UserRow>
                  </Link>
                </>
              );
            default:
              return null;
          }
        })()}
      </>
    );
  } else {
    return null;
  }
};

export default NotificationRow;
