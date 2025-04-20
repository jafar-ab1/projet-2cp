export const usernameSideIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

export const passwordSideIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

export const menuLinks = [
  {
    name: 'accomodation',
    to: '/accomodation',
    subLinks: [
      {
        name: 'algiers',
        to: '/algiers',
      },
      {
        name: 'oran',
        to: '/oran',
      },
      {
        name: 'annaba',
        to: '/annaba',
      },
    ],
  },
  { name: 'occasions', to: '/occasions', subLinks: [] },
  { name: 'events', to: '/events', subLinks: [] },
  { name: 'wellness', to: '/wellness', subLinks: [] },
  {
    name: 'dinning',
    to: '/dinning',
    subLinks: [
      {
        name: 'the gourmet spot',
        to: '#',
      },
      {
        name: 'the golden plate',
        to: '#',
      },
      {
        name: 'the coffee nook',
        to: '#',
      },
    ],
  },
];

import { branches as branchList } from './branches';
export const branches = branchList;

import { spots as spotList } from './spots';
export const spots = spotList;

import { accomodationPageBranches } from './accomodation';
export const accomodationBranches = accomodationPageBranches;

import { dinning } from './dinning';
export const dinningList = dinning;
