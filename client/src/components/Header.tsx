import { PageHeader } from "antd";
import React, { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { StateContext } from "../App";

function Header() {
  const history = useHistory();
  const params = useRouteMatch<{}>();
  const { state } = useContext(StateContext);

  return (
    <PageHeader
      onBack={params.isExact ? undefined : () => history.goBack()}
      title="COVID-19 Tracker"
      subTitle={!params.isExact && state.country.data[0]?.Country}
    />
  );
}

export default Header;
