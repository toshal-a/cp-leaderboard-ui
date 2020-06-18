import React from 'react';
import ReactGA from 'react-ga';
import { withRouter, RouteComponentProps } from 'react-router';
import { Location, LocationListener, UnregisterCallback } from 'history';

const sendPageView: LocationListener = (location: Location): void => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
}

interface Props extends RouteComponentProps {
  children: JSX.Element;
  trackingId?: string;
}
const GAListener = ({ children, trackingId, history }: Props): JSX.Element => {
  React.useEffect((): UnregisterCallback | void => {
    if (trackingId) {
      ReactGA.initialize(trackingId)
      sendPageView(history.location, 'REPLACE')
      return history.listen(sendPageView)
    }
  }, [history, trackingId])

  return children
}

export default withRouter(GAListener);