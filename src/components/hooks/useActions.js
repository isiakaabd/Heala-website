import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  tablesActions,
  authActions,
  hcpConsultation,
  patientActions,
} from "store/action-creators";

export const useActions = () => {
  const dispatch = useDispatch();

  //   bindAction creator helps bind all action creators into a single object
  // It helps prevent the calling of dispatch every time an action is to be invoked.
  return bindActionCreators(
    { ...tablesActions, ...hcpConsultation, ...authActions, ...patientActions },
    dispatch
  );
};
