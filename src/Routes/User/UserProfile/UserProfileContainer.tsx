import React from "react";
import UserProfilePresenter from "./UserProfilePresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  UserProfile,
  UserProfileVariables,
  AddTrip,
  GetTrips,
  GetTripsVariables,
  AddTripVariables,
  EditTrip,
  EditTripVariables,
  DeleteTrip,
  DeleteTripVariables,
  CreateCity,
  CreateCityVariables,
  GetAvatars,
  GetAvatarsVariables,
  UploadAvatar,
  UploadAvatarVariables,
  DeleteAvatar,
  DeleteAvatarVariables,
  MarkAsMain,
  MarkAsMainVariables,
  CalculateDistance,
  SlackReportUsers,
  SlackReportUsersVariables,
} from "src/types/api";
import {
  GET_USER,
  GET_TRIPS,
  ADD_TRIP,
  EDIT_TRIP,
  DELETE_TRIP,
} from "./UserProfileQueries";
import { LOG_USER_OUT } from "../../../sharedQueries.local";

import { withRouter, RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { reversePlaceId } from "../../../mapHelpers";
import { CREATE_CITY } from "../../../Components/Search/SearchQueries";
import {
  MARK_AS_MAIN,
  CALCULATE_DISTANCE,
  SLACK_REPORT_USERS,
} from "./UserProfileQueries";
import {
  GET_AVATARS,
  UPLOAD_AVATAR,
  DELETE_AVATAR,
} from "./UserProfileQueries";
import { ME } from "src/sharedQueries";

class CreateCityMutation extends Mutation<CreateCity, CreateCityVariables> {}

class UserProfileQuery extends Query<UserProfile, UserProfileVariables> {}
class GetTiprsQuery extends Query<GetTrips, GetTripsVariables> {}
class AddTripMutation extends Mutation<AddTrip, AddTripVariables> {}
class EditTripMutation extends Mutation<EditTrip, EditTripVariables> {}
class DeleteTripMutation extends Mutation<DeleteTrip, DeleteTripVariables> {}

class UploadAvatarMutation extends Mutation<
  UploadAvatar,
  UploadAvatarVariables
> {}
class DeleteAvatarMutation extends Mutation<
  DeleteAvatar,
  DeleteAvatarVariables
> {}

class GetAvatarsQuery extends Query<GetAvatars, GetAvatarsVariables> {}
class MarkAsMainMutation extends Mutation<MarkAsMain, MarkAsMainVariables> {}
class CalculateDistanceMutation extends Mutation<CalculateDistance> {}
class SlackReportUsersMutation extends Mutation<
  SlackReportUsers,
  SlackReportUsersVariables
> {}
class LogOutMutation extends Mutation {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
  reportModalOpen: boolean;
  avatarPreviewModalOpen: boolean;
  avatarModalOpen: boolean;
  tripModalOpen: boolean;
  tripConfirmModalOpen: boolean;
  tripAddModalOpen: boolean;
  tripEditModalOpen: boolean;
  requestModalOpen: boolean;
  editMode: boolean;
  id: string;
  tripCitySearch: string;
  cityName: string;
  cityId: string;

  countryName: string;
  moveNotificationId: string;
  search: string;
  tripList: any;
  currentCityId: string;
  lat: number;
  lng: number;
  file: any;
  imagePreviewUrl: any;
  logoutConfirmModal: boolean;
  countryModalOpen: boolean;
  countryCode: string;
  gender: string;
  target: string;
}

class UserProfileContainer extends React.Component<IProps, IState> {
  public logUserOutFn: MutationFn;
  public addTripFn: MutationFn;
  public editTripFn: MutationFn;
  public deleteTripFn: MutationFn;
  public createCityFn: MutationFn;

  public slackReportUsersFn: MutationFn;
  public uploadAvatarFn: MutationFn;
  public deleteAvatarFn: MutationFn;
  public markAsMainFn: MutationFn;
  public calculateDistanceFn: MutationFn;

  public getTripsData;
  public data;

  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      modalOpen: false,
      reportModalOpen: false,
      avatarPreviewModalOpen: false,
      avatarModalOpen: state.avatarModalOpen || false,
      tripModalOpen: false,
      tripConfirmModalOpen: false,
      tripAddModalOpen: false,
      tripEditModalOpen: false,
      requestModalOpen: false,
      editMode: false,
      id: props.id,
      tripCitySearch: "",
      cityName: props.cityName,
      cityId: props.cityId,

      countryName: props.countryName,
      moveNotificationId: null,
      search: "",
      tripList: [],
      lat: state.currentLat,
      lng: state.currentLng,
      currentCityId: state.currentCityId || localStorage.getItem("cityId"),
      file: null,
      imagePreviewUrl: "",
      logoutConfirmModal: false,
      countryModalOpen: false,

      countryCode: "",
      gender: "",
      target: "",
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.username !== newProps.match.params.username) {
      this.setState({
        search: "",
        tripList: [],
        avatarModalOpen: false,
      });
    }
  }
  public render() {
    const {
      match: {
        params: { uuid },
      },
    } = this.props;
    const {
      modalOpen,
      reportModalOpen,
      avatarPreviewModalOpen,
      avatarModalOpen,
      tripModalOpen,
      tripConfirmModalOpen,
      tripAddModalOpen,
      tripEditModalOpen,
      requestModalOpen,
      tripCitySearch,
      cityName,
      cityId,

      countryName,
      moveNotificationId,
      search,
      tripList,
      imagePreviewUrl,
      logoutConfirmModal,
      countryModalOpen,

      target,
    } = this.state;
    return (
      <SlackReportUsersMutation
        mutation={SLACK_REPORT_USERS}
        onCompleted={this.onCompletedSlackReportUsers}
      >
        {(slackReportUsersFn) => {
          this.slackReportUsersFn = slackReportUsersFn;
          return (
            <LogOutMutation mutation={LOG_USER_OUT}>
              {(logUserOutFn) => {
                this.logUserOutFn = logUserOutFn;
                return (
                  <CalculateDistanceMutation
                    mutation={CALCULATE_DISTANCE}
                    update={this.updateCalculateDistance}
                  >
                    {(calculateDistanceFn) => {
                      this.calculateDistanceFn = calculateDistanceFn;
                      return (
                        <MarkAsMainMutation
                          mutation={MARK_AS_MAIN}
                          update={this.updateMarkAsMain}
                          onCompleted={this.onCompletedMarkAsMain}
                        >
                          {(markAsMainFn) => {
                            this.markAsMainFn = markAsMainFn;
                            return (
                              <DeleteAvatarMutation
                                mutation={DELETE_AVATAR}
                                update={this.updateDeleteAvatar}
                                onCompleted={this.onCompletedDeleteAvatar}
                              >
                                {(deleteAvatarFn) => {
                                  this.deleteAvatarFn = deleteAvatarFn;
                                  return (
                                    <UploadAvatarMutation
                                      mutation={UPLOAD_AVATAR}
                                      update={this.updatUploadAvatar}
                                      onCompleted={this.onCompletedUploadAvatar}
                                    >
                                      {(
                                        uploadAvatarFn,
                                        { loading: uploadAvatarLoading }
                                      ) => {
                                        this.uploadAvatarFn = uploadAvatarFn;
                                        return (
                                          <GetAvatarsQuery
                                            query={GET_AVATARS}
                                            variables={{ uuid }}
                                            onCompleted={
                                              this.onCompletedGetAvatar
                                            }
                                          >
                                            {({
                                              data: avatarsData,
                                              loading: avatarsLoading,
                                            }) => (
                                              <CreateCityMutation
                                                mutation={CREATE_CITY}
                                                onCompleted={
                                                  this.onCompletedCreateCity
                                                }
                                              >
                                                {(
                                                  createCityFn,
                                                  { loading: createCityLoading }
                                                ) => {
                                                  this.createCityFn = createCityFn;
                                                  return (
                                                    <UserProfileQuery
                                                      query={GET_USER}
                                                      onCompleted={
                                                        this
                                                          .onCompletedUserProfile
                                                      }
                                                      variables={{ uuid }}
                                                    >
                                                      {({
                                                        data: userProfileData,
                                                        loading: userProfileLoading,
                                                      }) => (
                                                        <GetTiprsQuery
                                                          query={GET_TRIPS}
                                                          variables={{
                                                            uuid,
                                                          }}
                                                        >
                                                          {({
                                                            data: getTripsData,
                                                            loading: getTipsLoading,
                                                          }) => {
                                                            this.getTripsData = getTripsData;
                                                            return (
                                                              <AddTripMutation
                                                                mutation={
                                                                  ADD_TRIP
                                                                }
                                                                variables={{
                                                                  cityId,
                                                                }}
                                                                refetchQueries={[
                                                                  {
                                                                    query: GET_TRIPS,
                                                                    variables: {
                                                                      uuid,
                                                                    },
                                                                  },
                                                                ]}
                                                                onCompleted={
                                                                  this
                                                                    .onCompletedAddTrip
                                                                }
                                                              >
                                                                {(
                                                                  addTripFn
                                                                ) => {
                                                                  this.addTripFn = addTripFn;
                                                                  return (
                                                                    <EditTripMutation
                                                                      mutation={
                                                                        EDIT_TRIP
                                                                      }
                                                                      variables={{
                                                                        moveNotificationId: parseInt(
                                                                          moveNotificationId,
                                                                          10
                                                                        ),
                                                                        cityId,
                                                                      }}
                                                                      refetchQueries={[
                                                                        {
                                                                          query: GET_TRIPS,
                                                                          variables: {
                                                                            uuid,
                                                                          },
                                                                        },
                                                                      ]}
                                                                      onCompleted={
                                                                        this
                                                                          .onCompletedEditTrip
                                                                      }
                                                                    >
                                                                      {(
                                                                        editTripFn
                                                                      ) => {
                                                                        this.editTripFn = editTripFn;
                                                                        return (
                                                                          <DeleteTripMutation
                                                                            mutation={
                                                                              DELETE_TRIP
                                                                            }
                                                                            variables={{
                                                                              moveNotificationId: parseInt(
                                                                                moveNotificationId,
                                                                                10
                                                                              ),
                                                                            }}
                                                                            update={
                                                                              this
                                                                                .updateDeleteTrip
                                                                            }
                                                                            onCompleted={
                                                                              this
                                                                                .onCompletedDeleteTrip
                                                                            }
                                                                          >
                                                                            {(
                                                                              deleteTripFn
                                                                            ) => {
                                                                              this.deleteTripFn = deleteTripFn;
                                                                              return (
                                                                                <UserProfilePresenter
                                                                                  avatarsData={
                                                                                    avatarsData
                                                                                  }
                                                                                  avatarsLoading={
                                                                                    avatarsLoading
                                                                                  }
                                                                                  modalOpen={
                                                                                    modalOpen
                                                                                  }
                                                                                  reportModalOpen={
                                                                                    reportModalOpen
                                                                                  }
                                                                                  avatarPreviewModalOpen={
                                                                                    avatarPreviewModalOpen
                                                                                  }
                                                                                  avatarModalOpen={
                                                                                    avatarModalOpen
                                                                                  }
                                                                                  tripModalOpen={
                                                                                    tripModalOpen
                                                                                  }
                                                                                  tripConfirmModalOpen={
                                                                                    tripConfirmModalOpen
                                                                                  }
                                                                                  tripAddModalOpen={
                                                                                    tripAddModalOpen
                                                                                  }
                                                                                  tripEditModalOpen={
                                                                                    tripEditModalOpen
                                                                                  }
                                                                                  toggleModal={
                                                                                    this
                                                                                      .toggleModal
                                                                                  }
                                                                                  toggleReportModal={
                                                                                    this
                                                                                      .toggleReportModal
                                                                                  }
                                                                                  toggleTripModal={
                                                                                    this
                                                                                      .toggleTripModal
                                                                                  }
                                                                                  toggleTripConfirmModal={
                                                                                    this
                                                                                      .toggleTripConfirmModal
                                                                                  }
                                                                                  toggleAddTripModal={
                                                                                    this
                                                                                      .toggleAddTripModal
                                                                                  }
                                                                                  toggleEditTripModal={
                                                                                    this
                                                                                      .toggleEditTripModal
                                                                                  }
                                                                                  userProfileData={
                                                                                    userProfileData
                                                                                  }
                                                                                  userProfileLoading={
                                                                                    userProfileLoading
                                                                                  }
                                                                                  getTripsData={
                                                                                    getTripsData
                                                                                  }
                                                                                  getTipsLoading={
                                                                                    getTipsLoading
                                                                                  }
                                                                                  onSearchInputChange={
                                                                                    this
                                                                                      .onSearchInputChange
                                                                                  }
                                                                                  tripCitySearch={
                                                                                    tripCitySearch
                                                                                  }
                                                                                  cityName={
                                                                                    cityName
                                                                                  }
                                                                                  cityId={
                                                                                    cityId
                                                                                  }
                                                                                  countryName={
                                                                                    countryName
                                                                                  }
                                                                                  addTrip={
                                                                                    this
                                                                                      .addTrip
                                                                                  }
                                                                                  editTrip={
                                                                                    this
                                                                                      .editTrip
                                                                                  }
                                                                                  deleteTrip={
                                                                                    this
                                                                                      .deleteTrip
                                                                                  }
                                                                                  gotoTrip={
                                                                                    this
                                                                                      .gotoTrip
                                                                                  }
                                                                                  toggleRequestModal={
                                                                                    this
                                                                                      .toggleRequestModal
                                                                                  }
                                                                                  requestModalOpen={
                                                                                    requestModalOpen
                                                                                  }
                                                                                  uuid={
                                                                                    uuid
                                                                                  }
                                                                                  search={
                                                                                    search
                                                                                  }
                                                                                  onChange={
                                                                                    this
                                                                                      .onChange
                                                                                  }
                                                                                  tripList={
                                                                                    tripList
                                                                                  }
                                                                                  onClickSearch={
                                                                                    this
                                                                                      .onClickSearch
                                                                                  }
                                                                                  createCityLoading={
                                                                                    createCityLoading
                                                                                  }
                                                                                  uploadAvatarLoading={
                                                                                    uploadAvatarLoading
                                                                                  }
                                                                                  toggleAvatarModal={
                                                                                    this
                                                                                      .toggleAvatarModal
                                                                                  }
                                                                                  onChangeImage={
                                                                                    this
                                                                                      .onChangeImage
                                                                                  }
                                                                                  onSubmitImage={
                                                                                    this
                                                                                      .onSubmitImage
                                                                                  }
                                                                                  imagePreviewUrl={
                                                                                    imagePreviewUrl
                                                                                  }
                                                                                  togglePreviewAvatarModal={
                                                                                    this
                                                                                      .togglePreviewAvatarModal
                                                                                  }
                                                                                  removeImagePreviewUrl={
                                                                                    this
                                                                                      .removeImagePreviewUrl
                                                                                  }
                                                                                  deleteAvatarFn={
                                                                                    this
                                                                                      .deleteAvatarFn
                                                                                  }
                                                                                  markAsMainFn={
                                                                                    markAsMainFn
                                                                                  }
                                                                                  logUserOut={
                                                                                    this
                                                                                      .logUserOut
                                                                                  }
                                                                                  logoutConfirmModal={
                                                                                    logoutConfirmModal
                                                                                  }
                                                                                  toggleLogoutConfirmModal={
                                                                                    this
                                                                                      .toggleLogoutConfirmModal
                                                                                  }
                                                                                  slackReportUsers={
                                                                                    this
                                                                                      .slackReportUsers
                                                                                  }
                                                                                  countryModalOpen={
                                                                                    countryModalOpen
                                                                                  }
                                                                                  target={
                                                                                    target
                                                                                  }
                                                                                  warningToast={
                                                                                    this
                                                                                      .warningToast
                                                                                  }
                                                                                  formatDistance={
                                                                                    this
                                                                                      .formatDistance
                                                                                  }
                                                                                />
                                                                              );
                                                                            }}
                                                                          </DeleteTripMutation>
                                                                        );
                                                                      }}
                                                                    </EditTripMutation>
                                                                  );
                                                                }}
                                                              </AddTripMutation>
                                                            );
                                                          }}
                                                        </GetTiprsQuery>
                                                      )}
                                                    </UserProfileQuery>
                                                  );
                                                }}
                                              </CreateCityMutation>
                                            )}
                                          </GetAvatarsQuery>
                                        );
                                      }}
                                    </UploadAvatarMutation>
                                  );
                                }}
                              </DeleteAvatarMutation>
                            );
                          }}
                        </MarkAsMainMutation>
                      );
                    }}
                  </CalculateDistanceMutation>
                );
              }}
            </LogOutMutation>
          );
        }}
      </SlackReportUsersMutation>
    );
  }
  public logUserOut = () => {
    this.logUserOutFn();
  };
  public toggleLogoutConfirmModal = () => {
    const { logoutConfirmModal } = this.state;
    this.setState({
      logoutConfirmModal: !logoutConfirmModal,
      modalOpen: false,
    });
  };
  public toggleAvatarModal = () => {
    const { avatarModalOpen } = this.state;
    this.setState({
      avatarModalOpen: !avatarModalOpen,
    });
  };
  public togglePreviewAvatarModal = () => {
    const { avatarPreviewModalOpen } = this.state;
    this.setState({
      avatarPreviewModalOpen: !avatarPreviewModalOpen,
    });
  };
  public toggleTripModal = (
    moveNotificationId,
    cityName,
    cityId,
    countryName
  ) => {
    const { tripModalOpen } = this.state;
    this.setState({
      tripModalOpen: !tripModalOpen,
      moveNotificationId,
      cityName,
      cityId,
      countryName,
    } as any);
  };
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
    } as any);
  };
  public toggleTripConfirmModal = () => {
    const { tripConfirmModalOpen, tripModalOpen } = this.state;
    this.setState({
      tripConfirmModalOpen: !tripConfirmModalOpen,
      tripModalOpen: !tripModalOpen,
    } as any);
  };
  public toggleAddTripModal = () => {
    const { tripAddModalOpen } = this.state;
    this.setState({
      tripAddModalOpen: !tripAddModalOpen,
      tripModalOpen: false,
    });
  };
  public toggleReportModal = () => {
    const { reportModalOpen } = this.state;
    this.setState({
      reportModalOpen: !reportModalOpen,
    });
  };
  public slackReportUsers = (payload) => {
    const {
      match: {
        params: { uuid },
      },
    } = this.props;
    this.slackReportUsersFn({
      variables: { targetUuid: uuid, payload },
    });
    this.setState({ reportModalOpen: false });
  };
  public toggleEditTripModal = () => {
    const { tripEditModalOpen } = this.state;
    this.setState({
      tripEditModalOpen: !tripEditModalOpen,
      tripModalOpen: false,
    });
  };
  public warningToast = (event) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      toast.info(`If you want to sbmit please click empty space 🤡`);
    }
  };
  public addTrip = async () => {
    const { tripAddModalOpen, cityId } = this.state;
    await this.setState({
      tripAddModalOpen: !tripAddModalOpen,
      tripModalOpen: false,
    });
    const city = await reversePlaceId(cityId);
    await this.createCityFn({
      variables: {
        cityId,
        cityName: city.storableLocation.cityName,
        cityLatitude: city.storableLocation.latitude,
        cityLongitude: city.storableLocation.longitude,
        countryCode: city.storableLocation.countryCode,
      },
    });
    await this.addTripFn();
    this.setState({
      moveNotificationId: "",
      cityName: "",
    });
  };
  public editTrip = async () => {
    const { tripEditModalOpen, cityId } = this.state;
    await this.setState({
      tripEditModalOpen: !tripEditModalOpen,
      tripModalOpen: false,
    });
    const city = await reversePlaceId(cityId);
    await this.createCityFn({
      variables: {
        cityId,
        cityName: city.storableLocation.cityName,
        cityLatitude: city.storableLocation.latitude,
        cityLongitude: city.storableLocation.longitude,
        countryCode: city.storableLocation.countryCode,
      },
    });
    await this.editTripFn();
    this.setState({
      moveNotificationId: "",
      cityName: "",
    });
  };
  public deleteTrip = () => {
    const { moveNotificationId, tripConfirmModalOpen } = this.state;
    this.setState({
      tripModalOpen: false,
    });
    this.deleteTripFn({
      variables: { moveNotificationId },
    });
    this.setState({
      tripConfirmModalOpen: !tripConfirmModalOpen,
      moveNotificationId: null,
    });
  };

  public onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    this.setState({
      tripCitySearch: value,
    } as any);
  };
  public gotoTrip = (cityName, cityId, countryName) => {
    this.props.history.push({
      pathname: `/city/${cityId}`,
    });
    this.setState({
      cityName: "",
      cityId: "",

      countryName: "",
    });
  };
  public onCompletedUserProfile = (data) => {
    if (!data.userProfile.user) {
      this.props.history.goBack();
    }
  };
  public onCompletedAddTrip = (data) => {
    try {
      if (data.addTrip.moveNotification) {
        toast.success("Trip added");
        this.calculateDistanceFn();
      }
    } catch (e) {
      toast.error("Overlapping dates! Please check your trip dates.");
    }
  };
  public onCompletedEditTrip = (data) => {
    try {
      if (data.editTrip.moveNotification) {
        toast.success("Trip updated");
        this.calculateDistanceFn();
      }
    } catch (e) {
      toast.error("Overlapping dates! Please check your trip dates.");
    }
  };
  public onCompletedDeleteTrip = (data) => {
    if (data.deleteTrip.ok) {
      toast.success("Trip deleted");
      this.calculateDistanceFn();
    } else {
      toast.error("error");
    }
  };
  public onCompletedSlackReportUsers = (data) => {
    this.setState({ reportModalOpen: false });
    if (data.slackReportUsers.ok) {
      toast.success("Reporet sent");
    } else {
      toast.error("error");
    }
  };
  public updateDeleteTrip = (cache, { data: { deleteTrip } }) => {
    const {
      match: {
        params: { uuid },
      },
    } = this.props;
    try {
      const data = cache.readQuery({
        query: GET_TRIPS,
        variables: { uuid },
      });
      if (data) {
        data.getTrips.trip = data.getTrips.trip.filter(
          (i) => parseInt(i.id, 10) !== deleteTrip.tripId
        );
        cache.writeQuery({
          query: GET_TRIPS,
          variables: { uuid },
          data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public toggleRequestModal = () => {
    const { requestModalOpen } = this.state;
    this.setState({
      requestModalOpen: !requestModalOpen,
    } as any);
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    const { getTrips: { trip = {} } = {} } = ({} = this.getTripsData);
    const nowSearch = (list, text) =>
      list.filter(
        (i) =>
          i.city.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.city.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const tripList = nowSearch(trip, value);
    this.setState({
      search: value,
      tripList,
    } as any);
  };
  public onClickSearch = async (cityId: string, cityName: string) => {
    this.setState({
      tripCitySearch: cityName,
      cityName,
      cityId,
    });
  };
  public onChangeImage = (event) => {
    event.preventDefault();
    const {
      target: {
        validity,
        files: [file],
      },
    } = event;
    if (!validity.valid || !file) {
      return;
    }
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  public onSubmitImage = (event) => {
    event.preventDefault();
    const { file, imagePreviewUrl } = this.state;
    if (
      (file && file.length !== 0) ||
      (imagePreviewUrl && imagePreviewUrl.length !== 0)
    ) {
      this.uploadAvatarFn({ variables: { file } });
      this.setState({
        file: null,
        imagePreviewUrl: "",
        avatarModalOpen: false,
      });
    } else {
      this.setState({ avatarModalOpen: false });
    }
  };
  public updateCalculateDistance = (cache, { data: { calculateDistance } }) => {
    const {
      match: {
        params: { uuid },
      },
    } = this.props;
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { uuid },
      });
      if (data) {
        data.userProfile.user.distance = calculateDistance.distance;
        cache.writeQuery({
          query: GET_USER,
          variables: { uuid },
          data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public updatUploadAvatar = (cache, { data: { uploadAvatar } }) => {
    const {
      match: {
        params: { uuid },
      },
    } = this.props;
    try {
      const data = cache.readQuery({
        query: GET_AVATARS,
        variables: { uuid },
      });
      if (data) {
        data.getAvatars.avatars.unshift(uploadAvatar.avatar);
        data.getAvatars.avatars.find(
          (i) => i.uuid === uploadAvatar.preAvatarUUID
        ).isMain = false;
        data.getAvatars.avatars.find(
          (i) => i.uuid === uploadAvatar.newAvatarUUID
        ).isMain = true;
        cache.writeQuery({
          query: GET_AVATARS,
          variables: { uuid },
          data,
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { uuid },
      });
      if (data) {
        data.userProfile.user.avatarUrl = uploadAvatar.avatar.thumbnail;
        cache.writeQuery({
          query: GET_USER,
          variables: { uuid },
          data,
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: ME,
      });
      if (data) {
        data.me.user.avatarUrl = uploadAvatar.avatar.thumbnail;
        cache.writeQuery({
          query: ME,
          data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public removeImagePreviewUrl = () => {
    this.setState({ file: null, imagePreviewUrl: "" });
  };
  public onCompletedUploadAvatar = (data) => {
    if (data.uploadAvatar.ok) {
      toast.success("Avatar updated");
    } else {
      toast.error("error");
    }
  };
  public updateDeleteAvatar = (cache, { data: { deleteAvatar } }) => {
    const {
      match: {
        params: { uuid },
      },
    } = this.props;
    try {
      const data = cache.readQuery({
        query: GET_AVATARS,
        variables: { uuid },
      });
      if (data) {
        data.getAvatars.avatars = data.getAvatars.avatars.filter(
          (i) => i.uuid !== deleteAvatar.uuid
        );
        cache.writeQuery({
          query: GET_AVATARS,
          variables: { uuid },
          data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public onCompletedDeleteAvatar = (data) => {
    if (data.deleteAvatar.ok) {
      toast.success("Avatar deleted");
    } else {
      toast.error("error");
    }
  };
  public onCompletedCreateCity = (data) => {
    if (!data.createCity.ok) {
      toast.error("error");
    }
  };
  public onCompletedGetAvatar = (data) => {
    if (!data.getAvatars.avatars) {
      toast.error("error");
    }
  };
  public updateMarkAsMain = (cache, { data: { markAsMain } }) => {
    const {
      match: {
        params: { uuid },
      },
    } = this.props;
    try {
      const data = cache.readQuery({
        query: GET_USER,
        variables: { uuid },
      });
      if (data) {
        data.userProfile.user.avatarUrl = markAsMain.avatar.thumbnail;
        cache.writeQuery({
          query: GET_USER,
          variables: { uuid },
          data,
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: ME,
      });
      if (data) {
        data.me.user.avatarUrl = markAsMain.avatar.thumbnail;
        cache.writeQuery({
          query: ME,
          data,
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const data = cache.readQuery({
        query: GET_AVATARS,
        variables: { uuid },
      });
      if (data) {
        data.getAvatars.avatars.find(
          (i) => i.uuid === markAsMain.preAvatarUUID
        ).isMain = false;
        data.getAvatars.avatars.find(
          (i) => i.uuid === markAsMain.newAvatarUUID
        ).isMain = true;
        cache.writeQuery({
          query: GET_AVATARS,
          variables: { uuid },
          data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  public onCompletedMarkAsMain = (data) => {
    if (data.markAsMain.ok) {
      toast.success("Mark As Main updated");
    } else {
      toast.error("error Marking As Main");
    }
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

export default withRouter(UserProfileContainer);
