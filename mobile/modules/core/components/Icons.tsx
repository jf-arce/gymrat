import Svg, { Path } from "react-native-svg";

export const UserIcon = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="currentColor"
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M12 2a5 5 0 1 1-5 5l.005-.217A5 5 0 0 1 12 2zM14 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5h4z" />
    </Svg>
  );
};

export const HomeIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    className="icon icon-tabler icons-tabler-filled icon-tabler-home"
    {...props}
  >
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="m12.707 2.293 9 9c.63.63.184 1.707-.707 1.707h-1v6a3 3 0 0 1-3 3h-1v-7a3 3 0 0 0-2.824-2.995L13 12h-2a3 3 0 0 0-3 3v7H7a3 3 0 0 1-3-3v-6H3c-.89 0-1.337-1.077-.707-1.707l9-9a1 1 0 0 1 1.414 0M13 14a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883-.993L11 14z" />
  </Svg>
);

export const WorkoutIcon = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <Path stroke="none" d="M0 0h24v24H0z" />
      <Path d="M2 12h1M6 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zM9 12h6M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1zM18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M22 12h-1" />
    </Svg>
  );
};

export const ProgressIcon = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <Path stroke="none" d="M0 0h24v24H0z" />
      <Path d="m3 17 6-6 4 4 8-8" />
      <Path d="M14 7h7v7" />
    </Svg>
  );
};
