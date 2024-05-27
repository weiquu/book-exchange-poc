import ProfilePage from "../../../../components/profile/ProfilePage";
import React from "react";

type Props = Readonly<{
  params: Readonly<{ id: string }>;
}>;

export default function Page({ params: { id } }: Props): JSX.Element {
  return <ProfilePage userId={id} />;
}
