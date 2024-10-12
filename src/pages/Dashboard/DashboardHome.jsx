import useUserRole from "../../hooks/useUserRole";
import Loading from "../Loading";
import DashboardTeacher from "../../components/DashboardTeacher";

const DashboardHome = () => {
  const { role, isRoleLoading } = useUserRole();
  if (isRoleLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      {role == "teacher" ? <DashboardTeacher></DashboardTeacher> : ""}
    </div>
  );
};

export default DashboardHome;
