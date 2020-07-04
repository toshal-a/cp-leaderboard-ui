/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from "react";
import { useLocation, matchPath } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Gravatar from 'react-gravatar';
import {
  Activity as ActivityIcon,
  Trello as TrelloIcon,
  User as UserIcon,
  Flag as FlagIcon,
  HelpCircle as HelpIcon,
} from "react-feather";
import Logo from "components/Logo";
import NavItem from "./NavItem";

const navConfig = [
  {
    subheader: "Applications",
    items: [
      {
        title: "Leaderboard",
        href: "/app/leaderboard",
        icon: TrelloIcon,
      },
      {
        title: "Contest",
        href: "/app/contest",
        icon: FlagIcon,
      },
      {
        title: "Live Contest",
        href: "/app/livecontest",
        icon: ActivityIcon,
        info: () => <Chip color="secondary" size="small" label="Coming Soon" />,
      },
    ],
  },
  {
    subheader: "Management",
    items: [
      {
        title: "Account",
        href: "/app/account",
        icon: UserIcon,
      },
    ],
  },
  {
    subheader: "Information",
    items: [
      {
        title: "FAQs",
        href: "/app/faq",
        icon: HelpIcon,
      },
    ],
  },
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

function NavBar({ openMobile, onMobileClose }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state) => state.login);

  React.useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
       { <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account">
              <Avatar alt="User" className={classes.avatar} >
              <Gravatar email={user.email} />
              </Avatar>
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {`${user.full_name}`}
            </Link>
            <Typography variant="body2" color="textSecondary">
              {user.handle}
            </Typography>
          </Box>
  </Box> }
        <Divider />
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {config.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: config.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
